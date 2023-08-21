/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/* eslint-disable @typescript-eslint/sort-type-constituents */

/**
 * Callings for a pair of sixes.
 *
 * There are seven possible callings for a pair of sixes:
 *
 * - two plain sixes
 * - `'- '`
 * - `'s '`
 * - `' -'`
 * - `' s'`
 * - `'--'`
 * - `'s-'`
 *
 * The callings `ss` and `-s` are excluded because they are equivalent to `--`
 * and `s-` respectively (they produce the same result).
 */
export type CallPair = '  ' | '- ' | 's ' | ' -' | ' s' | '--' | 's-';

/**
 * A cache of search results.
 *
 * It's common while searching to visit the same node multiple times, i.e. to
 * reach the same six end in lots of different ways. Recalculating following
 * nodes repeatedly is wasteful so we use a cache to store the calculation for
 * immediate reuse if needed.
 *
 * We need to store different results for different numbers of steps so the
 * overall cache structure might look something like:
 *
 * ```
 * {
 *     0: { // rounds
 *         0: [''], // callings with zero steps
 *     },
 *     249: {
 *         4: ['- -- s  ', '-  -   s', '- s- s s'],
 *     },
 *     442: {
 *         2: ['- s-'],
 *     },
 *     551: {
 *         3: ['-  -  ', '- s- s'],
 *     },
 *     // ...
 * }
 * ```
 */
export type Cache = Partial<Record<number, Partial<Record<number, string[]>>>>;
