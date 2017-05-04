/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../PrintableMixin.ts" />
/// <reference path="../Row.ts" />
/// <reference path="MatcherInterface.ts" />

namespace Pricker {
    'use strict';

    /**
     * Music classes to analyse rows
     */
    export namespace Music {

        /**
         * Pattern that can be used to match rows
         */
        export class Pattern implements MatcherInterface, PrintableMixin {

            /**
             * Count of matches
             */
            protected _matchCount: number = 0;

            /**
             * Constructor
             * @param pattern  string to match
             * @param name     name of this pattern
             * @param type     type of match
             */
            constructor(
                protected _pattern: string,
                protected _name?: string,
                protected _type: MatchType = MatchType.Back,
            ) {
                // NOOP
            }

            /* MatcherInterface methods ***************************************/

            /**
             * Matches a row string
             */
            public match(row: string): boolean {
                if (this._type === MatchType.Back) {
                    row = row.slice(-this._pattern.length);
                } else if (this._type === MatchType.Front) {
                    row = row.slice(0, this._pattern.length);
                }

                if (row === this._pattern) {
                    this._matchCount += 1;
                    return true;
                }

                return false;
            }

            /**
             * Provides read access to the name
             */
            public getName(): string {
                if (this._name === undefined) {
                    return this._pattern;
                }
                return this._name;
            }

            /**
             * Provides read access to the count of matches
             */
            public getMatchCount(): number {
                return this._matchCount;
            }

            /* PrintableMixin methods******************************************/

            /**
             * Renders the object with a template
             */
            public print: (t: string, c?: TemplateContext) => string;

            /**
             * Path for this class' templates
             */
            public readonly templatePath: string = 'Music.Pattern';

            /* Pattern methods ************************************************/

            /**
             * Determines whether this is a wildcard match
             */
            public isWildcardMatch(): boolean {
                return this._type !== MatchType.Row;
            }

        }

        PrintableMixin.makePrintable(Pattern);

    }

}
