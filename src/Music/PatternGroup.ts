/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../Row.ts" />
/// <reference path="MatcherInterface.ts" />
/// <reference path="Pattern.ts" />

namespace Pricker {
    'use strict';

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
             * @param {string}     name          - name of this pattern group
             * @param {Pattern[]}  patterns      - patterns in this group
             * @param {Pattern}    parentPattern - top-level pattern for count
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
             * Matches a row
             */
            public match(row: Row): boolean {
                let result: boolean = false;

                for (const pattern of this._patterns) {
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
                    matches += pattern.getMatchCount();
                }

                return matches;
            }

            /**
             * Renders the matcher with a template
             */
            public print(
                templateName: string,
                context: TemplateContext = { },
            ): string {
                templateName = this.templatePath + '.' + templateName;
                context.object = this;
                return Templates[templateName](context);
            }

            /**
             * Path for this class' templates
             */
            public readonly templatePath: string = 'Music.PatternGroup';

        }

    }

}
