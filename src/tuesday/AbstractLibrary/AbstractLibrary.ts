/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import * as Templates from '../../templates';
import select from './select.dot';

/**
 * Represents a library of items (methods, calls, etc.)
 *
 * Libraries index items based on a name.
 */
@Templates.makePrintable({ select })
abstract class AbstractLibrary<Item> implements Templates.Interface {

    /**
     * Constructor
     *
     * Data stored by the library is stored within the class.
     */
    constructor(protected _data: { [name: string]: Item }) {
        // NOOP
    }

    /* templating *************************************************************/

    public print: Templates.Print;

    /* AbstractLibrary methods ************************************************/

    /**
     * Returns all the method names in this library
     */
    public getNames(): string[] {
        return Object.getOwnPropertyNames(this._data);
    }

    /**
     * Looks up an item and returns it if found, manipulated by a processor
     */
    protected maybeProcessItem<ProcessorResultType>(
        name: string,
        processor: (item: Item) => ProcessorResultType,
    ): ProcessorResultType | undefined {
        const item = this._data[name];
        if (!item) {
            return undefined;
        }

        return processor(item);
    }

}

export default AbstractLibrary;
