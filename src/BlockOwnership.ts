/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/* Don't reference dependencies or this leads to compilation errors... */

namespace Pricker {
    'use strict';

    /**
     * Ownership of a block
     *
     * [[AbstractBlock]] objects can be collected together within an
     * [[AbstractContainer]].
     * Each block stores a reference to its container along with a numeric index
     * representing its position within that container.
     */
    export interface BlockOwnership {

        /**
         * Container of the block.
         */
        container: AbstractContainer<AbstractBlock>;

        /**
         * Index within the container.
         * Indices start counting at one and increase to the length of the
         * container.
         */
        index: number;

    }

}
