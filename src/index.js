const fs = require('fs');

const updateEnv = (envPath, destinationPath, replaceableEnvironments) => {
  if (!fs.existsSync(envPath)) {
    throw new Error('Your env file does not exists. Please check again');
  }

  const content = JSON.parse(fs.readFileSync(envPath));

  const currentEnvironments = content.values;

  const updatedEnvironments  = currentEnvironments
    .map(env => {
      if (replaceableEnvironments[[env.key]]) {
        return {
          ...env,
          value: replaceableEnvironments[[env.key]]
        }
      }

      return env;
  });

  content.values = updatedEnvironments;

  fs.writeFileSync(destinationPath, JSON.stringify(content));
}

module.exports = updateEnv;
