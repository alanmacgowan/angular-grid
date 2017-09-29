# angular grid
[![Build Status](https://travis-ci.org/alanmacgowan/angular-grid.svg?branch=master)](https://travis-ci.org/alanmacgowan/angular-grid)
[![codecov](https://codecov.io/gh/alanmacgowan/angular-grid/branch/master/graph/badge.svg)](https://codecov.io/gh/alanmacgowan/angular-grid)
[![npm version](https://badge.fury.io/js/angular-grid.svg)](http://badge.fury.io/js/angular-grid)
[![devDependency Status](https://david-dm.org/alanmacgowan/angular-grid/dev-status.svg)](https://david-dm.org/alanmacgowan/angular-grid?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/alanmacgowan/angular-grid.svg)](https://github.com/alanmacgowan/angular-grid/issues)
[![GitHub stars](https://img.shields.io/github/stars/alanmacgowan/angular-grid.svg)](https://github.com/alanmacgowan/angular-grid/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/alanmacgowan/angular-grid/master/LICENSE)

## Demo
https://alanmacgowan.github.io/angular-grid/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#license)

## About

basic grid for angular 2

## Installation

Install through npm:
```
npm install --save angular-grid
```

Then include in your apps module:

```typescript
import { NgModule } from '@angular/core';
import { AngularGridModule } from 'angular-grid';

@NgModule({
  imports: [
    AngularGridModule.forRoot()
  ]
})
export class MyModule {}
```

Finally use in one of your apps components:
```typescript
import { Component } from '@angular/core';

@Component({
  template: '<app-grid></app-grid>'
})
export class MyComponent {}
```

You may also find it useful to view the [demo source](https://github.com/alanmacgowan/angular-grid/blob/master/demo/demo.component.ts).

### Usage without a module bundler
```
<script src="node_modules/angular-grid/bundles/angular-grid.umd.js"></script>
<script>
    // everything is exported angularGrid namespace
</script>
```

## Documentation
All documentation is auto-generated from the source via [compodoc](https://compodoc.github.io/compodoc/) and can be viewed here:
https://alanmacgowan.github.io/angular-grid/docs/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
npm run release
```

## License

MIT
