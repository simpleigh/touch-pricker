/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import { AbstractBlock, BlockDirectory } from '../blocks';
import { Row, stringFromRow } from '../rows';
import AbstractVisitor from './AbstractVisitor';

/**
 * Visitor for proving touches
 *
 * Stores the rows that have been visited and reports when whether any
 * rows were repeated.
 * This visitor also accumulates a [[BlockDirectory]] referencing
 * each block containing a false row.
 */
class Proof extends AbstractVisitor {

    /**
     * Log of rows that we've seen.
     * Rows are accumulated into a dictionary indexed by the string
     * representation of a row (the JavaScript implementation will thus
     * store a hash table, ensuring good performance).
     * Each value is an array of all blocks that contain the indexed
     * row.
     */
    private _rowCounts:
        { [index: string]: (AbstractBlock | undefined)[] } = { };

    /**
     * Directory of false blocks.
     */
    private _directory: BlockDirectory = new BlockDirectory();

    /**
     * Flag recording truth.
     * Truth can easily be calculated from [[_rowCounts]], but keeping a
     * flag up-to-date is a simple optimisation to avoid iterating over
     * this property each time we check truth.
     */
    private _isTrue: boolean = true;

    /**
     * Reports the number of times each row has been processed.
     * Processes [[_rowCounts]] to convert each array of blocks into a
     * count.
     * @returns Dictionary containing the count of each row seen,
     * indexed by the string representation of that row.
     */
    public getRowCounts(): { [index: string]: number } {
        const result: { [index: string]: number } = { };

        for (const rowString in this._rowCounts) {
            if (this._rowCounts.hasOwnProperty(rowString)) {
                result[rowString] = this._rowCounts[rowString].length;
            }
        }

        return result;
    }

    /**
     * Reports on the distribution of falseness within a touch by
     * providing public access to [[_directory]].
     */
    get directory(): BlockDirectory {
        return this._directory;
    }

    /**
     * Reports whether a touch is true by providing public access to
     * [[_isTrue]].
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

        if (rowString in this._rowCounts) {
            // Already seen - i.e. false

            if (this._rowCounts[rowString].length === 1) {
                // First time this row has run false
                // need to add the previous block to the directory
                const previousBlock = this._rowCounts[rowString][0];
                if (previousBlock) {
                    this._directory.add(previousBlock);
                }
            }

            this._isTrue = false;
            if (block) {
                this._directory.add(block);
            }
            this._rowCounts[rowString].push(block);

        } else {
            // Not seen - i.e. true
            this._rowCounts[rowString] = [block];
        }
    }

}

export default Proof;
