# touch-pricker

[![Build Status](https://travis-ci.org/simpleigh/touch-pricker.svg?branch=master)](https://travis-ci.org/simpleigh/touch-pricker)
[![Codecov](https://img.shields.io/codecov/c/github/simpleigh/touch-pricker.svg)](https://codecov.io/gh/simpleigh/touch-pricker)

Free Touch Pricker

(WIP)

Currently supports the following methods on various stages:

- Grandsire
- Stedman
- Erin
- Carter
- Stedman Jump

Based heavily on that created by
[Mark Davies](http://bronze-age.org/stedman2/pricker.html).

## Installation

### Installation using npm

Install using `npm` or [`yarn`](https://yarnpkg.com/):

```bash
# npm
npm install --save-dev touch-pricker

# yarn
yarn add --dev touch-pricker
```

Modify your page to include an element where the pricker will be mounted:

```html
<div id="pricker"></div>
```

Then load using your preferred bundler and module syntax, either CommonJS:

```javascript
const Pricker = require('touch-pricker');

const thePricker = Pricker.create('pricker'); // ID of mount element
```

... or using ES6 modules:

```javascript
import Pricker from 'touch-pricker';

const thePricker = Pricker.create('pricker'); // ID of mount element
```

### Installation from source

Download the source file of your choice from the `dist` directory of this repository:

* development - `touch-pricker.js`
* production - `touch-pricker.min.js` and `touch-pricker.min.js.map`

Host the file locally and add to scripts:

```html
<script type="text/css" src="touch-pricker.min.js"></script>
```

Modify your page to include an element where the pricker will be mounted:

```html
<div id="pricker"></div>
```

... and then load it:

```html
<script type="text/javascript">
  window.onload = function () {
    var thePricker = Pricker.create('pricker'); // ID of mount element
  };
</script>
```

See `examples/mbd.html` for a full example.

## Configuration

The `Pricker.create()` call has the following signature:

```typescript
Pricker.create(id: string, config: Pricker.Options): Pricker.Pricker;
```

This currently supports the following configuration option:

### `iframe`

```javascript
{
  iframe: true // default
}
```

Controls whether to create the pricker within an `<iframe>` element in order to
isolate it from the parent page.
This prevents scripts or styles leaking between the pricker and its host,
but makes debugging more difficult.

## Development

### Prerequisites

1. Install [`nvm`](https://github.com/creationix/nvm) (or manually install a
   node version compatible with that defined in `nvmrc`).

2. Install [`yarn`](https://yarnpkg.com/).

### Quickstart: build

```bash
nvm install
yarn install
yarn build
```

### Yarn / `npm` scripts

* `build` - compiles all sources, `dev`, `prod` and `test`
* `build:dev` - compiles the development bundle
* `build:prod` - compiles the production bundle
* `build:test` - compiles the test bundle
* `doc` - builds documentation
* `lint` - lints all sources
* **`start`** - opens examples in a browser window and watches for changes
* **`start:tests`** - runs tests in a browser window and watches for changes
* **`test`** - runs tests in PhantomJS and watches for changes
* `test:browsers` - runs tests in multiple browsers
