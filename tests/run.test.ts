import * as path from 'path';
import * as fs from 'fs';

import run from 'src/run';

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

describe('Run test', () => {
  it('throw error if specified environment file does not exist', () => {
    const environment = path.resolve(__dirname, './fixtures/file-not-exist.json');
    const output = path.resolve(__dirname, './fixtures/output.json');

    let error;

    try {
      run(environment, output, {
        endpoint: 'http://localhost:3000',
      })
    } catch (e) {
      error = e;
    };

    expect(error).toBeDefined();
    expect(error).toMatchSnapshot();
  });

  it('throw error when the output path file does not exist', () => {
    const environment = path.resolve(__dirname, './fixtures/sample-postman-environment.json');
    const output = path.resolve(__dirname, './dir-does-not-exist/output-1.json');

    let error;

    try {
      run(environment, output, {
        endpoint: 'http://localhost:3000',
      })
    } catch (e) {
      error = e;
    };

    const isOutputExist = fs.existsSync(output);

    expect(isOutputExist).toBe(false);

    expect(error).toBeDefined();
    expect(error).toMatchSnapshot();
  });

  it('throw error when environment file content is invalid JSON', () => {
    const environment = path.resolve(__dirname, './fixtures/invalid-postman-environment.json');
    const output = path.resolve(__dirname, './results/output-invalid.json');

    let error;

    try {
      run(environment, output, {
        endpoint: 'http://localhost:3000',
      })
    } catch (e) {
      error = e;
    };

    const isOutputExist = fs.existsSync(output);

    expect(isOutputExist).toBe(false);
    expect(error).toBeDefined();
    expect(error).toMatchSnapshot();
  });

  it('return new updated environment variable file with specified environment file is valid and output is valid', () => {
    const environment = path.resolve(__dirname, './fixtures/sample-postman-environment.json');
    const output = path.resolve(__dirname, './results/output-1.json');

    run(environment, output, {
        endpoint: 'http://localhost:3000',
    });

    const isOutputExist = fs.existsSync(output);
    const fileContent = JSON.parse(fs.readFileSync(output, 'utf8')) as EnvironmentFile;

    const updatedEnvironmentEntry = fileContent.values.find((env) => env.key === 'endpoint');

    expect(isOutputExist).toBe(true);
    expect(updatedEnvironmentEntry).toBeDefined();
    if (!updatedEnvironmentEntry) {
      throw new Error('Missing endpoint environment entry');
    }
    expect(updatedEnvironmentEntry.value).toBe('http://localhost:3000');
  });

  it('update multiple environment variables and keep existing entries', () => {
    const environment = path.resolve(__dirname, './fixtures/sample-postman-environment-multi.json');
    const output = path.resolve(__dirname, './results/output-3.json');

    run(environment, output, {
      endpoint: 'http://localhost:3000',
      token: 'abc123',
    });

    const isOutputExist = fs.existsSync(output);
    const fileContent = JSON.parse(fs.readFileSync(output, 'utf8')) as EnvironmentFile;

    const endpointEntry = fileContent.values.find((env) => env.key === 'endpoint');
    const tokenEntry = fileContent.values.find((env) => env.key === 'token');
    const untouchedEntry = fileContent.values.find((env) => env.key === 'email');

    expect(isOutputExist).toBe(true);
    expect(endpointEntry).toBeDefined();
    if (!endpointEntry) {
      throw new Error('Missing endpoint environment entry');
    }
    expect(tokenEntry).toBeDefined();
    if (!tokenEntry) {
      throw new Error('Missing token environment entry');
    }
    expect(endpointEntry.value).toBe('http://localhost:3000');
    expect(tokenEntry.value).toBe('abc123');
    expect(untouchedEntry).toBeDefined();
  });

  it('return origin environment variable file with specified environment variable does not exist', () => {
    const environment = path.resolve(__dirname, './fixtures/sample-postman-environment.json');
    const output = path.resolve(__dirname, './results/output-2.json');

    const originFileContent = JSON.parse(fs.readFileSync(environment, 'utf8')) as EnvironmentFile;

    run(environment, output, {
        envNotExist: 'notExist',
    });

    const isOutputExist = fs.existsSync(output);
    const updatedFileContent = JSON.parse(fs.readFileSync(output, 'utf8')) as EnvironmentFile;


    expect(isOutputExist).toBe(true);
    expect(originFileContent).toEqual(updatedFileContent);
  });
});
