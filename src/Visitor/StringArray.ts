/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../Row.ts" />
/// <reference path="../stringFromRow.ts" />
/// <reference path="Abstract.ts" />

namespace Pricker {
    'use strict';

    /**
     * Visitor classes to traverse blocks
     */
    export namespace Visitor {

        /**
         * Interface for visitors
         */
        export class StringArray implements AbstractVisitor {
            /**
             * Rows we've seen
             */
            protected _strings: string[] = [];

            /**
             * Read access to the rows
             */
            public getStrings(): string[] {
                return this._strings;
            }

            /**
             * Receives a row for processing
             */
            public visit(row: Row): this {
                this._strings.push(stringFromRow(row));
                return this;
            }
        }

    }

}
