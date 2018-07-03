/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import AbstractScheme from './AbstractScheme';
import MatcherInterface from './MatcherInterface';

/**
 * Custom music matching scheme defined at runtime
 */
class CustomScheme extends AbstractScheme {

    /* MatcherInterface methods ***************************************/

    /**
     * Provides read access to the name
     */
    public getName(): string {
        return 'Custom scheme';
    }

    /* AbstractScheme methods *****************************************/

    /**
     * Create matchers for this scheme/stage
     */
    protected createMatchers(rounds: string): MatcherInterface[] {
        return [ ];
    }

    /* CustomScheme methods *******************************************/

    /**
     * Allows additional matchers to be added
     */
    public addMatcher(matcher: MatcherInterface) {
        this._matchers.push(matcher);
    }

}

export default CustomScheme;
