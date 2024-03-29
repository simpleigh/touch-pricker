/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 * The algorithm in this file is adapted from the C++ implementation of StedTurn
 * written by Philip Saddleton.
 */

import {
    multiply,
    rankFromRow,
    type Row,
    type Stage,
    rowFromRank,
} from '../rows';
import Table from './Table';

/**
 * Create a data table for use with the {@link search} touch search function.
 *
 * Creates a table that stores the minimum number of steps needed to get from
 * rounds to a particular row.
 *
 * Sixes (in Stedman) alternate between slow and quick and we can work around
 * this complexity by searching in steps of a "pair" of sixes, being a call, a
 * slow six, another call, and a quick six. Any row can be followed by any of
 * seven other rows.
 *
 * We start from rounds itself which is (trivially) 0 steps from rounds.
 * We loop over the seven possible transpositions to generate seven new rows
 * that are each one step from rounds, writing the number of steps into the
 * table as we go. We then iterate over those seven new rows generating 49 rows
 * that are two steps from rounds and continue onwards until the table is full.
 * @param stage  Stage for which to build the table.
 * @param transpositions  Transpositions to use to move between nodes.
 * @param logger  Optional logger to output.
 */
const createTable = (
    stage: Stage,
    transpositions: Map<string, Row>,
    logger: (message: string) => void = () => {
        // NOOP
    },
): Table => {
    logger(`Building table on ${stage} bells...`);

    const table = new Table(stage);

    // Starting point: rounds is trivially rounds.
    table.setValue(0, 0);
    let steps: number = 1;
    let ranks: number[] = [0];

    // Keep looping while we're finding new rows.
    while (ranks.length) {
        logger(`${steps} steps`);

        // Array of ranks to take forward to the next iteration.
        const newRanks: number[] = [];

        for (const rank of ranks) {
            const oldRow = rowFromRank(rank, stage);

            // Loop through each possible calling.
            for (const transposition of transpositions.values()) {
                const newRow = multiply(oldRow, transposition);
                const newRank = rankFromRow(newRow);

                if (steps < table.getValue(newRank)) {
                    // If we've found a new shortest path than store it...
                    table.setValue(newRank, steps);
                    // ... and take the rank forward to the next iteration.
                    newRanks.push(newRank);
                }
            }
        }

        steps += 1;
        ranks = newRanks;
    }

    logger('... done!');

    return table;
};

export default createTable;
