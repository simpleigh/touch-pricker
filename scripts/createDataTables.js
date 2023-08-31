#!/usr/bin/env node
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/**
 * Rebuilds data tables under `/data/`.
 */

'use strict';

const { writeFileSync } = require('fs');
const path = require('path');

// eslint-disable-next-line import/no-internal-modules
const Pricker = require('../dist/touch-pricker');

const methods = [
    ['carter', new Pricker.Stedman.Methods.Carter()],
    ['erin', new Pricker.Stedman.Methods.Erin()],
    ['jump', new Pricker.Stedman.Methods.StedmanJump()],
    ['stedman', new Pricker.Stedman.Methods.Stedman()],
];

const stages = [
    Pricker.Stage.Triples,
    Pricker.Stage.Caters,
    Pricker.Stage.Cinques,
];

for (const [slug, method] of methods) {
    for (const stage of stages) {
        const filename = path.join(__dirname, `../data/${slug}.${stage}.dat`);

        console.time(filename);

        const course = new Pricker.Stedman.Course(
            Pricker.rounds(stage),
            method,
        );
        const transpositions = Pricker.Searching.createTranspositions(
            course,
            method.searchCallingStrings,
        );
        const table = Pricker.Searching.createTable(
            stage,
            transpositions,
            console.log,
        );
        writeFileSync(filename, table.data);

        console.timeEnd(filename);
    }
}
