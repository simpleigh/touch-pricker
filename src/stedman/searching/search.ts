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
    Row,
    rowFromRank,
    Uint4Table,
} from '../../rows';
import type { Cache, CallPair } from './types';
import Calling from './Calling';
import createTranspositions from './createTranspositions';

/**
 * Extend each of a list of callings.
 *
 * While searching for touches we need to append the current calling being
 * examined onto each of a list of child callings returned recursively.
 * This also provides an opportunity to filter out undesirable callings.
 * @param touchList  Array of child touches produced by a recursive call
 * @param calling  Additional call to append at the end of each child touch
 */
export const extendTouchList = (
    touchList: string[],
    calling: CallPair,
): string[] => {
    // Filter the list to avoid undesirable callings like `-s` or `ss`.
    if (calling.startsWith('s')) {
        touchList = touchList.filter(
            (touch) => touch === '' || touch.endsWith(' '),
        );
    }

    return touchList.map((touch) => `${touch}${calling}`);
};

/**
 * The search implementation itself.
 *
 * See {@link search} for a fuller explanation of this algorithm.
 */
const recursiveSearch = (
    table: Uint4Table,
    targetRank: number,
    steps: number,
    transpositions: Map<CallPair, Row>,
    cache: Cache = {},
): string[] => {
    // Halt recursion if we've run out of steps.
    if (steps === 0) {
        return ['']; // base case: a single touch of zero length
    }

    // If we already have a result in the cache then return it.
    if (cache[targetRank]?.[steps]) {
        return cache[targetRank]![steps]!;
    }

    let touches: string[] = [];

    // Loop through each possible calling.
    for (const [calling, transposition] of transpositions.entries()) {
        const oldRow = rowFromRank(targetRank, table.stage);
        const newRow = multiply(oldRow, transposition);
        const newRank = rankFromRow(newRow);

        if (table.getValue(newRank) < steps) {
            // If we've got closer to the target then recurse.
            const childTouches = recursiveSearch(
                table,
                newRank,
                steps - 1,
                transpositions,
                cache,
            );

            // Store the result in the cache.
            if (!cache[newRank]) {
                cache[newRank] = {};
            }
            cache[newRank]![steps - 1] = childTouches;

            touches = [...touches, ...extendTouchList(childTouches, calling)];
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
): Calling[] => {
    const transpositions = createTranspositions(table.stage, true);
    steps ??= table.getValue(targetRank);
    return recursiveSearch(table, targetRank, steps, transpositions).map(
        (calling: string): Calling => new Calling(calling),
    );
};

/**
 * Asynchronous version of {@link search}.
 *
 * Returns a `Promise` that resolves when the search is complete. Can be used to
 * yield control to the browser so that it can complete any DOM changes before
 * starting a search.
 */
export const searchAsync = async (
    table: Uint4Table,
    targetRank: number,
    steps?: number,
): Promise<Calling[]> =>
    new Promise<Calling[]>((resolve) => {
        setTimeout(() => {
            resolve(search(table, targetRank, steps));
        });
    });

export default search;
