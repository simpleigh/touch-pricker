/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import * as Templates from '../templates';

/**
 * Interface supported by classes that can match a row for music
 */
abstract class AbstractMatcher implements Templates.Interface {

    /* templating *************************************************************/

    public print: Templates.Print;

    /* AbstractMatcher methods ************************************************/

    /**
     * Matches a row string
     */
    public abstract match(row: string): boolean;

    /**
     * Provides read access to the name
     */
    abstract get name(): string;

    /**
     * Provides read access to the count of matches
     */
    abstract get matchCount(): number;

}

export default AbstractMatcher;
