'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const utils = require('../utils');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }

    prompting() {
        utils.greeting(this);
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('_build.yml'),
            this.destinationPath(`.github/workflows/build.yml`)
        );
    }

    this

    end() {
        this.log(chalk.yellow('\nWARNING\n'));
        this.log(`GitHub Action will not work until you create GITHUB_TOKEN secret with value of your personal access token in Settings->Secrets inside the repository.`);
        this.log(`You can find step by step guide how to create personal access token here:`);
        this.log(`https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line#creating-a-token`);
    }
}