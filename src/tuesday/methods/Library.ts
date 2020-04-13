/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Row, rowFromString, Stage } from '../../rows';
import AbstractLibrary from '../AbstractLibrary';
import Entry from './Entry';

/**
 * A very simple method library
 */
class Library extends AbstractLibrary<Entry> {

    /**
     * Returns the rows in the first lead of the method
     */
    public getRows(name: string): Row[] | undefined {
        return this.maybeProcessItem(name, (item) =>
            item.rows.map((row) => rowFromString(row, Stage.Maximus)),
        );
    }

    /**
     * Returns the first lead end of a method
     */
    public getLeadEnd(name: string): Row | undefined {
        return this.maybeProcessItem(name, (item) =>
            rowFromString(item.rows[item.rows.length - 2], Stage.Maximus),
        );
    }

    /**
     * Returns the first lead head of a method
     */
    public getLeadHead(name: string): Row | undefined {
        return this.maybeProcessItem(name, (item) =>
            rowFromString(item.rows[item.rows.length - 1], Stage.Maximus),
        );
    }

    /**
     * Returns the number of rows in the first lead of the method
     */
    public getRowCount(name: string): number | undefined {
        return this.maybeProcessItem(name, (item) =>
            item.rows.length,
        );
    }

    /**
     * Returns the default call (lead end change) for the method
     */
    public getDefaultCall(name: string): string | undefined {
        return this.maybeProcessItem(name, (item) =>
            item.defaultCall,
        );
    }

}

export default Library;
