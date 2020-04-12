/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { AbstractBlock, BlockOwnership } from '../../blocks';
import { Row } from '../../rows';
import * as Templates from '../../templates';
import { AbstractVisitor } from '../../visitors';
import * as Changes from '../changes';
import constructorFromType from '../constructorFromType';
import { AbstractMethod, Stedman } from '../methods';
import SixType from '../SixType';
import siril from './siril.dot';
import text from './text.dot';

/**
 * A start for a touch of Stedman
 */
@Templates.makePrintable({ siril, text })
class Start extends AbstractBlock implements Templates.Interface {

    /**
     * Type of six
     */
    private _sixType: SixType;

    /**
     * Index of rounds within the six
     */
    private _rowIndex: number;

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
        private _method: AbstractMethod = new Stedman(),
    ) {
        super(initialRow, _ownership);

        this._sixType = this._method.defaultStartSixType;
        this._rowIndex = this._method.defaultStartRowIndex;
        this.calculate();
    }

    /* templating *************************************************************/

    public print: Templates.Print;

    /* AbstractBlock methods **************************************************/

    /**
     * Does any calculation needed by the block
     */
    protected calculate(): void {
        const row = this._initialRow.slice();
        this._rows = [];

        if (this._rowIndex === this.lastRowIndex) {
            this._lastRow = row;
            return;
        }

        for (const notation of this.notation) {
            if (notation === '1') {
                Changes.permute1(row);
            } else if (notation === '3') {
                Changes.permute3(row);
            } else if (notation === '5') {
                Changes.permute5(row);
            } else if (this._sixType === SixType.Cold) {
                Changes.permuteUp(row);
            } else {  // this._sixType === SixType.Hot
                Changes.permuteDown(row);
            }

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
     * Number of rows in the block
     * This doesn't take into account coming round part-way through
     */
    public get rows(): number {
        return this._rows.length;
    }

    /**
     * Receives a visitor that will be called to process each row
     */
    public accept(...visitors: AbstractVisitor[]): this {
        for (const visitor of visitors) {
            for (const row of this._rows) {
                visitor.visit(row);
            }
        }

        return this;
    }

    /* Start methods **********************************************************/

    /**
     * Provides read access to the six type
     */
    get sixType(): SixType {
        return this._sixType;
    }

    /**
     * Provides write access to the six type
     */
    set sixType(sixType: SixType) {
        this._method.checkSixType(sixType);
        this._sixType = sixType;

        if (this._rowIndex > this.lastRowIndex) {
            this._rowIndex = this.lastRowIndex;
        }

        this.calculate();
        this.notifyContainer();
    }

    /**
     * Provides read access to the row index
     */
    get rowIndex(): number {
        return this._rowIndex;
    }

    /**
     * Provides write access to the row index
     */
    set rowIndex(rowIndex: number) {
        if (rowIndex < 1 || rowIndex > this.lastRowIndex) {
            throw new Error(`Row index '${rowIndex}' out of range`);
        }
        this._rowIndex = rowIndex;

        this.calculate();
        this.notifyContainer();
    }

    /**
     * Provides read access to the method
     */
    get method(): AbstractMethod {
        return this._method;
    }

    /**
     * Sets the row index and six type from a string representation
     */
    public setFromString(input: string): this {
        let sixType: SixType | null = null;
        let rowIndex: number | null = null;

        // tslint:disable:object-literal-sort-keys
        const rowIndexPatterns: { [key: string]: number } = {
            'first':   1, '1st': 1, '1': 1,
            'second':  2, '2nd': 2, '2': 2,
            'third':   3, '3rd': 3, '3': 3,
            'fourth':  4, '4th': 4, '4': 4,
            'fifth':   5, '5th': 5, '5': 5,
            'sixth':   6, '6th': 6, '6': 6,
            'seventh': 7, '7th': 7, '7': 7,
            'eighth':   8, '8th': 8, '8': 8,
            'last': 99,  // sentinel value; see below
        };
        // tslint:enable:object-literal-sort-keys

        for (const pattern in rowIndexPatterns) {
            if (rowIndexPatterns.hasOwnProperty(pattern)) {
                const regex = new RegExp(pattern, 'i');
                if (regex.test(input)) {
                    rowIndex = rowIndexPatterns[pattern];
                }
            }
        }

        const validTypes = this._method.getSixTypes();
        if (validTypes.length > 1) {
            for (const testType of validTypes) {
                if (new RegExp(testType, 'i').test(input)) {
                    sixType = testType;
                }
            }
        } else {
            sixType = validTypes[0];
        }

        // n.b. set sixType first so we can calculate this.lastRowIndex
        if (sixType === null) {
            throw new Error(`Start '${input}' missing type of block`);
        }
        this.sixType = sixType;

        if (rowIndex === null) {
            throw new Error(`Start '${input}' missing row index`);
        }
        if (rowIndex === 99) {
            rowIndex = this.lastRowIndex;
        }
        this.rowIndex = rowIndex;

        this.calculate();
        this.notifyContainer();

        return this;
    }

    /**
     * Computes the maximum row index for the selected six type
     */
    get lastRowIndex(): number {
        const six = new (constructorFromType(this._sixType))(this._initialRow);
        return six.rows;
    }

    /**
     * Returns place notation for the start
     */
    get notation(): string[] {
        const six = new (constructorFromType(this._sixType))(this._initialRow);
        return six.notation.slice(this._rowIndex - 1);
    }

    /**
     * Computes the place notation string for the start
     */
    public getNotationString(): string {
        switch (this._sixType) {
            case SixType.Slow:
            case SixType.Quick:
            case SixType.Four:
            case SixType.Eight:
                return '+' + this.notation.join('.');

            case SixType.Cold:
            case SixType.Hot:
                return this.notation.join(', ');

            default:
                throw new Error('Assertion failed in Start.getNotationString');
        }
    }

}

export default Start;
