# touch-pricker

[![Build Status](https://travis-ci.org/simpleigh/touch-pricker.svg?branch=master)](https://travis-ci.org/simpleigh/touch-pricker)

Free Touch Pricker

(WIP)

## To build and run tests

    nvm install
    yarn install
    bin/gulp

(exchange `/` for `\` on Windows)

## Available build targets

* `build` - builds source code
* `build-tests` - builds testcases (depends on build)
* `docs` - builds [TypeDoc](http://typedoc.org/) documentation
* `test` - runs unit tests under PhantomJS (default)
* `test-browsers` - runs unit tests under various browsers
* `watch` - rebuild whenever changes are made

## NPM scripts

* `build` - as above
* `lint` - calls `tslint` in isolation
* `test` - as above
* `watch` - as above

## To test in a browser window

Build tests (`bin/gulp build-tests`) then navigate to `jasmine.html`.
