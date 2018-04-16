/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../rowFromString.ts" />
/// <reference path="../Stage.ts" />
/// <reference path="../stringFromRow.ts" />
/// <reference path="MatcherInterface.ts" />

namespace Pricker {

    /**
     * Music classes to analyse rows
     */
    export namespace Music {

        /**
         * Abstract music matching scheme
         */
        export abstract class AbstractScheme implements MatcherInterface {

            /**
             * Matchers for this scheme
             */
            protected _matchers: MatcherInterface[];

            /**
             * Constructor
             */
            constructor(protected _stage: Stage) {
                this._matchers = this.createMatchers(
                    stringFromRow(rowFromString('', _stage)),  // rounds
                );
            }

            /* MatcherInterface methods ***************************************/

            /**
             * Matches a row string
             */
            public match(row: string): boolean {
                let result: boolean = false;

                for (const matcher of this._matchers) {
                    if (!matcher) { continue; }  // IE8 trailing comma
                    // Call matcher.match explicitly...
                    const rowResult: boolean = matcher.match(row);
                    // ... not in here, or || will short-circuit it
                    result = result || rowResult;
                }

                return result;
            }

            /**
             * Provides read access to the name
             */
            public abstract getName(): string;

            /**
             * Provides read access to the count of matches
             */
            public getMatchCount(): number {
                let matches: number = 0;

                for (const matcher of this._matchers) {
                    if (!matcher) { continue; }  // IE8 trailing comma
                    matches += matcher.getMatchCount();
                }

                return matches;
            }

            /* PrintableMixin methods *****************************************/

            /**
             * Renders the object with a template
             */
            public print: (t: string, c?: TemplateContext) => string;

            /**
             * Path for this class' templates
             */
            public readonly templatePath: string = 'Music.AbstractScheme';

            /* AbstractScheme methods *****************************************/

            /**
             * Create matchers for this scheme/stage
             */
            protected abstract createMatchers(
                rounds: string,
            ): MatcherInterface[];

            /**
             * Provides read access to the matchers
             */
            public getMatchers(): MatcherInterface[] {
                return this._matchers.slice();
            }

        }

        PrintableMixin.makePrintable(AbstractScheme);

    }

}
