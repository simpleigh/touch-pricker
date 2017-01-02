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
        export class Console implements AbstractVisitor {
            /**
             * Receives a row for processing
             */
            public visit(row: Row): this {
                /* tslint:disable:no-console */
                console.log(stringFromRow(row));
                /* tslint:enable:no-console */

                return this;
            }
        }

    }

}
