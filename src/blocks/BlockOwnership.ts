/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import type Notifiable from './Notifiable';

/**
 * Ownership of a block
 *
 * {@link AbstractBlock} objects can be collected together within an
 * {@link <internal>.AbstractContainer}.
 * Each block stores a reference to its container along with a numeric index
 * representing its position within that container.
 */
interface BlockOwnership {
    /**
     * Container of the block.
     */
    container: Notifiable;

    /**
     * Index within the container.
     * Indices start counting at one and increase to the length of the
     * container.
     */
    index: number;
}

export default BlockOwnership;
