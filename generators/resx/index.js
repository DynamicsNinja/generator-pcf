"use strict";
const Generator = require("yeoman-generator");
const utils = require("../utils");
const appInsights = require("../insights");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    appInsights.trackEvent(appInsights.Events.ResxStarted);

    this.argument("controlName", { type: String, required: false });

    this.option("lcid", {
      type: String,
      description: "Language Code ID",
      alias: "lc"
    });
  }

  prompting() {
    utils.greeting(this);

    let locales = require("../lcid.json");

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
      this.lcid = this.options.lcid || props.lcid.toString();
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
      let lcids = this.lcid.split(",");

      lcids.forEach(lcid => utils.createResxFile(this, controlName, lcid));
    }
  }
};
