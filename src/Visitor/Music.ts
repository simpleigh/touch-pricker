/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../AbstractSix.ts" />
/// <reference path="../Row.ts" />
/// <reference path="../TouchIndex.ts" />
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

            private _index: Pricker.TouchIndex;

            /**
             * Constructor
             */
            constructor(protected _matcher: Pricker.Music.MatcherInterface) {
                super();
                this._index = new Pricker.TouchIndex();
            }

            /**
             * Read access to the matcher
             */
            public getMatcher(): Pricker.Music.MatcherInterface {
                return this._matcher;
            }

            /**
             * Read access to the index
             */
            public getIndex(): Pricker.TouchIndex {
                return this._index;
            }

            /**
             * Receives a row for processing
             */
            public visitImplementation(row: Row, six?: AbstractSix): void {
                const matches = this._matcher.match(row);
                if (matches && six) {
                    this._index.add(six);
                }
            }

        }

    }

}
