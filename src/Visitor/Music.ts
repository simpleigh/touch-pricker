/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../AbstractSix.ts" />
/// <reference path="../Row.ts" />
/// <reference path="../stringFromRow.ts" />
/// <reference path="../TouchIndex.ts" />
/// <reference path="../Music/MatcherInterface.ts" />
/// <reference path="Abstract.ts" />

namespace Pricker {
    'use strict';

    /**
     * Visitor classes to analyse blocks
     */
    export namespace Visitor {

        /**
         * Visitor for music analysis
         *
         * Matches rows using a music matcher ([[MatcherInterface]]) that can
         * report on the musical content of a touch.
         * This visitor also accumulates a [[TouchIndex]] containing references
         * to each block containing a musical row.
         */
        export class Music extends AbstractVisitor {

            /**
             * Index of musical blocks.
             */
            private _index: Pricker.TouchIndex;

            /**
             * Creates the visitor, providing the matcher that should be used.
             * @param _matcher Matcher to be used.
             */
            constructor(protected _matcher: Pricker.Music.MatcherInterface) {
                super();
                this._index = new Pricker.TouchIndex();
            }

            /**
             * Reports on musical content of a touch by providing public access
             * to [[_matcher]].
             */
            public getMatcher(): Pricker.Music.MatcherInterface {
                return this._matcher;
            }

            /**
             * Reports where music is found within a touch by providing public
             * access to [[_index]].
             */
            public getIndex(): Pricker.TouchIndex {
                return this._index;
            }

            /* AbstractVisitor methods ****************************************/

            /**
             * Receives a row for processing.
             */
            protected visitImplementation(row: Row, six?: AbstractSix): void {
                const matches = this._matcher.match(stringFromRow(row));
                if (matches && six) {
                    this._index.add(six);
                }
            }

        }

    }

}
