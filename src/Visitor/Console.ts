/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import AbstractSix from '../AbstractSix';
import Row from '../Row';
import stringFromRow from '../stringFromRow';
import AbstractVisitor from './Abstract';

/**
 * Simple visitor that logs rows to the console
 *
 * All visited rows are output via `console.log()`.
 * This visitor is useful for easily discovering what rows are being
 * generated.
 */
class Console extends AbstractVisitor {

    /* AbstractVisitor methods ****************************************/

    /**
     * Receives a row for processing.
     */
    protected visitImplementation(row: Row, six?: AbstractSix): void {
        /* tslint:disable-next-line:no-console */
        console.log(stringFromRow(row));
    }

}

export default Console;
