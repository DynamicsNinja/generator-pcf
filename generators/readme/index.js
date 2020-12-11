"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const xml2js = require("xml2js");
const { getUsedLcids, getTranslations, getAllImages } = require("../utils");
const appInsights = require("../insights");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    appInsights.trackEvent(appInsights.Events.ReadmeStarted);

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

    this.option("previewImage", {
      type: String,
      description: "Preview image path",
      required: false,
      alias: "pi"
    });
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

    let locales = require("../lcid.json");
    let usedLcids = getUsedLcids(this, this.controlName);

    const filterLocales = (usedLcids, locales) =>
      locales.filter(locale => {
        var lcid = locale.value.toString();
        return usedLcids.includes(lcid);
      });

    let localeChoices = filterLocales(usedLcids, locales);
    let imageChoices = getAllImages();

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
        type: "list",
        name: "lcid",
        message: "Which language would you like to use?",
        choices: localeChoices,
        when: !this.options.lcid && localeChoices.length > 0
      },
      {
        type: "list",
        name: "previewImage",
        message: "Which preview image would you like to use?",
        choices: imageChoices,
        when: imageChoices.length > 1
      }
    ];

    return this.prompt(prompts).then(props => {
      this.githubUsername = this.options.githubUsername || props.githubUsername;
      this.repositoryName = this.options.repositoryName || props.repositoryName;
      this.lcid = this.options.lcid || props.lcid || "0";
      this.previewImage =
        this.options.previewImage ||
        props.previewImage ||
        imageChoices.length === 1
          ? imageChoices[0]
          : "<PATH_TO_IMAGE>";
    });
  }

  writing() {
    var controlDisplayName = "";
    var controlDescription = "";
    var properties = [];
    var translations = getTranslations(this, this.controlName, this.lcid);

    var xmlParser = new xml2js.Parser();
    xmlParser.parseString(
      this.fs.read(`${this.controlName}/ControlManifest.Input.xml`),
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
        githubUsername: this.githubUsername,
        previewImage: this.previewImage
      }
    );
  }
};
