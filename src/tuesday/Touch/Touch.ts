/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { SerialContainer } from '../../blocks';
import { Row } from '../../rows';
import * as Templates from '../../templates';
import Lead from '../Lead';
import html from './html.dot';

/**
 * A touch, being a set of leads
 */
@Templates.makePrintable({ html })
class Touch extends SerialContainer<Lead> implements Templates.Interface {

    /* templating *************************************************************/

    public print: Templates.Print;

    /* SerialContainer methods ************************************************/

    /**
     * Returns the default length of new containers of this type
     */
    protected getDefaultLength(initialRow: Row): number {
        return 11;
    }

    /**
     * Creates a new block for the container
     *
     * Used by extend() when creating the container or increasing its
     * length.
     * @param initialRow  initial row for the block
     * @param index       index of block in container
     */
    protected createBlock(initialRow: Row, index: number): Lead {
        return new Lead(initialRow, { container: this, index });
    }

}

export default Touch;
