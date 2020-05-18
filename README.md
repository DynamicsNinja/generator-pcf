# generator-pcf ![npm](https://img.shields.io/npm/v/generator-pcf) ![npm](https://img.shields.io/npm/dt/generator-pcf)
![](docs/generator-pcf.png)

> Yeoman generator to kickstart your Power Apps Component Framework project.

## Usage

First, install [Yeoman](http://yeoman.io) and generator-pcf using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-pcf
```

Then generate your new project by answering the prompts:

```bash
yo pcf --force
```

or just passing the command line arguments:

```bash
yo pcf --ns Fic --n SuperCoolControl --t field --pkg 2 --pp fic --pn IvanFicko --force
```

## Options

| Name             | Alias | Type   | Description                                                  | Required | Default   |
| ---------------- | ----- | ------ | ------------------------------------------------------------ | -------- | --------- |
| skip-msbuild     | sb    | bool   | Do not run MSBuild at end                                    | NO       | false     |
| force            |       | bool   | Overwrite all files                                          | NO       | false     |
| controlNamespace | ns    | string | Control Namespace                                            | NO       | undefined |
| controlName      | n     | string | Control name                                                 | NO       | undefined |
| controlTemplate  | t     | string | Choose control template:<ul style="margin-bottom:0"><li>field</li><li>dataset</li></ul> | NO       | undefined |
| npmPackage       | pkg   | int    | Additional NPM packages:<ul style="margin-bottom:0"><li>0 = None</li><li>1 = React</li><li>2 = React + Fluent UI</li></ul> | NO       | undefined |
| publisherPrefix  | pp    | string | Publisher prefix for solution                                | NO       | undefined |
| publisherName    | pn    | string | Publisher name for solution                                  | NO       | undefined |

**\* All options that will be undefined will result in a prompt for that value**

## Features

 * Creates basic PCF project like Power Apps CLI
 * Adds sample files (RESX, CSS, preview image, ...)
 * Installs additional NPM dependencies
 * Initializes Power Apps solution

## License

MIT © [Ivan Ficko](https://dynamicsninja.blog)