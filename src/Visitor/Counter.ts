/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../AbstractSix.ts" />
/// <reference path="../Row.ts" />
/// <reference path="Abstract.ts" />

namespace Pricker {

    /**
     * Visitor classes to analyse blocks
     */
    export namespace Visitor {

        /**
         * Simple visitor that counts rows
         *
         * Accumulates a count of rows that is incremented by each call to
         * [[visit]].
         * This visitor allows the count of rows in a touch because rows are not
         * processed after rounds has been reached.
         */
        export class Counter extends AbstractVisitor {

            /**
             * Count of rows that have been visited.
             */
            private _count: number = 0;

            /**
             * Reports the count of rows by providing public access to
             * [[_count]].
             */
            public getCount(): number {
                return this._count;
            }

            /* AbstractVisitor methods ****************************************/

            /**
             * Receives a row for processing.
             */
            protected visitImplementation(row: Row, six?: AbstractSix): void {
                this._count += 1;
            }

        }

    }

}
