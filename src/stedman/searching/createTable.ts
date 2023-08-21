/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 * The function in this file is adapted from the C++ implementation of StedTurn
 * written by Philip Saddleton.
 */

import {
    multiply,
    rankFromRow,
    rowFromRank,
    Stage,
    Uint4Table,
} from '../../rows';
import type { CallPair } from './types';
import createTranspositions from './createTranspositions';

/**
 * Create a data table for use with the {@link search} touch search function.
 *
 * Creates a table that stores the minimum number of steps needed to get from
 * rounds to a particular row.
 * @param stage  Stage for which to build the table.
 * @param logger  Optional logger to output
 */
const createTable = (
    stage: Stage,
    logger: (message: string) => void = () => {
        // NOOP
    },
): Uint4Table => {
    logger(`Building table on ${stage} bells...`);

    const table = new Uint4Table(stage);
    const transpositions = createTranspositions(stage);

    // Set the maximum possible value for each row: we'll reduce this as we go.
    for (let rank = 1; rank < table.length; rank += 1) {
        table.setValue(rank, 15);
    }

    // Rounds is trivially rounds.
    table.setValue(0, 0);

    // Count sequentially in numbers of steps, keeping track of the maximum
    // number of steps found and terminating when that stops increasing.
    let maxSteps: number = 0;
    for (let steps = 0; steps <= maxSteps; steps += 1) {
        logger(`${steps} steps`);

        for (let rank = 0; rank < table.length; rank += 1) {
            if (table.getValue(rank) !== steps) {
                continue; // eslint-disable-line no-continue
            }

            const oldRow = rowFromRank(rank, stage);
            for (const calling of Object.getOwnPropertyNames(transpositions)) {
                const newRow = multiply(
                    oldRow,
                    transpositions[calling as CallPair],
                );
                const newRank = rankFromRow(newRow);

                if (table.getValue(newRank) > steps + 1) {
                    table.setValue(newRank, steps + 1);
                    maxSteps = steps + 1;
                }
            }
        }
    }

    logger('... done!');

    return table;
};

export default createTable;
