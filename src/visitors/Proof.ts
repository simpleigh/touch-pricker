/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-26 Leigh Simpson. All rights reserved.
 */

import { type AbstractBlock, BlockDirectory } from '../blocks';
import { type Row, stringFromRow } from '../rows';
import AbstractVisitor from './AbstractVisitor';

/**
 * Visitor for proving touches
 *
 * Stores the rows that have been visited and reports when whether any
 * rows were repeated.
 * This visitor also accumulates a {@link BlockDirectory} referencing
 * each block containing a false row.
 */
class Proof extends AbstractVisitor {
    /**
     * Log of rows that we've seen.
     *
     * Rows are accumulated into a `Map` indexed by the string representation of
     * a row. Each value is an array of all blocks that contain the indexed row.
     */
    private readonly _rowCounts = new Map<
        string,
        (AbstractBlock | undefined)[]
    >();

    /**
     * Directory of false blocks.
     */
    private readonly _directory = new BlockDirectory();

    /**
     * Flag recording truth.
     * Truth can be calculated from the result of {@link getRowCounts} but
     * keeping a flag up-to-date is a simple optimisation to avoid iterating
     * over that property each time we check truth.
     */
    private _isTrue: boolean = true;

    /**
     * Reports the number of times each row has been processed.
     * @returns Dictionary containing the count of each row seen,
     * indexed by the string representation of that row.
     */
    public getRowCounts(): Record<string, number> {
        const result: Record<string, number> = {};

        for (const [rowString, blocks] of this._rowCounts.entries()) {
            result[rowString] = (blocks as AbstractBlock[]).length;
        }

        return result;
    }

    /**
     * Reports on the distribution of falseness within a touch as a
     * {@link BlockDirectory}.
     */
    get directory(): Readonly<BlockDirectory> {
        return this._directory;
    }

    /**
     * Reports whether a touch is true.
     * Truth can be calculated from the result of {@link getRowCounts} but this
     * flag helps avoid iterating over that property each time we check truth.
     */
    get isTrue(): boolean {
        return this._isTrue;
    }

    /* AbstractVisitor methods ************************************************/

    /**
     * Receives a row for processing.
     */
    protected visitImplementation(row: Row, block?: AbstractBlock): void {
        const rowString = stringFromRow(row);

        if (this._rowCounts.has(rowString)) {
            // Already seen - i.e. false

            const entry = this._rowCounts.get(rowString)!;
            if (entry.length === 1) {
                // First time this row has run false
                // need to add the previous block to the directory
                const [previousBlock] = entry;
                if (previousBlock) {
                    this._directory.add(previousBlock);
                }
            }

            this._isTrue = false;
            if (block) {
                this._directory.add(block);
            }
            entry.push(block);
        } else {
            // Not seen - i.e. true
            this._rowCounts.set(rowString, [block]);
        }
    }
}

export default Proof;
