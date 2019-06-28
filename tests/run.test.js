const path = require('path');
const fs = require('fs');

const run = require('../src/run');

describe('Run test', () => {
  it('throw error if specified environment file does not exists', () => {
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

  it('return new updated environment variable file with specified environment file is valid and output is valid', () => {
    const environment = path.resolve(__dirname, './fixtures/sample-postman-environment.json');
    const output = path.resolve(__dirname, './results/output-1.json');

    run(environment, output, {
        endpoint: 'http://localhost:3000',
    });

    const isOutputExist = fs.existsSync(output);
    const fileContent = JSON.parse(fs.readFileSync(output));
    
    const updatedEnvironmentEntry = fileContent.values.find(env => env.key === 'endpoint');

    expect(isOutputExist).toBe(true);
    expect(updatedEnvironmentEntry.value).toBe('http://localhost:3000');
  });

  it('return origin environment variable file with specified environment variable does not exist', () => {
    const environment = path.resolve(__dirname, './fixtures/sample-postman-environment.json');
    const output = path.resolve(__dirname, './results/output-2.json');

    const originFileContent = JSON.parse(fs.readFileSync(environment));

    run(environment, output, {
        envNotExist: 'notExist',
    });

    const isOutputExist = fs.existsSync(output);
    const updatedFileContent = JSON.parse(fs.readFileSync(output));
    

    expect(isOutputExist).toBe(true);
    expect(originFileContent).toEqual(updatedFileContent);
  });
});