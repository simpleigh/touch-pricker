/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import PrintableMixin from '../PrintableMixin';

/**
 * Interface supported by classes that can match a row for music
 */
interface MatcherInterface extends PrintableMixin {

    /**
     * Matches a row string
     */
    match(row: string): boolean;

    /**
     * Provides read access to the name
     */
    getName(): string;

    /**
     * Provides read access to the count of matches
     */
    getMatchCount(): number;

}

export default MatcherInterface;
