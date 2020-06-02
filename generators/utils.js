const yosay = require("yosay");
const chalk = require("chalk");

module.exports = {
  checkPrerequisites,
  greeting
};

function checkPrerequisites(generator, skipMsBuild) {
  var paths = process.env.path.split(";");

  var msbuildFound = skipMsBuild;
  var pacFound = false;

  paths.forEach(path => {
    if (path.indexOf("PowerAppsCLI") !== -1) {
      pacFound = true;
    } else if (path.indexOf("MSBuild") !== -1) {
      msbuildFound = true;
    }
  });

  if (pacFound && msbuildFound) {
    generator.log(`Checking prerequisites ${chalk.green("OK")}\n`);
    return;
  }

  generator.log(`Checking prerequisites ${chalk.red("NOK")}`);

  if (!msbuildFound) {
    generator.log(chalk.yellow("\nWARNING"));
    generator.log(
      "MSBuild not found in your path variable. Please add it to proceed.\nIt's usually located at C:\\Users\\<YOUR_USER>\\AppData\\Local\\Microsoft\\PowerAppsCLI\\"
    );
  }

  if (!pacFound) {
    generator.log(chalk.yellow("\nWARNING"));
    generator.log(
      `Power Apps CLI not found in your path variable. Please add it to proceed.\nYou can download it from: https://aka.ms/PowerAppsCLI`
    );
  }

  process.exit(-1);
}

function greeting(generator) {
  generator.log(
    yosay(
      `Yo! Time to code this amazing ${chalk
        .hex("#752875")
        .bold("PCF")} control\nthat came to your mind!\n${chalk
        .hex("#0066FF")
        .bold(" #ProCodeNoCodeUnite")}`
    )
  );
}
