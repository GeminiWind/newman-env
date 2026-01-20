# **newman-env**

Command-line helper for updating Postman environment variables before running Newman. Use it to patch values in an exported Postman environment JSON so your CI/CD runs always target the right endpoints.

## Features

- Update one or more environment variables from the CLI.
- Overwrite the source file or write to a separate output path.
- Leaves values untouched when a key does not exist in the environment file.

## Installation

```
npm install -g newman-env
```

## Usage

Export your Postman Environment as JSON, then run:

```
newman-env run postman-environments.json --env-var endpoint=http://localhost:3000 --env-var email=gemini.wind285@gmail.com
```

To write to a new file:

```
newman-env run postman-environments.json -o postman-environments.updated.json --env-var endpoint=http://localhost:3000
```

## Command

```
newman-env run <environment-file> [options]
```

### Options

- `-o, --output [path]` Specify an output environment file path. Defaults to overwriting the input file.
- `--env-var <key=value>` Set an environment variable. Repeat for multiple values.

## Notes

- The input file must be a valid Postman environment JSON with a `values` array of `{ key, value }` entries.
- If the output directory does not exist, the command fails.

## Development

```
yarn test
```
