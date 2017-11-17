/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../TemplateContext.ts" />
/// <reference path="MatcherInterface.ts" />
/// <reference path="Pattern.ts" />

namespace Pricker {

    /**
     * Music classes to analyse rows
     */
    export namespace Music {

        /**
         * Group of similar patterns to match related rows
         */
        export class PatternGroup implements MatcherInterface {

            /**
             * Patterns in this group
             */
            protected _patterns: Pattern[];

            /**
             * Constructor
             * @param name           name of this pattern group
             * @param patterns       patterns in this group
             * @param parentPattern  top-level pattern for count
             */
            constructor(
                protected _name: string,
                patterns: Pattern[],
                protected _parentPattern?: Pattern,
            ) {
                this._patterns = patterns.slice();
            }

            /* MatcherInterface methods ***************************************/

            /**
             * Matches a row string
             */
            public match(row: string): boolean {
                let result: boolean = false;

                for (const pattern of this._patterns) {
                    if (!pattern) { continue; }  // IE8 trailing comma
                    // Call pattern.match explicitly...
                    const rowResult: boolean = pattern.match(row);
                    // ... not in here, or || will short-circuit it
                    result = result || rowResult;
                }

                if (this._parentPattern) {
                    this._parentPattern.match(row);
                }

                return result;
            }

            /**
             * Provides read access to the name
             */
            public getName(): string {
                return this._name;
            }

            /**
             * Provides read access to the count of matches
             */
            public getMatchCount(): number {
                if (this._parentPattern) {
                    return this._parentPattern.getMatchCount();
                }
                return this.getSubmatchCount();
            }

            /* PrintableMixin methods *****************************************/

            /**
             * Renders the object with a template
             */
            public print: (t: string, c?: TemplateContext) => string;

            /**
             * Path for this class' templates
             */
            public readonly templatePath: string = 'Music.PatternGroup';

            /* PatternGroup methods *******************************************/

            /**
             * Provides read access to the patterns
             */
            public getPatterns(): Pattern[] {
                return this._patterns.slice();
            }

            /**
             * Provides read access to the count of matches within patterns
             */
            public getSubmatchCount(): number {
                let matches: number = 0;

                for (const pattern of this._patterns) {
                    if (!pattern) { continue; }  // IE8 trailing comma
                    matches += pattern.getMatchCount();
                }

                return matches;
            }

        }

        PrintableMixin.makePrintable(PatternGroup);

    }

}
