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
         * StringArray visitor that accumulates rows into an array
         */
        export class StringArray extends AbstractVisitor {

            /**
             * Rows we've seen
             */
            private _strings: string[] = [ ];

            /**
             * Read access to the rows
             */
            public getStrings(): string[] {
                return this._strings.slice();
            }

            /* AbstractVisitor methods ****************************************/

            /**
             * Receives a row for processing
             */
            protected visitImplementation(row: Row, six?: AbstractSix): void {
                this._strings.push(stringFromRow(row));
            }

        }

    }

}
