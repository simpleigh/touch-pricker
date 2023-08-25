/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import type { AbstractBlock } from '../blocks';
import { type Row, stringFromRow } from '../rows';
import AbstractVisitor from './AbstractVisitor';

/**
 * Simple visitor that accumulates rows into an array of strings
 *
 * Converts each visited row to a string and stores it.
 * The visitor accumulates rows from a touch in the order they're rung.
 */
class StringArray extends AbstractVisitor {
    /**
     * Array of string representations of rows that have been visited.
     */
    private readonly _strings: string[] = [];

    /**
     * Reports the rows that have been visited by providing public
     * access to {@link _strings}.
     */
    get strings(): readonly string[] {
        return this._strings.slice();
    }

    /* AbstractVisitor methods ************************************************/

    /**
     * Receives a row for processing.
     */
    protected visitImplementation(row: Row, block?: AbstractBlock): void {
        this._strings.push(stringFromRow(row));
    }
}

export default StringArray;
