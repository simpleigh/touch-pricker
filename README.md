# touch-pricker

[![Build Status](https://travis-ci.org/simpleigh/touch-pricker.svg?branch=master)](https://travis-ci.org/simpleigh/touch-pricker)

Free Touch Pricker

(WIP)

Currently supports a pricker for Stedman touches on various stages,
based heavily on that created by
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
* production - `touch-pricker.min.js`

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
Pricker.create(id: string, config: any): Pricker.Pricker.Abstract;
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

### Quickstart: build and run tests

```bash
nvm install
yarn install
bin/gulp
```

### Available gulp targets

* `build` - builds source code
* `build-tests` - builds testcases (depends on `build`)
* `docs` - builds [TypeDoc](http://typedoc.org/) documentation
* `test` - runs unit tests under PhantomJS (default)
* `test-browsers` - runs unit tests under various browsers (see `karma.conf.js`)
* `watch` - rebuild whenever changes are made

### Yarn / `npm` scripts

* `build` - as above
* `lint` - calls `tslint` in isolation
* `test` - as above
* `watch` - as above

### To test in a browser window

Build tests (`bin/gulp build-tests`) then load up `/jasmine.html`.
