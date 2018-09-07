/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import * as Templates from '../../templates';
import AbstractMatcher from '../AbstractMatcher';
import Pattern from '../Pattern';
import text from './text.dot';

/**
 * Group of similar patterns to match related rows
 */
@Templates.makePrintable({ text })
class PatternGroup extends AbstractMatcher {

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
        super();
        this._patterns = patterns.slice();
    }

    /* AbstractMatcher methods ************************************************/

    /**
     * Matches a row string
     */
    public match(row: string): boolean {
        let result = false;

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
    get name(): string {
        return this._name;
    }

    /**
     * Provides read access to the count of matches
     */
    get matchCount(): number {
        if (this._parentPattern) {
            return this._parentPattern.matchCount;
        }
        return this.submatchCount;
    }

    /* PatternGroup methods ***************************************************/

    /**
     * Provides read access to the patterns
     */
    get patterns(): Pattern[] {
        return this._patterns.slice();
    }

    /**
     * Provides read access to the count of matches within patterns
     */
    get submatchCount(): number {
        let matches = 0;

        for (const pattern of this._patterns) {
            matches += pattern.matchCount;
        }

        return matches;
    }

}

export default PatternGroup;
