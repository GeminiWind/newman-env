import fs from 'fs';

type EnvironmentEntry = {
  key: string;
  value: string;
  enabled?: boolean;
  [key: string]: unknown;
};

type EnvironmentFile = {
  values: EnvironmentEntry[];
  [key: string]: unknown;
};

const run = (
  envPath: string,
  destinationPath: string,
  replaceableEnvironments: Record<string, string | undefined>
) => {
  if (!fs.existsSync(envPath)) {
    throw new Error('Your env file does not exist. Please check again');
  }

  const content = JSON.parse(fs.readFileSync(envPath, 'utf8')) as EnvironmentFile;
  const currentEnvironments = content.values;

  const updatedEnvironments = currentEnvironments.map((env) => {
    const replacement = replaceableEnvironments[env.key];
    if (replacement !== undefined) {
      console.log(`SET ${env.key}: ${replacement}`);

      return {
        ...env,
        value: replacement,
      };
    }

    return env;
  });

  content.values = updatedEnvironments;

  console.log(`Writing environments to file: ${destinationPath}`);

  try {
    fs.writeFileSync(destinationPath, JSON.stringify(content));
  } catch (error) {
    throw new Error('Error when writing output file. Please check output path.');
  }

  console.log('Done.');
};

export default run;
