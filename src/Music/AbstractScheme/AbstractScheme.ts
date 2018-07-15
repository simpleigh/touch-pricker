/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { rowFromString, Stage, stringFromRow } from '../../rows';
import * as Templates from '../../templates';
import MatcherInterface from '../MatcherInterface';
import text from './text.dot';

/**
 * Abstract music matching scheme
 */
@Templates.makePrintable({ text })
abstract class AbstractScheme implements MatcherInterface {

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

    /* MatcherInterface methods ***********************************************/

    /**
     * Matches a row string
     */
    public match(row: string): boolean {
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
    public getMatchCount(): number {
        let matches: number = 0;

        for (const matcher of this._matchers) {
            matches += matcher.getMatchCount();
        }

        return matches;
    }

    /* templating *************************************************************/

    public print: Templates.Print;

    /* AbstractScheme methods *************************************************/

    /**
     * Create matchers for this scheme/stage
     */
    protected abstract createMatchers(rounds: string): MatcherInterface[];

    /**
     * Provides read access to the matchers
     */
    public getMatchers(): MatcherInterface[] {
        return this._matchers.slice();
    }

}

export default AbstractScheme;
