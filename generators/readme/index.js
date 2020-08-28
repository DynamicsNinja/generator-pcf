"use strict";
const Generator = require("yeoman-generator");
const xml2js = require("xml2js");
const utils = require("../utils");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument("controlName", { type: String, required: false });

    this.option("githubUsername", {
      type: String,
      desc: "GitHub username",
      required: false,
      alias: "gu"
    });

    this.option("repositoryName", {
      type: String,
      desc: "GitHub repository",
      required: false,
      alias: "gr"
    });

    this.option("lcid", {
      type: String,
      description: "Language Code ID",
      required: false,
      alias: "lc"
    });
  }

  prompting() {
    const prompts = [
      {
        type: "input",
        name: "githubUsername",
        message: "GitHub username",
        default: "DynamicsNinja",
        when: !this.options.githubUsername,
        store: true
      },
      {
        type: "input",
        name: "repositoryName",
        message: "GitHub repository",
        default: "PCF-Clipboard-Control",
        when: !this.options.repositoryName
      },
      {
        type: "input",
        name: "lcid",
        message: "Which language would you like to use? Type in LCID",
        default: "1033",
        when: !this.options.lcid,
        store: true
      }
    ];

    return this.prompt(prompts).then(props => {
      this.githubUsername = this.options.githubUsername || props.githubUsername;
      this.repositoryName = this.options.repositoryName || props.repositoryName;
      this.lcid = this.options.lcid || props.lcid;
    });
  }

  writing() {
    let controlName =
      this.config.get("controlName") || this.options.controlName;

    if (controlName === undefined) {
      this.log(
        `Control name not found! Please specify the 'controlName' argument.`
      );
    } else {
      var controlDisplayName = "";
      var controlDescription = "";
      var properties = [];
      var translations = utils.getTranslations(this, controlName, this.lcid);

      var xmlParser = new xml2js.Parser();
      xmlParser.parseString(
        this.fs.read(`${controlName}/ControlManifest.Input.xml`),
        function(err, result) {
          if (err) console.log(err);

          controlDisplayName =
            translations[result.manifest.control[0].$["display-name-key"]] ||
            result.manifest.control[0].$["display-name-key"];
          controlDescription =
            translations[result.manifest.control[0].$["description-key"]] ||
            result.manifest.control[0].$["description-key"];

          result.manifest.control[0].property.forEach(element => {
            properties.push({
              name:
                translations[element.$["display-name-key"]] ||
                element.$["display-name-key"],
              desc:
                translations[element.$["description-key"]] ||
                element.$["description-key"],
              default: element.$["default-value"],
              required: element.$.required || "false"
            });
          });
        }
      );

      this.fs.copyTpl(
        this.templatePath("_README.md"),
        this.destinationPath("README.md"),
        {
          controlName: controlDisplayName,
          controlDescription: controlDescription,
          props: properties,
          repo: this.repositoryName,
          githubUsername: this.githubUsername
        }
      );
    }
  }
};
