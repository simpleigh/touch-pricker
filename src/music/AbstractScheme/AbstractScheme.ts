/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { rowFromString, Stage, stringFromRow } from '../../rows';
import * as Templates from '../../templates';
import AbstractMatcher from '../AbstractMatcher';
import text from './text.dot';

/**
 * Abstract music matching scheme
 */
@Templates.makePrintable({ text })
abstract class AbstractScheme extends AbstractMatcher {

    /**
     * Matchers for this scheme
     */
    protected _matchers: AbstractMatcher[];

    /**
     * Constructor
     */
    constructor(protected _stage: Stage) {
        super();
        this._matchers = this.createMatchers(
            stringFromRow(rowFromString('', _stage)),  // rounds
        );
    }

    /* AbstractMatcher methods ************************************************/

    /**
     * Matches a row string
     */
    public match(row: string): boolean {
        let result = false;

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
    public getMatchCount(): number {
        let matches = 0;

        for (const matcher of this._matchers) {
            matches += matcher.getMatchCount();
        }

        return matches;
    }

    /* AbstractScheme methods *************************************************/

    /**
     * Create matchers for this scheme/stage
     */
    protected abstract createMatchers(rounds: string): AbstractMatcher[];

    /**
     * Provides read access to the matchers
     */
    public getMatchers(): AbstractMatcher[] {
        return this._matchers.slice();
    }

}

export default AbstractScheme;
