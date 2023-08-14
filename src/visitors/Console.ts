/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { AbstractBlock } from '../blocks';
import { Row, stringFromRow } from '../rows';
import AbstractVisitor from './AbstractVisitor';

/**
 * Simple visitor that logs rows to the console
 *
 * All visited rows are output via `console.log()`.
 * This visitor is useful for easily discovering what rows are being
 * generated.
 */
class Console extends AbstractVisitor {
    /* AbstractVisitor methods ************************************************/

    /**
     * Receives a row for processing.
     */
    protected visitImplementation(row: Row, block?: AbstractBlock): void {
        // eslint-disable-next-line no-console
        console.log(stringFromRow(row));
    }
}

export default Console;
