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
type CallPair = '  ' | '- ' | 's ' | ' -' | ' s' | '--' | 's-';

export default CallPair;
