# StarKey Base Library

This library is designed to provide a database agnostic, pluggable, secure base for any application with an emphasis on config over boilerplate. It provides methods to configure, secure, log and plug into any system. Includes features to handle logging, data storage, IAM and more.

## Table of Contents
  1. [Introduction](#introduction)
  2. [Installation](#installation)
  3. [API Reference](#api-reference)

## Introduction
StarKey is a simple, flexible application boilerplate. It is designed to be used as a framework for an application, or as an abstraction library for common application functionality.

StarKey uses data connectors to allow for any database to be used. On initialization of the Data Access Object (DAO), all database queries are converted from SQLite to an abstract syntax tree (AST). The AST is passed to the connector to be converted into queries for the configured database. Additionally, there is a "pass-through" mode that skips the AST conversion, and passes the queries directly to the connector. StarKey includes a SQLite connector, which operates in pass-through mode. Query definition file locations are configurable, which allows the option to utilize pass-through for any database platform. Additional connectors may be configured as plugins.

A plugin system allows packages to be instantiated as plugins that hook into events provided by StarKey. Additional events may be configured as plugins or added directly using the Event class' abstraction.

Identity and access management (IAM) is provided via an abstraction class that implements Passport and Express Session with configurable strategies. Out of the box, StarKey offers local, Google, and Facebook strategies. Additional strategies can be configured, including custom strategies.

Logging is handled by a logger class, which calls a logging service to perform writes synchronously. `Not implemented yet. I changed how I was going to do this after I already implemented the basic logging class. I may keep the existing solution as an option`. Logging can utilize log files or a database, or another solution.

To maximize performance, StarKey does as much work as possible during startup. This can make for long startup times in some implementations. `Should I make this configurable?`

## Installation

StarKey is designed to be used either as an abstraction library, a set of services, or a framework.
Install with npm or yarn:

```Bash
npm i --save starkey
yarn add starkey
```

Then, import into your project. Once configured, StarKey can be used as an app framework with just 2 lines of code:

```JavaScript
import StarKey from 'starkey';

const app = new StarKey();
```

Or, use StarKey as an abstraction library for common application tasks, like logging:

```JavaScript
import { Logger } from 'starkey';

Logger.error('error message here');

// or

const logger = new Logger();
logger.log('Log a message or event');

// or

class ApplicationClass extends Logger {
  // Class stuff
}

const app = new ApplicationClass();

app.log('Now my class has logging methods');

ApplicationClass.log('Including static ones');
```

or access configuration values:

```JavaScript
import { Loader } from 'starkey';

Loader.getConfig('database.type');

// or

const loader = new Loader();
loader.getConfig('logs.config.toStdOut');

// or

class ApplicationClass extends Loader {
  // Class stuff
}

const app = new ApplicationClass();

app.writeConfig({
  'altConfigPath': '~/myconfig.yaml'
});

const dbPath = ApplicationClass.getConfig('database.path');
```

## API Reference

[Go to the docs](docs/README.md)


