
<h1 align="center">Turing E-commerce</h1>


<p align="center">
  <b>Turing Backend Challenge written in TypeScript.</b></br>

  <p align="center">
  <a href="https://david-dm.org/w3tecch/express-typescript-boilerplate">
    <img src="https://david-dm.org/w3tecch/express-typescript-boilerplate/status.svg?style=flat" alt="dependency" />
  </a>
  <a href="https://travis-ci.org/codeninja0x01/Turing-ecommerce">
    <img src="https://travis-ci.org/codeninja0x01/Turing-ecommerce.svg?branch=master" alt="travis" />
  </a>
  <a href="https://ci.appveyor.com/project/dweber019/express-typescript-boilerplate/branch/master">
    <img src="https://ci.appveyor.com/api/projects/status/f8e7jdm8v58hcwpq/branch/master?svg=true&passingText=Windows%20passing&pendingText=Windows%20pending&failingText=Windows%20failing" alt="appveyor" />
  </a>
  <a href="https://stackshare.io/hirsch88/express-typescript-boilerplate">
    <img src="https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat" alt="StackShare" />
  </a>
</p>

</p>

<br />

### Features

- **Beautiful Code** thanks to nestJS progressive Node.js framework for building efficient, reliable and scalable server-side applications. [nestJS](https://nestjs.com/).
- **Easy API Testing** with included e2e testing.
- **Simplified Database Query** with the ORM [TypeORM](https://github.com/typeorm/typeorm).
- **Clear Structure** with different layers such as controllers, services, repositories, models, middlewares...
- **Easy Exception Handling** thanks to [nestJs Exception filters](https://docs.nestjs.com/exception-filters).
- **Smart Validation** thanks to [class-validator](https://github.com/pleerock/class-validator) with some nice annotations.
- **Integrated Testing Tool** thanks to [Jest](https://facebook.github.io/jest).
- **E2E API Testing** thanks to [supertest](https://github.com/visionmedia/supertest).
- **Basic Security Features** thanks to [Helmet](https://helmetjs.github.io/).
- **GraphQL** provides as a awesome query language for our api [GraphQL](http://graphql.org/).

## ❯ Table of Contents

- [Getting Started](#-getting-started)
- [Scripts and Tasks](#-scripts-and-tasks)
- [Debugger in VSCode](#-debugger-in-vscode)
- [API Routes](#-api-routes)
- [Project Structure](#-project-structure)
- [Docker](#-docker)
- [Further Documentations](#-further-documentation)
- [Turing Advanced Requirements] (#-advanced-requirements)
## ❯ Getting Started

### Step 1: Set up the Development Environment

You need to set up your development environment before you can do anything.

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

Install yarn globally

```bash
yarn install yarn -g
```

Install a MySQL database.

> If you work with a mac, I recommend to use homebrew for the installation.

### Step 2: Create new Project

Fork or download this project. Configure your package.json for your new project.

Then copy the `.env.example` file and rename it to `.env`. In this file you have to add your database connection information.

Create a new database with the name you have in your `.env`-file.

Then setup your application environment.

```bash
yarn run setup
```

> This installs all dependencies with yarn. After that it migrates the database and seeds some test data into it. So after that your development environment is ready to use.

### Step 3: Serve your App

Go to the project dir and start your app with this yarn script.

```bash
yarn start serve
```

> This starts a local server using `nodemon`, which will watch for any file changes and will restart the sever according to these changes.
> The server address will be displayed to you as `http://0.0.0.0:3000`.

## ❯ Scripts and Tasks

All script are defined in the `package-scripts.js` file, but the most important ones are listed here.

### Install

- Install all dependencies with `yarn install`

### Linting

- Run code quality analysis using `yarn start lint`. This runs tslint.
- There is also a vscode task for this called `lint`.

### Tests

- Run the unit tests using `yarn start test` (There is also a vscode task for this called `test`).
- Run the e2e tests using `yarn start test.e2e`.

### Running in dev mode

- Run `yarn start serve` to start nodemon with ts-node, to serve the app.
- The server address will be displayed to you as `http://0.0.0.0:3000`

### Building the project and run it

- Run `yarn start build` to generated all JavaScript files from the TypeScript sources (There is also a vscode task for this called `build`).
- To start the builded app located in `dist` use `yarn start`.

## ❯ Debugger in VSCode

To debug your code run `yarn start build` or hit <kbd>cmd</kbd> + <kbd>b</kbd> to build your app.
Then, just set a breakpoint and hit <kbd>F5</kbd> in your Visual Studio Code.


## ❯ API Routes

The route prefix is `/api` by default, but you can change this in the .env file.
The swagger and the monitor route can be altered in the `.env` file.

| Route          | Description |
| -------------- | ----------- |
| **/api**       | Shows us the name, description and the version of the package.json |
| **/graphql**   | Route to the graphql editor or your query/mutations requests |
| **/docs**   | This is the Swagger UI with our API documentation |

## ❯ Project Structure

| Name                              | Description |
| --------------------------------- | ----------- |
| **.vscode/**                      | VSCode tasks, launch configuration and some other settings |
| **dist/**                         | Compiled source files will be placed here |
| **src/**                          | Source files |
| **src/app/** */ *.controller.ts          | REST API Controllers |
| **src/app/** */ *.model.ts          | TypeOrm models |
| **src/app/** */ *.service.ts          | Service layer |
| **src/app/** */ *.module.ts          | NestJs Module |
| **src/app/** */ */graphql *.resolver.ts          | GraphQL resolvers (query, mutation & field-resolver) |
| **src/app/** */ */graphql *.graphql          | GraphQL schema |
| **src/decorators**  | Custom decorators like @User |
| **src/filters** | Exception filters  |
| **src/generated/**               | GraphQL Resolver generated type definitions |
| **src/interceptors/**         | Interceptors are used to change or replace the data returned to the client. |
| **src/middlewares/**          | Express Middlewares like helmet security features |
| **src/pipes/**           | Custom validators, which can be used in the request classes |
| **src/public/**                   | Static assets (fonts, css, js, img). |
| **test**                          | Tests |
| **test/e2e/** *.test.ts           | End-2-End tests (like e2e) |
| .env.example                      | Environment configurations |
| .env.test                         | Test environment configurations |
| .env.production                         | Production environment configurations |

## ❯ Docker

### Install Docker

Before you start, make sure you have a recent version of [Docker](https://docs.docker.com/engine/installation/) installed

### Build Docker image

```shell
docker build -t <your-image-name> .
```

### Run Docker image in container and map port

The port which runs your application inside Docker container is either configured as `PORT` property in your `.env` configuration file or passed to Docker container via environment variable `PORT`. Default port is `3000`.

#### Run image in detached mode

```shell
docker run -d -p <port-on-host>:<port-inside-docker-container> <your-image-name>
```

#### Run image in foreground mode

```shell
docker run -i -t -p <port-on-host>:<port-inside-docker-container> <your-image-name>
```

### Stop Docker container

#### Detached mode

```shell
docker stop <container-id>
```

You can get a list of all running Docker container and its ids by following command

```shell
docker images
```

#### Foreground mode

Go to console and press <CTRL> + C at any time.

### Docker environment variables

There are several options to configure your app inside a Docker container

#### project .env file

You can use `.env` file in project root folder which will be copied inside Docker image. If you want to change a property inside `.env` you have to rebuild your Docker image.

#### run options

You can also change app configuration by passing environment variables via `docker run` option `-e` or `--env`.

```shell
docker run --env DB_HOST=localhost -e DB_PORT=3306
```

#### environment file

Last but not least you can pass a config file to `docker run`.

```shell
docker run --env-file ./env.list
```

`env.list` example:

```
# this is a comment
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
```

## ❯ Further Documentations

| Name & Link                       | Description                       |
| --------------------------------- | --------------------------------- |
| [Express](https://expressjs.com/) | Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. |
| [Nest](https://github.com/nestjs/nest) | A progressive Node.js framework for building efficient, scalable, and enterprise-grade server-side applications on top of ExpressJS. |
| [TypeORM](http://typeorm.io/#/) | TypeORM is highly influenced by other ORMs, such as Hibernate, Doctrine and Entity Framework. |
| [class-validator](https://github.com/pleerock/class-validator) | Validation made easy using TypeScript decorators. |
| [class-transformer](https://github.com/pleerock/class-transformer) | Proper decorator-based transformation / serialization / deserialization of plain javascript objects to class constructors |
| [Helmet](https://helmetjs.github.io/) | Helmet helps you secure your Express apps by setting various HTTP headers. It’s not a silver bullet, but it can help! |
| [Auth0 API Documentation](https://auth0.com/docs/api/management/v2) | Authentification service |
| [Jest](http://facebook.github.io/jest/) | Delightful JavaScript Testing Library for unit and e2e tests |
| [supertest](https://github.com/visionmedia/supertest) | Super-agent driven library for testing node.js HTTP servers using a fluent API |
| [swagger Documentation](http://swagger.io/) | API Tool to describe and document your api. |
| [GraphQL Documentation](http://graphql.org/graphql-js/) | A query language for your API. |

## ❯ Turing Advanced Requirements
#### 1. The current system can support 100,000 daily active users. How do you design a new system to support 1,000,000 daily active users?