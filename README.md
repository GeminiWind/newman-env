# **newman-env**

Newman-env is a command-line helper for newman. It allows you to update environment variables directly from the command-line. It is very helpful in the case you deployed success your application and need to update your corresponding environment variable in Postman Environment file to continue integration/performance/stress test on CI/CD.

## Getting Started

### Installation
The easiest way to install `newman-env` is using NPM. If you have Node.js installed, it is most likely that you have NPM installed as well.

```
$ npm install newman-env
```

### Usage

#### Using `newman-env cli`

The `newman-env run` command allows you to specify a environment to be update. You can easily export your Postman Environment as a json file from the Postman App and run it using Newman.

```
$ newman-env run postman-environments.json --env-var endpoint=http://localhost:3000 --env-var email=gemini.wind285@gmail.com
```


## Command Line Option

#### ```newman-env run <environment-file-source> [options]```

- ```-o <path>, --output<path>```

Specify an output environment file path after updating. Default will be overwrite the current specified environment file.

- ```--env-var<environment-variable-name>=<environment-variable-value>```

Allows the specification of environment variables via the command line, in a key=value format. Multiple CLI environment variables can be added by using ```--env-var``` multiple times, like so: ```--env-var "foo=bar" --env-var "alpha=beta"```.