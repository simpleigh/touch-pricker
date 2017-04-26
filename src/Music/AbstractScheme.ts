/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../Stage.ts" />
/// <reference path="../rowFromString.ts" />
/// <reference path="../stringFromRow.ts" />
/// <reference path="MatcherInterface.ts" />

namespace Pricker {
    'use strict';

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
             * Matches a row
             */
            public match(row: Row): boolean {
                let result: boolean = false;

                for (const matcher of this._matchers) {
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
            public getMatches(): number {
                let matches: number = 0;

                for (const matcher of this._matchers) {
                    matches += matcher.getMatches();
                }

                return matches;
            }

            /* AbstractScheme methods *****************************************/

            /**
             * Create matchers for this scheme/stage
             */
            protected abstract createMatchers(
                rounds: string,
            ): MatcherInterface[];

            /**
             * Renders the matcher with a template
             */
            public print(
                templateName: string,
                context: TemplateContext = { },
            ): string {
                templateName = this.templatePath + '.' + templateName;
                context.object = this;
                context.matchers = this._matchers;
                return Templates[templateName](context);
            }

            /**
             * Path for this class' templates
             */
            public readonly templatePath: string = 'Music.AbstractScheme';

        }

    }

}
