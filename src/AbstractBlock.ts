/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="Row.ts" />
/// <reference path="stringFromRow.ts" />
/// <reference path="Visitor/Abstract.ts" />

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
            protected _index?: number,
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
        public setInitialRow(initialRow: Row): this {
            this._initialRow = initialRow.slice();
            this.calculate();
            return this;
        }

        /**
         * Returns the end row
         */
        public abstract getEnd(): Row;

        /**
         * Updates references to the parent container
         */
        public setOwnership(
            container: AbstractContainer<AbstractBlock>,
            index: number,
        ): AbstractBlock {
            this._container = container;
            this._index = index;
            return this;
        }

        /**
         * Allows public access to parent container references
         */
        public getOwnership():
            [AbstractContainer<AbstractBlock> | undefined, number | undefined] {
            return [this._container, this._index];
        }

        /**
         * Clears references to the parent container
         */
        public clearOwnership(): AbstractBlock {
            this._container = undefined;
            this._index = undefined;
            return this;
        }

        /**
         * Notifies the parent container
         *
         * Derived classes should call this whenever the end row changes.
         */
        protected notifyContainer(): void {
            if (this._container && this._index) {
                this._container.notify(this._index);
            }
        }

        /**
         * Receives a visitor that will be called to process each row
         */
        public abstract accept(visitor: Visitor.AbstractVisitor): this;

        /**
         * Renders the block with a template
         */
        public print(template: string): string {
            return Templates[
                this.getTemplatePath() + '.' + template
            ](
                this.getTemplateData(),
            );
        }

        /**
         * Provides the path for this class' templates
         */
        protected abstract getTemplatePath(): string;

        /**
         * Provides template data
         *
         * Derived classes may override this to provide more data to templates
         */
        protected getTemplateData(): any {
            return {
                'block': this,
                'index': this._index,
                'initialRow': stringFromRow(this._initialRow),
                'endRow': stringFromRow(this.getEnd()),
            };
        }
    }
}
