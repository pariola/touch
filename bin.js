#! /usr/bin/env node

const cli = require("yargs");
const fs = require("fs");
const path = require("path");

const dir = path.resolve(`.`);

cli
  .usage(`Usage: $0 <command> [options]`)
  .help(`h`)
  .alias(`h`, `help`)
  .version()
  .alias(`v`, `version`);

cli.command({
  command: "$0 <filename>",
  describe: "Creates a file with the specified filename",
  builder: _ => {
    _.version(false);
    return _.option(`i`, {
      alias: `into`,
      describe: `Writes content into the specified file`
    });
  },
  handler: _ => {
    if (_.into) {
      fs.writeFile(path.join(dir, _.filename), _.into, err => {
        console.log(err || `Writing into ${_.filename}: done!`);
      });
    } else {
      fs.writeFile(path.join(dir, _.filename), "", err => {
        console.log(err || `Creating file: ${_.filename}: done!`);
      });
    }
  }
});

const x = cli.argv;