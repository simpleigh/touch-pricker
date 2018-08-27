/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import AbstractMatcher from './AbstractMatcher';
import AbstractScheme from './AbstractScheme';

/**
 * Custom music matching scheme defined at runtime
 */
class CustomScheme extends AbstractScheme {

    /* AbstractMatcher methods ************************************************/

    /**
     * Provides read access to the name
     */
    public getName(): string {
        return 'Custom scheme';
    }

    /* AbstractScheme methods *************************************************/

    /**
     * Create matchers for this scheme/stage
     */
    protected createMatchers(rounds: string): AbstractMatcher[] {
        return [ ];
    }

    /* CustomScheme methods ***************************************************/

    /**
     * Allows additional matchers to be added
     */
    public addMatcher(matcher: AbstractMatcher): void {
        this._matchers.push(matcher);
    }

}

export default CustomScheme;
