/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractBlock.ts" />
/// <reference path="AbstractContainer.ts" />

namespace Pricker {

    /**
     * Abstract container that allows random insertion of child blocks
     *
     * Child blocks may be inserted or removed anywhere within the container.
     * Might be used to represent a touch of Stedman or a course of spliced.
     */
    export abstract class RandomAccessContainer<Block extends AbstractBlock>
        extends AbstractContainer<Block> {

        /* RandomAccessContainer methods **************************************/

        /**
         * Inserts a course at the specified index
         */
        public insertBlock(index: number, block: Block): this {
            this._blocks.splice(index - 1, 0, block);
            this.fixupOwnership(index);

            this.notify(index - 1);
            return this;
        }

        /**
         * Deletes the course at the specified index
         */
        public deleteBlock(index: number): Block {
            const block: Block = this.getBlock(index);

            this._blocks.splice(index - 1, 1);
            block.clearOwnership();
            this.fixupOwnership(index);

            this.notify(index - 1);
            return block;
        }

        /**
         * Helper to fixup ownership of blocks
         */
        private fixupOwnership(index: number): void {
            for (let i: number = index; i <= this.getLength(); i += 1) {
                this.getBlock(i).setOwnership({'container': this, 'index': i});
            }
        }

    }

}
