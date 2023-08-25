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

// eslint-disable-next-line import/no-internal-modules
const Pricker = require('../dist/touch-pricker');

const stages = [
    Pricker.Stage.Triples,
    Pricker.Stage.Caters,
    Pricker.Stage.Cinques,
];

for (const stage of stages) {
    console.time(stage);

    const method = new Pricker.Stedman.Methods.Stedman();
    const course = new Pricker.Stedman.Course(Pricker.rounds(stage), method);
    const transpositions = Pricker.Searching.createTranspositions(
        course,
        method.searchCallingStrings,
    );
    const table = Pricker.Searching.createTable(
        stage,
        transpositions,
        console.log,
    );
    writeFileSync(`data/stedman.${stage}.dat`, table.data);

    console.timeEnd(stage);
}
