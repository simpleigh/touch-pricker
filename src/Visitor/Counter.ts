/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../AbstractSix.ts" />
/// <reference path="../Row.ts" />
/// <reference path="Abstract.ts" />

namespace Pricker {
    'use strict';

    /**
     * Visitor classes to traverse blocks
     */
    export namespace Visitor {

        /**
         * Counter visitor that counts rows
         */
        export class Counter extends AbstractVisitor {
            /**
             * Count of rows we've seen
             */
            private _count: number = 0;

            /**
             * Read access to the count
             */
            public getCount(): number {
                return this._count;
            }

            /**
             * Receives a row for processing
             */
            public visitImplementation(row: Row, six?: AbstractSix): void {
                this._count += 1;
            }
        }

    }

}
