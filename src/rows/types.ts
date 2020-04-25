/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

/**
 * Matches the number of bells to the name of each stage
 */
export enum Stage {
    Minimus = 4,
    Doubles = 5,
    Minor = 6,
    Triples = 7,
    Major = 8,
    Caters = 9,
    Royal = 10,
    Cinques = 11,
    Maximus = 12,
    Sextuples = 13,
    Fourteen = 14,
    Septuples = 15,
    Sixteen = 16,
}

/**
 * Bell number
 *
 * n.b. Bell numbers are 1-indexed, i.e.:
 * - treble =  1
 * - eleven = 11
 */
export type Bell =
    1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

/**
 * A row (permutation of bells)
 */
export type Row = Bell[];

/**
 * A change
 *
 * Changes permute a row in order to generate the next row.
 * They should be constructed using `changeFromNotation()`.
 *
 * ```
 * > const row = Pricker.rounds(Pricker.Stage.Triples);
 * [1, 2, 3, 4, 5, 6, 7]
 * > const change = Pricker.changeFromNotation('1', Pricker.Stage.Triples);
 * 1
 * > change(row);
 * [1, 3, 2, 5, 4, 7, 6]
 * ```
 */
export type Change = ((row: Row) => void);
