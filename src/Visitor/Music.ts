/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../AbstractBlock.ts" />
/// <reference path="../Row.ts" />
/// <reference path="../Music/MatcherInterface.ts" />
/// <reference path="Abstract.ts" />

namespace Pricker {
    'use strict';

    /**
     * Visitor classes to traverse blocks
     */
    export namespace Visitor {

        /**
         * Music visitor that matches rows against a music matcher
         */
        export class Music extends AbstractVisitor {

            /**
             * Constructor
             */
            constructor(protected _matcher: Pricker.Music.MatcherInterface) {
                super();
            }

            /**
             * Read access to the matcher
             */
            public getMatcher(): Pricker.Music.MatcherInterface {
                return this._matcher;
            }

            /**
             * Receives a row for processing
             */
            public visitImplementation(row: Row, block?: AbstractBlock): void {
                this._matcher.match(row);
            }

        }

    }

}
