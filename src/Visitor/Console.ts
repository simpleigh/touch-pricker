/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../AbstractSix.ts" />
/// <reference path="../Row.ts" />
/// <reference path="../stringFromRow.ts" />
/// <reference path="Abstract.ts" />

namespace Pricker {
    'use strict';

    export namespace Visitor {

        /**
         * Console visitor that logs rows to the console
         */
        export class Console extends AbstractVisitor {

            /* AbstractVisitor methods ****************************************/

            /**
             * Receives a row for processing
             */
            protected visitImplementation(row: Row, six?: AbstractSix): void {
                /* tslint:disable-next-line:no-console */
                console.log(stringFromRow(row));
            }

        }

    }

}
