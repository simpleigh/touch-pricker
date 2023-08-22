/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { AbstractBlock, BlockDirectory } from '../blocks';
import { Row, stringFromRow } from '../rows';
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
     * Truth can easily be calculated from {@link _rowCounts}, but keeping a
     * flag up-to-date is a simple optimisation to avoid iterating over
     * this property each time we check truth.
     */
    private _isTrue: boolean = true;

    /**
     * Reports the number of times each row has been processed.
     * Processes {@link _rowCounts} to convert each array of blocks into a
     * count.
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
     * Reports on the distribution of falseness within a touch by
     * providing public access to {@link _directory}.
     */
    get directory(): Readonly<BlockDirectory> {
        return this._directory;
    }

    /**
     * Reports whether a touch is true by providing public access to
     * {@link _isTrue}.
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
