/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractBlock.ts" />
/// <reference path="Changes.ts" />
/// <reference path="PrintableMixin.ts" />
/// <reference path="Row.ts" />
/// <reference path="rowFromString.ts" />
/// <reference path="SixType.ts" />
/// <reference path="Stage.ts" />
/// <reference path="Visitor/Abstract.ts" />

namespace Pricker {

    /**
     * A start for a touch of Stedman
     */
    export class Start extends AbstractBlock {

        /**
         * Index of rounds within the six
         */
        private _rowIndex: number;

        /**
         * Type of six
         */
        private _sixType: SixType;

        /**
         * Rows of the start
         */
        private _rows: Row[];

        /**
         * Last row of the start
         */
        private _lastRow: Row;

        /**
         * Constructor
         */
        constructor(
            initialRow: Row,
            protected _ownership?: BlockOwnership,
        ) {
            super(initialRow, _ownership);

            this._rowIndex = 4;
            this._sixType = SixType.Quick;
            this.calculate();
        }

        /* PrintableMixin methods *********************************************/

        /**
         * Path for this class' templates
         */
        public readonly templatePath: string = 'Start';

        /* AbstractBlock methods **********************************************/

        /**
         * Does any calculation needed by the block
         */
        protected calculate(): void {
            const row = this._initialRow.slice();
            this._rows = [];

            if (this._rowIndex === 6) {
                this._lastRow = row;
                return;
            }

            // Figure out what sort of change to apply
            let change = (this._rowIndex + this._sixType) % 2
                ? Changes.permute1
                : Changes.permute3;

            for (let i = this._rowIndex; i < 6; i += 1) {
                // Swap the change
                change = change === Changes.permute1
                    ? Changes.permute3
                    : Changes.permute1;

                // Apply it and store
                change(row);
                this._rows.push(row.slice());
            }

            this._lastRow = this._rows[this._rows.length - 1];
        }

        /**
         * Returns the last row in the block
         * e.g. a lead head or a six end (for Stedman)
         */
        public getLast(): Row {
            return this._lastRow.slice();
        }

        /**
         * Receives a visitor that will be called to process each row
         */
        public accept(...visitors: Visitor.AbstractVisitor[]): this {
            for (const visitor of visitors) {
                for (const row of this._rows) {
                    visitor.visit(row);
                }
            }

            return this;
        }

        /**
         * Estimates the number of rows in the block
         * The estimate doesn't take into account coming round part-way through
         */
        public estimateRows(): number {
            return this._rows.length;
        }

        /* Start methods ******************************************************/

        /**
         * Provides read access to the row index
         */
        public getRowIndex(): number {
            return this._rowIndex;
        }

        /**
         * Provides write access to the row index
         */
        public setRowIndex(rowIndex: number = 4): Start {
            if (rowIndex < 1 || rowIndex > 6) {
                throw new Error('Row index out of range');
            }
            this._rowIndex = rowIndex;

            this.calculate();
            this.notifyContainer();
            return this;
        }

        /**
         * Provides read access to the six type
         */
        public getSixType(): SixType {
            return this._sixType;
        }

        /**
         * Provides write access to the six type
         */
        public setSixType(sixType: SixType = SixType.Quick): Start {
            this._sixType = sixType;

            this.calculate();
            this.notifyContainer();
            return this;
        }

        /**
         * Sets the row index and six type from a string representation
         */
        public setFromString(input: string): this {
            let rowIndex: number | null = null;
            let sixType: SixType | null = null;

            const rowIndexPatterns: { [key: string]: number } = {
                'first':  1, '1st': 1, '1': 1,
                'second': 2, '2nd': 2, '2': 2,
                'third':  3, '3rd': 3, '3': 3,
                'fourth': 4, '4th': 4, '4': 4,
                'fifth':  5, '5th': 5, '5': 5,
                'sixth':  6, '6th': 6, '6': 6,
            };

            for (const pattern in rowIndexPatterns) {
                if (!pattern) { continue; }  // IE8 trailing comma

                const regex = new RegExp(pattern, 'i');
                if (regex.test(input)) {
                    rowIndex = rowIndexPatterns[pattern];
                }
            }

            if (/slow/i.test(input)) {
                sixType = SixType.Slow;
            }
            if (/quick/i.test(input)) {
                sixType = SixType.Quick;
            }

            if (rowIndex === null) {
                throw new Error('Could not determine row index');
            }
            if (sixType === null) {
                throw new Error('Could not determine six type');
            }

            this._rowIndex = rowIndex;
            this._sixType = sixType;
            this.calculate();
            this.notifyContainer();

            return this;
        }

    }

}
