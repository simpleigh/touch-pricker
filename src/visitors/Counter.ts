/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { AbstractBlock } from '../blocks';
import { Row } from '../rows';
import AbstractVisitor from './AbstractVisitor';

/**
 * Simple visitor that counts rows
 *
 * Accumulates a count of rows that is incremented by each call to
 * {@link visit}.
 * This visitor allows the count of rows in a touch because rows are not
 * processed after rounds has been reached.
 */
class Counter extends AbstractVisitor {
    /**
     * Count of rows that have been visited.
     */
    private _count: number = 0;

    /**
     * Reports the count of rows by providing public access to
     * {@link _count}.
     */
    get count(): number {
        return this._count;
    }

    /* AbstractVisitor methods ************************************************/

    /**
     * Receives a row for processing.
     */
    protected visitImplementation(row: Row, block?: AbstractBlock): void {
        this._count += 1;
    }
}

export default Counter;
