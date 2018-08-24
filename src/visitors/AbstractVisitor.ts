/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Row, rowFromString, stringFromRow } from '../rows';
import { AbstractSix } from '../stedman';

/**
 * Visitor classes to analyse blocks
 *
 * Any [[AbstractBlock]] can [[accept]] a visitor that will process their
 * [[Row]]s (An [[AbstractContainer]] recursively calls contained blocks in
 * turn to make sure all rows are reached).
 *
 * Visitors process each row in turn in the order they would be rung.
 * They take action for each row, probably modifying some internal state
 * based on the rows that they receive.
 * They stop processing rows if rounds is reached.
 *
 * There's no way to reset a visitor: create a new one in order to complete
 * a fresh analysis.
 *
 * @preferred
 */

/**
 * Base class for all visitors
 *
 * Defers to derived classes in order to process rows, but does check
 * whether rounds has been reached and stops processing at that point.
 */
abstract class AbstractVisitor {

    /**
     * Whether or not we're still processing rows.
     * Defaults to `true` (processing rows), but is set to `false` once
     * rounds has been visited.
     */
    private _visiting: boolean = true;

    /**
     * Remember rounds so we don't have to regenerate for each new row.
     */
    private _rounds: string;

    /**
     * Visits a row.
     * If we're still visiting (i.e. rounds hasn't been reached) then
     * we pass that row to derived classes for processing.
     */
    public visit(row: Row, six?: AbstractSix): this {
        if (!this._rounds) {
            this._rounds = stringFromRow(rowFromString('', row.length));
        }

        if (this._visiting) {
            this.visitImplementation(row, six);
            if (stringFromRow(row) === this._rounds) {
                this._visiting = false;
            }
        }
        return this;
    }

    /**
     * Reports whether rows are still being processed by providing
     * public access to [[_visiting]].
     */
    get visiting(): boolean {
        return this._visiting;
    }

    /**
     * Underlying visitor implementation (to be overridden by derived
     * classes).
     */
    protected abstract visitImplementation(row: Row, six?: AbstractSix): void;

}

export default AbstractVisitor;
