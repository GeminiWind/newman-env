#!/usr/bin/env node
const path = require('path');
const program = require('commander');
const rootDir = require('app-root-dir');
const updateEnv = require('../src');

program
  .version('0.0.1')
  .command('run')
  .option('-e, --environment <environment>', 'Specify Path to a Postman Environment.')
  .option('-o, --output [output]', 'Specify Path to Postman Environment output.')
  .option('-v --variables <variables>', 'List of updated variable.')
  .action(({ environment, output, variables }) => {
    const dir = rootDir.get();

    const sourcePath = path.resolve(dir, environment);
    const destinationPath = output ? path.resolve(dir, output) : sourcePath;
    const replaceableEnvironments = variables.split(',').reduce((result, v) => {
      const [key, value] = v.split('=');

      result[key] = value;

      return result;
    }, {});


    updateEnv(sourcePath, destinationPath, replaceableEnvironments);
  })  
  
program.parse(process.argv);