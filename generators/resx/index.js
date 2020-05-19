'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

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
        this.log(
            yosay(`Yo! Time to code this amazing ${chalk.hex('#752875').bold('PCF')} control\nthat came to your mind!\n${chalk.hex('#0066FF').bold(' #ProCodeNoCodeUnite')}`)
        );

        let locales = require("./lcid.json");

        const prompts = [
            {
                type: 'list',
                name: 'lcid',
                message: 'Choose RESX language',
                choices: locales,
                when: !this.options.lcid
            },
        ];

        return this.prompt(prompts).then(props => {
            this.lcid = this.options.lcid || props.lcid;
        });
    }

    writing() {
        let controlName = this.config.get("controlName") || this.options.controlName;

        if (controlName == undefined) {
            this.log(`Control name not found! Please specify the 'controlName' argument.`);
        } else {
            this.fs.copy(
                this.templatePath('_sample.resx'),
                this.destinationPath(`${controlName}/strings/${controlName}.${this.lcid}.resx`)
            );
        }
    }
}