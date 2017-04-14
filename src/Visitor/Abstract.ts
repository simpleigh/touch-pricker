/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../Row.ts" />
/// <reference path="../rowFromString.ts" />
/// <reference path="../stringFromRow.ts" />

namespace Pricker {
    'use strict';

    /**
     * Visitor classes to traverse blocks
     */
    export namespace Visitor {

        /**
         * Interface for visitors
         */
        export abstract class AbstractVisitor {
            /**
             * Whether or not we're still processing rows
             */
            private _visiting: boolean = true;

            /**
             * Remember rounds so we don't have to keep regenerating
             */
            private _rounds: string;

            /**
             * Receives a row for processing, stopping after rounds is reached
             */
            public visit(row: Row): this {
                if (!this._rounds) {
                    this._rounds = stringFromRow(rowFromString('', row.length));
                }

                if (this._visiting) {
                    this.visitImplementation(row);
                    if (stringFromRow(row) === this._rounds) {
                        this._visiting = false;
                    }
                }
                return this;
            }

            /**
             * Reports whether rows are still being processed
             */
            public isVisiting(): boolean {
                return this._visiting;
            }

            /**
             * Underlying implementation to be overridden by derived classes
             */
            protected abstract visitImplementation(row: Row): void;
        }

    }

}
