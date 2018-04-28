/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractBlock.ts" />
/// <reference path="BlockOwnership.ts" />
/// <reference path="Notifiable.ts" />
/// <reference path="Row.ts" />
/// <reference path="Visitor/Abstract.ts" />

namespace Pricker {

    /**
     * Abstract class representing containers for blocks of rows
     *
     * Note that containers are also blocks themselves.
     */
    export abstract class AbstractContainer<Block extends AbstractBlock>
        extends AbstractBlock implements Notifiable {

        /**
         * Blocks within the container
         */
        protected _blocks: Block[] = [ ];

        /**
         * Constructor
         *
         * Extends the AbstractBlock container to create contained blocks.
         */
        constructor(
            initialRow: Row,
            protected _ownership?: BlockOwnership,
        ) {
            super(initialRow, _ownership);
            this.extend(this.getDefaultLength(initialRow));
        }

        /* AbstractBlock methods **********************************************/

        /**
         * Does any calculation needed by the block
         */
        protected calculate(): void {
            this.calculateBlocks();
        }

        /**
         * Returns the last row in the block
         * e.g. a course head or a course end (for Stedman)
         */
        public getLast(): Row {
            if (this._blocks.length) {
                return this._blocks[this._blocks.length - 1].getLast();
            }

            // Handle case with zero blocks
            return this._initialRow.slice();
        }

        /**
         * Receives a visitor that will be called to process each row
         */
        public accept(...visitors: Visitor.AbstractVisitor[]): this {
            for (const block of this._blocks) {
                for (const visitor of visitors) {
                    block.accept(visitor);
                }
            }
            return this;
        }

        /**
         * Estimates the number of rows in the block
         * The estimate doesn't take into account coming round part-way through
         */
        public estimateRows(): number {
            let rows: number = 0;
            for (const block of this._blocks) {
                rows += block.estimateRows();
            }
            return rows;
        }

        /* Notifiable methods *************************************************/

        /**
         * Receives a notification from a block that has changed
         * @param index  index of changed block in container
         */
        public notify(index: number): void {
            this.calculateBlocks(index);
            this.notifyContainer();
        }

        /* AbstractContainer methods ******************************************/

        /**
         * Extends the container by adding the specified number of blocks
         * @param blocks  blocks to add
         */
        private extend(blocks: number): this {
            const oldLength: number = this.getLength(),
                newLength: number = oldLength + blocks;

            let index: number,
                initialRow: Row = this.getLast();

            for (index = oldLength + 1; index <= newLength; index += 1) {
                this._blocks[index - 1] = this.createBlock(initialRow, index);
                initialRow = this._blocks[index - 1].getLast();
            }

            return this;
        }

        /**
         * Returns the default length of new containers of this type
         *
         * Derived classes should override this method if required.
         */
        protected getDefaultLength(initialRow: Row): number {
            return 1;
        }

        /**
         * Creates a new block for the container
         *
         * Used by extend() when creating the container or increasing its
         * length.
         * @param initialRow  initial row for the block
         * @param index       index of block in container
         */
        protected abstract createBlock(initialRow: Row, index: number): Block;

        /**
         * Calculates blocks within the container
         * @param index  where to start when recalculating
         */
        private calculateBlocks(index: number = 0): void {
            let initialRow: Row = this._initialRow;

            if (index) {
                initialRow = this._blocks[index - 1].getLast();
            }

            for (; index < this.getLength(); index += 1) {
                this._blocks[index].setInitialRow(initialRow);
                initialRow = this._blocks[index].getLast();
            }
        }

        /**
         * Read access to the length
         */
        public getLength(): number {
            return this._blocks.length;
        }

        /**
         * Write access to the length
         */
        public setLength(length: number): this {
            if ((length < this.minLength) || (length > this.maxLength)) {
                throw new Error('Length out of range');
            }

            if (length > this.getLength()) {
                this.extend(length - this.getLength());
            } else {
                this._blocks = this._blocks.slice(0, length);
            }

            this.notifyContainer();

            return this;
        }

        /**
         * Write access to the length: ignores out-of-range values
         */
        public safeSetLength(length: number): this {
            length = Math.max(length, this.minLength);
            length = Math.min(length, this.maxLength);
            return this.setLength(length);
        }

        /**
         * Lower limit on length for the particular concrete class
         */
        protected readonly abstract minLength: number;

        /**
         * Upper limit on length for the particular concrete class
         */
        protected readonly abstract maxLength: number;

        /**
         * Read access to the blocks
         *
         * Derived classes should provide public access via a more
         * suitably-named method
         */
        protected getBlocks(): Block[] {
            return this._blocks.slice();
        }

        /**
         * Read access to a block
         *
         * Derived classes should provide public access via a more
         * suitably-named method
         */
        protected getBlock(index: number): Block {
            if (index < 1 || index > this.getLength()) {
                throw new Error('Block index out of range');
            }
            return this._blocks[index - 1];
        }

    }

}
