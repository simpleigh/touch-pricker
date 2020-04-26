/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

/* eslint-disable max-classes-per-file */

import { Row } from '../rows';
import AbstractBlock from './AbstractBlock';
import RandomAccessContainer from './RandomAccessContainer';
import SerialContainer from './SerialContainer';

export class Lead extends AbstractBlock {

    protected calculate(): void { /* NOOP */ }

    public getLast(): Row { return this._initialRow; }

    public readonly rows: number = 0;

    public accept(): this { return this; }

}

export class Course extends SerialContainer<Lead> {

    protected get defaultLength(): number {
        return this.stage - 1;
    }

    protected createBlock(initialRow: Row, index: number): Lead {
        return new Lead(initialRow);
    }

}

export class Touch extends RandomAccessContainer<Course> { }
