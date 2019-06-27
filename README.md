## Getting Started

### Installation
The easiest way to install `newman-env` is using NPM. If you have Node.js installed, it is most likely that you have NPM installed as well.

```
$ npm install newman-env
```

### Usage

#### Using `newman-env cli`

The `-e` run command allows you to specify a environment as a source to update. You can easily export your Postman Collection as a json file from the Postman App.

```
$ newman-env run -e postman-environments.json -v endpoint=http://localhost:3000,email=gemini.wind285@gmail.com
```


## Command Line Option

#### ```newman-env run [options]```

- ```-e <environment>, --environment<environment>```

Specify an environment file path. Environments provide a set of variables that one can use within collections.

- ```-o <output>, --output<output>```

Specify an output environment file path after updating.

- ```-v <variables>, --variables<variables>```

Specify the list of environment variable you want to update. They shoud be seperated by ```','``` (without space).