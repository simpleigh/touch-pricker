/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 * The function in this file is inspired by the C++ implementation of StedTurn
 * written by Philip Saddleton.
 */

import {
    multiply,
    rankFromRow,
    Row,
    rowFromRank,
    Uint4Table,
} from '../../rows';
import CallPair from './CallPair';
import createTranspositions from './createTranspositions';

const recursiveSearch = (
    table: Uint4Table,
    targetRank: number,
    steps: number,
    transpositions: Record<CallPair, Row>,
): string[] => {
    // Halt recursion if we've run out of steps.
    if (steps === 0) {
        return ['']; // base case: a single touch of zero length
    }

    const touches: string[] = [];

    // Loop through each possible calling.
    for (const calling of Object.getOwnPropertyNames(transpositions)) {
        const oldRow = rowFromRank(targetRank, table.stage);
        const newRow = multiply(oldRow, transpositions[calling as CallPair]);
        const newRank = rankFromRow(newRow);

        if (table.getValue(newRank) < steps) {
            // If we've got closer to the target then recurse.
            const childTouches = recursiveSearch(
                table,
                newRank,
                steps - 1,
                transpositions,
            );
            for (const touch of childTouches) {
                // Prune touches with undesirable calling.
                const touchEndsWithCall =
                    touch.length && touch[touch.length - 1] !== ' ';
                const callStartsWithSingle = calling[0] === 's';

                if (!(touchEndsWithCall && callStartsWithSingle)) {
                    touches.push(`${touch}${calling}`);
                }
            }
        }
    }

    return touches;
};

/**
 * Searches for all callings from rounds to a target row.
 *
 * We search by exploring a tree structure where each node in the tree
 * represents a single {@link Row}. We work backwards from the target row hoping
 * to find rounds at the required number of steps.
 *
 * Sixes (in Stedman) alternate between slow and quick and we can work around
 * this complexity by searching in steps of a "pair" of sixes, being a call, a
 * slow six, another call, and a quick six. Any row can be followed by any of
 * seven other rows: one per {@link CallPair}.
 *
 * The tree therefore expands rapidly. The node for the target row is connected
 * to seven other nodes; the next layer has 49 nodes and there's 343 after that.
 * By the time we get to 11 steps (22 sixes or a course of Stedman Cinques)
 * we would have 2,306,881,200 nodes in our tree. We need to optimise.
 *
 * We can prune the tree as we go by using a data table that stores the minimum
 * number of steps needed to get from rounds to the target row. This can easily
 * be generated in advance and works as follows:
 *
 * 1. Say (for example) our target row can only be reached from rounds after a
 *   minimum of 7 steps.
 * 2. Iterate over the seven nodes connected to the target row (representing the
 *   rows two sixes before the target row with each {@link CallPair}).
 * 3. For each node, check the minimum distance from rounds. If that is more
 *   than 6 steps then discard the node (we're moving away from rounds).
 * 4. Continue on from each remaining node.
 *
 * We've already filtered the list of {@link CallPair}s to exclude undesirable
 * callings (being `-s` or `ss`). We also need to filter out touches where these
 * callings develop _between_ pairs. We can do this as we go.
 * @param table  Data table being used for the search.
 * @param targetRank  Row we're trying to reach from rounds.
 * @param steps  Number of steps we can take to get to rounds.
 */
const search = (
    table: Uint4Table,
    targetRank: number,
    steps?: number,
): string[] => {
    const transpositions = createTranspositions(table.stage, true);
    steps ??= table.getValue(targetRank);
    return recursiveSearch(table, targetRank, steps, transpositions);
};

export default search;
