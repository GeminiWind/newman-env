#!/usr/bin/env node
const path = require('path');
const program = require('commander');
const rootDir = require('app-root-dir');
const newmanEnv = require('../src');
const utils = require('../src/utils');

const version = require('../package.json').version;

program
  .version(version, '-v, --version')
  .name('newman-env')
  .command('run <environment>')
  .option('-o, --output [path]', 'Specify Path to Postman Environment output.')
  .option('--env-var <value>', 'Allows the specification of environment variables via the command line, in a key=value format', utils.cast.memoizeKeyVal, {})
  .action((environment, { output, envVar }) => {
    const dir = rootDir.get();

    const sourcePath = path.resolve(dir, environment);
    const destinationPath = output ? path.resolve(dir, output) : sourcePath;

    newmanEnv.run(sourcePath, destinationPath, envVar);
  });

program.on('--help', function () {
  console.info('\nTo get available options for a command:');
  console.info('  newman-env [command] -h');
});

program.on('command:*', (command) => {
  console.error(`error: invalid command \`${command}\`\n`);
  program.help();
});

  
program.parse(process.argv);