<p align="center">
  Local backend for Pass System
</p>

## Description

<p align="center">Start Up</p>

## Installation

Run `docker-compose up -d` to create local mongoDB, need doceker to be installed, see [www.docker.com](https://www.docker.com/get-started/)

```bash
$ docker-compose up -d
```

Run `npm i` to install all necessary dependencies, need Node.js to be installed, see [nodejs.org](https://nodejs.org/en/download/current) 

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
