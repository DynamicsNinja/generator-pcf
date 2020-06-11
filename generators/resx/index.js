"use strict";
const Generator = require("yeoman-generator");
const utils = require("../utils");
const xml2js = require("xml2js");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument("controlName", { type: String, required: false });

    this.option("lcid", {
      type: Number,
      description: "Language Code ID",
      alias: "lc"
    });
  }

  prompting() {
    utils.greeting(this);

    let locales = require("./lcid.json");

    const prompts = [
      {
        type: "list",
        name: "lcid",
        message: "Choose RESX language",
        choices: locales,
        when: !this.options.lcid
      }
    ];

    return this.prompt(prompts).then(props => {
      this.lcid = this.options.lcid || props.lcid;
    });
  }

  writing() {
    let controlName =
      this.config.get("controlName") || this.options.controlName;
    let lcid = this.lcid;

    if (controlName === undefined) {
      this.log(
        `Control name not found! Please specify the 'controlName' argument.`
      );
    } else {
      this.fs.copy(
        this.templatePath("_sample.resx"),
        this.destinationPath(
          `${controlName}/strings/${controlName}.${lcid}.resx`
        )
      );

      var xmlParser = new xml2js.Parser();
      var parsedData;
      xmlParser.parseString(
        this.fs.read(`${controlName}/ControlManifest.Input.xml`),
        function(err, result) {
          if (err) console.log(err);

          result.manifest.control[0].resources[0].resx.push({
            $: {
              path: `strings/${controlName}.${lcid}.resx`,
              version: "1.0.0"
            }
          });
          const builder = new xml2js.Builder();
          parsedData = builder.buildObject(result);
        }
      );
      this.fs.write(`${controlName}/ControlManifest.Input.xml`, parsedData);
    }
  }
};
