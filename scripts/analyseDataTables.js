#!/usr/bin/env node
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/**
 * Analyses data tables under `/data/`.
 */

'use strict';

const { readdirSync, readFileSync } = require('fs');
const path = require('path');

// eslint-disable-next-line import/no-internal-modules
const Pricker = require('../dist/touch-pricker');

const dirname = path.join(__dirname, '../data');
for (const filename of readdirSync(dirname)) {
    console.log(`Analysing ${filename}...`);

    const stage = parseInt(filename.split('.')[1]);
    const buffer = readFileSync(path.join(dirname, filename));
    const table = new Pricker.Searching.Table(stage, buffer);

    const histogram = [];

    for (let i = 0; i < table.length; i += 1) {
        const value = table.getValue(i);

        if (!histogram[value]) {
            histogram[value] = 0;
        }

        histogram[value] += 1;
    }

    for (let i = 0; i < histogram.length; i += 1) {
        console.log(i, histogram[i]);
    }
}
