/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Row, rowFromString, Stage } from '../../rows';
import * as Templates from '../../templates';
import data from './data';
import Entry from './Entry';
import select from './select.dot';

/**
 * A very simple method library
 */
@Templates.makePrintable({ select })
class Library implements Templates.Interface {

    /* templating *************************************************************/

    public print: Templates.Print;

    /**
     * Returns all the method names in this library
     */
    public getNames(): string[] {
        return Object.getOwnPropertyNames(data);
    }

    /**
     * Returns the rows in the first lead of the method
     */
    public getRows(name: string): Row[] | undefined {
        return this.maybeProcessEntry(
            name,
            (entry) => entry.map((row) => rowFromString(row, Stage.Maximus)),
        );
    }

    /**
     * Returns the first lead head of a method
     */
    public getLeadHead(name: string): Row | undefined {
        return this.maybeProcessEntry(
            name,
            (entry) => rowFromString(entry[entry.length - 1], Stage.Maximus),
        );
    }

    /**
     * Returns the number of rows in the first lead of the method
     */
    public getRowCount(name: string): number | undefined {
        return this.maybeProcessEntry(
            name,
            (entry) => entry.length,
        );
    }

    /**
     * Looks up a library entry and runs a processor function on it if found
     */
    private maybeProcessEntry<ProcessorResultType>(
        name: string,
        processor: (entry: Entry) => ProcessorResultType,
    ): ProcessorResultType | undefined {
        const entry = data[name];
        if (!entry) {
            return entry;
        }

        return processor(entry);
    }

}

export default Library;
