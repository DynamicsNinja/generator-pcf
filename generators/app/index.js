'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("skip-msbuild", {
      type: Boolean,
      description: "Do not run MSBuild at end",
      default: false
    });
  }

  prompting() {
    this.log(
      yosay(`Yo! Time to code this amazing ${chalk.hex('#752875').bold('PCF')} control\nthat came to your mind!\n${chalk.hex('#0066FF').bold(' #ProCodeNoCodeUnite')}`)
    );

    const prompts = [
      {
        type: "input",
        name: "controlNamespace",
        message: "Control namespace",
        default: "Fic",

      },
      {
        type: "input",
        name: "controlName",
        message: "Control name",
        default: "SuperCoolControl"
      },
      {
        type: 'list',
        name: 'controlTemplate',
        message: 'Choose control template',
        choices: ['Field', 'Dataset']
      },
      {
        type: 'list',
        name: 'npmPackage',
        message: 'Additional NPM packages?',
        choices: [
          {
            name: 'None',
            value: 0,
          },
          {
            name: 'React',
            value: 1,
          },
          {
            name: 'React + Fluent UI',
            value: 2,
          }
        ]
      },
      {
        type: "input",
        name: "publisherPrefix",
        message: "Publisher prefix",
        default: "fic"
      },
      {
        type: "input",
        name: "publisherName",
        message: "Publisher Name",
        default: "Ivan Ficko"
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.spawnCommandSync(`pac pcf init -ns ${this.props.controlNamespace} -n ${this.props.controlName} -t ${this.props.controlTemplate.toString().toLowerCase()}`);

    let pkgJson = require(this.destinationPath("package.json"));

    if (this.props.npmPackage == 2) {
      pkgJson.dependencies["@fluentui/react"] = "^7.112.0";
    }

    if (this.props.npmPackage != 0) {
      pkgJson.dependencies["react"] = "^16.13.1";
      pkgJson.dependencies["react-dom"] = "^16.13.1";
      pkgJson.dependencies["@types/react"] = "^16.9.35";
      pkgJson.dependencies["@types/react-dom"] = "^16.9.8";

      this.fs.writeJSON(this.destinationPath("package.json"), pkgJson);
    }

    this.fs.copyTpl(
      this.templatePath('_sample.css'),
      this.destinationPath(`${this.props.controlName}/css/${this.props.controlName}.css`),
      {
        controlName: this.props.controlName,
        controlNamespace: this.props.controlNamespace
      }
    );

    this.fs.copyTpl(
      this.templatePath(`_manifest-${this.props.controlTemplate.toString().toLowerCase()}.xml`),
      this.destinationPath(`${this.props.controlName}/ControlManifest.Input.xml`),
      {
        controlName: this.props.controlName,
        controlNamespace: this.props.controlNamespace
      }
    );

    this.fs.copy(
      this.templatePath('_sample.resx'),
      this.destinationPath(`${this.props.controlName}/strings/${this.props.controlName}.1033.resx`)
    );

    this.fs.copy(
      this.templatePath('_preview.png'),
      this.destinationPath(`${this.props.controlName}/img/preview.png`)
    );

    var normalizedPublisherName = this.props.publisherName.replace(/ /g, '').toLowerCase();
    var normalizedPublisherPrefix = this.props.publisherPrefix.replace(/ /g, '').toLowerCase();

    this.spawnCommandSync(`mkdir Solutions`);
    this.spawnCommandSync(`pac solution init -pn ${normalizedPublisherName} -pp ${normalizedPublisherPrefix}`, null, { cwd: `${this.destinationPath()}\\Solutions` });
    this.spawnCommandSync(`pac solution add-reference -p ..`, null, { cwd: `${this.destinationPath()}\\Solutions` });
  }

  install() {
    this.npmInstall().then(() => {
      var skipMsbuild = this.options["skip-msbuild"];
      this.log(`SKIP MSBUILD: ${skipMsbuild}`);
      if (!skipMsbuild) {
        this.spawnCommandSync("msbuild", ["/t:build", "/restore"], { cwd: `${this.destinationPath()}\\Solutions` });
      }
    });
  }
};
