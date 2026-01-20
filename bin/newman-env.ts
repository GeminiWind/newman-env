#!/usr/bin/env node
import * as path from 'path';

import program from 'commander';
import rootDir from 'app-root-dir';
import { run } from 'src';
import { cast } from 'src/utils';
import { version } from '../package.json';

program
  .version(version, '-v, --version')
  .name('newman-env')
  .command('run <environment>')
  .option('-o, --output [path]', 'Specify Path to Postman Environment output.')
  .option(
    '--env-var <value>',
    'Allows the specification of environment variables via the command line, in a key=value format',
    cast.memoizeKeyVal,
    {}
  )
  .action((environment: string, { output, envVar }: { output?: string; envVar: Record<string, string | undefined> }) => {
    const dir = rootDir.get();

    const sourcePath = path.resolve(dir, environment);
    const destinationPath = output ? path.resolve(dir, output) : sourcePath;

    run(sourcePath, destinationPath, envVar);
  });

program.on('--help', function () {
  console.info('\nTo get available options for a command:');
  console.info('  newman-env [command] -h');
});

program.on('command:*', (command: string) => {
  console.error(`error: invalid command \`${command}\`\n`);
  program.help();
});

program.parse(process.argv);
