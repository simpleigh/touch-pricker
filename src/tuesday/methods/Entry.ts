/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/**
 * Details about a method in our library
 */
interface Entry {

    /**
     * Default "call" (usually the lead end) for this method
     */
    defaultCall: string;

    /**
     * Rows of the first lead of the method
     *
     * We can use these to calculate the rows of an arbitrary lead.
     */
    rows: string[];

}

export default Entry;
