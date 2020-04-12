/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

// tslint:disable:max-classes-per-file

import {
    AbstractBlock,
    RandomAccessContainer,
    SerialContainer,
} from '../src/blocks';
import { Call, Row } from '../src/rows';

export class Lead extends AbstractBlock {
    protected _call: Call = Call.Plain;
    protected calculate(): void { /* NOOP */ }
    public getLast(): Row { return this.initialRow; }
    public accept(): this { return this; }
    public readonly rows: number = 0;
    public setCall(call: Call): Lead { this._call = call; return this; }
    public getCall(): Call { return this._call; }
}

export class Course extends SerialContainer<Lead> {
    protected createBlock(initialRow: Row, index: number): Lead {
        return new Lead(initialRow, { container: this, index });
    }

    protected getDefaultLength(initialRow: Row): number {
        return initialRow.length - 1;
    }
}

export class Touch extends RandomAccessContainer<Course> { }
