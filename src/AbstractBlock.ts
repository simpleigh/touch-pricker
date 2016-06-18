/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015 Leigh Simpson. All rights reserved.
 */

/// <reference path="Row.ts" />

namespace Pricker {
    'use strict';

    /**
     * Abstract class representing blocks of rows
     * 
     * A block:
     *  - is initialised from a row
     *  - provides access to the end row at the end of the block
     *  - recalculates that end row if the initial row is changed
     *  - provides mechanisms for controlling how the end row is created
     *  - notifies any parent block whenever the end row changes
     * 
     * Blocks are designed to be aggregated into containers.
     * Containers notify blocks of changes by setting a new initial row.
     * Blocks notify containers of changes via a callback (receiveNotification).
     */
    export abstract class AbstractBlock {
        /**
         * Initial row for the block
         */
        protected _initialRow: Row;

        /**
         * Constructor
         * @param {Row}                initialRow - initial row for the block
         * @param {AbstractContainer}  container  - container of this block
         * @param {number}             index      - index of block in container
         */
        constructor(
            initialRow: Row,
            protected _container?: AbstractContainer<AbstractBlock>,
            protected _index?: number
        ) {
            this._initialRow = initialRow.slice();
        }

        /**
         * Does any calculation needed by the block
         */
        protected abstract calculate(): void;

        /**
         * Read access to the initial row
         */
        public getInitialRow(): Row {
            return this._initialRow.slice();
        }

        /**
         * Write access to the initial row
         */
        public setInitialRow(initialRow: Row): AbstractBlock {
            this._initialRow = initialRow.slice();
            this.calculate();
            return this;
        }

        /**
         * Returns the end row
         */
        public abstract getEnd(): Row;

        /**
         * Notifies the parent container
         * 
         * Derived classes should call this whenever the end row changes.
         */
        protected notifyContainer(): void {
            if (this._container) {
                this._container.notify(this._index);
            }
        }
    }
}
