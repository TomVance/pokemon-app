# Pokemon Translator App

This app is designed to allow you to search for a pokemon and get back its description in a shakespearean form. To do this we use the [PokeAPI](https://pokeapi.co/) and the [FunTranslations](https://funtranslations.com/) API.

# Contents

- [Getting started](#getting-started)
  - [With docker](#with-docker)
  - [Local configuration](#local-configuration)
- [Tech Stack](#tech-stack)

# Getting started

This project is built using Node v17.0.0 which can be downloaded and installed from their website: [https://nodejs.org/en/downloads](https://nodejs.org/en/downloads).

Once installed you will need to install the required dependencies as indicated within the `package.json` file:

With yarn:

```bash
cd pokemon-app
yarn install
```

With NPM:

```bash
cd pokemon-app
npm install
```

Once the dependencies have been installed you can go ahead and run the project:

With yarn:

```bash
yarn dev
```

With NPM:

```bash
npm run dev
```

Your console output will indicate to you which url to visit, however it should match: http://localhost:8080 (depending on the PORT number listed in your .env file, see local configuration below).

As well as this we also ship a Dockerfile that will allow you to get the project up and running quickly. To use this make sure you have Docker installed [Docker desktop](https://www.docker.com/products/docker-desktop).

## With Docker

You can then run the docker project from your local machine using:

```bash
docker build . -t <your-username>/pokemon-app
docker run -p 5000:8080 -d <your-username>/pokemon-app
```

And visiting the url: http://localhost:5000

## Local configuration

Depending on your system you may not be able to run this project on its default port of 8080, no worries! If you do need to change this, you can open up the `.env` file at the root of this project change the PORT number to something that works for you.

# Running the test suit

The application comes with two test suits, unit tests written using mocha and end to end tests for the UI written using cypress.

Each of these can be run independently or together in parallel:

```bash
npm run test
npm run test:e2e
npm run test:unit
```

**NOTE::** when running the e2e tests you must also have the application running in another terminal tab (see above for running locally)

# Tech stack

This project is built using the [Remix Run](https://remix.run) framework. Using React and Express under the hood. Remix is a great fullstack framework allowing for performant server side rendering and progressive enhancement.

Utilizing this framework comes with many benefits, such as fast first time renders, co-location of logic and UI and smooth routes to progressive enhancement. For example, try this app with JS turned off it will still continue to work as it does with JS enabled.

For more on Remix and why its a great choice for modern app development checkout their docs [Remix Run](https://remix.run).

We also use other technologies throughout the project, such as Mocha and Cypress for testing. PostCSS for css generation and eslint/prettier for formatting and linting.
