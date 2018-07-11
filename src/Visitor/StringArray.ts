/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import AbstractSix from '../AbstractSix';
import Row from '../Row';
import stringFromRow from '../stringFromRow';
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
    private _strings: string[] = [ ];

    /**
     * Reports the rows that have been visited by providing public
     * access to [[_strings]].
     */
    public getStrings(): string[] {
        return this._strings.slice();
    }

    /* AbstractVisitor methods ************************************************/

    /**
     * Receives a row for processing.
     */
    protected visitImplementation(row: Row, six?: AbstractSix): void {
        this._strings.push(stringFromRow(row));
    }

}

export default StringArray;
