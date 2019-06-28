const fs = require('fs');

const run = (envPath, destinationPath, replaceableEnvironments) => {
  if (!fs.existsSync(envPath)) {
    throw new Error('Your env file does not exist. Please check again');
  }

  const content = JSON.parse(fs.readFileSync(envPath));

  const currentEnvironments = content.values;

  const updatedEnvironments  = currentEnvironments
    .map(env => {
      if (replaceableEnvironments[[env.key]]) {
        console.log(`SET ${env.key}: ${replaceableEnvironments[[env.key]]}`);

        return {
          ...env,
          value: replaceableEnvironments[[env.key]]
        }
      }

      return env;
  });

  content.values = updatedEnvironments;

  console.log(`Writing environments to file: ${destinationPath}`);

  fs.writeFileSync(destinationPath, JSON.stringify(content));

  console.log('Done.');
}

module.exports = run;
