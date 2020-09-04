"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const utils = require("../utils");

module.exports = class extends Generator {
  // eslint-disable-next-line no-useless-constructor
  constructor(args, opts) {
    super(args, opts);

    this.argument("controlName", { type: String, required: false });
  }

  prompting() {
    this.controlName =
      this.config.get("controlName") || this.options.controlName;

    if (this.controlName === undefined) {
      this.log(chalk.yellow("\nWARNING"));
      this.log(
        `Control name not found! Please specify the 'controlName' argument.`
      );
      process.exit(-1);
    }
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("_build.yml"),
      this.destinationPath(`.github/workflows/build.yml`),
      { controlName: this.controlName }
    );
  }
};
