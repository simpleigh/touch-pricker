/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="Changes.ts" />
/// <reference path="Row.ts" />
/// <reference path="rowFromString.ts" />
/// <reference path="SixType.ts" />
/// <reference path="Stage.ts" />
/// <reference path="Visitor/Abstract.ts" />

namespace Pricker {

    /**
     * A start for a touch of Stedman
     */
     export class Start {

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
         * @param rowIndex  index of rounds within the six
         * @param sixType   type of six
         */
        constructor(rowIndex: number = 4, sixType: SixType = SixType.Quick) {
            if (rowIndex < 1 || rowIndex > 6) {
                throw new Error('Row index out of range');
            }
            this._rowIndex = rowIndex;
            this._sixType = sixType;
        }

        /**
         * Sets the stage
         */
        public setStage(stage: Stage): this {
            const row = rowFromString('123', stage);
            this._rows = [];

            if (this._rowIndex === 6) {
                this._lastRow = row;
                return this;
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
            return this;
        }

        /**
         * Provides read access to the row index
         */
        public getRowIndex(): number {
            return this._rowIndex;
        }

        /**
         * Provides read access to the six type
         */
        public getSixType(): SixType {
            return this._sixType;
        }

        /**
         * Returns the last row of the start
         */
        public getLast(): Row {
            if (!this._lastRow) {
                throw new Error('Must set stage before using start object');
            }

            return this._lastRow.slice();
        }

        /**
         * Receives a visitor that will be called to process each row
         */
        public accept(...visitors: Visitor.AbstractVisitor[]): this {
            if (!this._rows) {
                throw new Error('Must set stage before using start object');
            }

            for (const visitor of visitors) {
                for (const row of this._rows) {
                    visitor.visit(row);
                }
            }

            return this;
        }

        /**
         * Counts the number of rows during the start
         */
        public estimateRows(): number {
            return 6 - this._rowIndex;
        }

    }

}
