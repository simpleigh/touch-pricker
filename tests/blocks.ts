/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

// tslint:disable:max-classes-per-file

import { RandomAccessContainer, SerialContainer } from '../src/blocks';
import { AbstractLead, Call, LeadHeadTable } from '../src/leads';
import { rounds, Row, Stage } from '../src/rows';

export class Lead extends AbstractLead {

    public accept(): this { return this; }
    public readonly rows: number = 0;

    protected get leadHeadTable(): LeadHeadTable {
        const stages: { [stage in Stage]?: Row } = { };
        for (let stage = 4; stage < 16; stage += 1) {
            stages[stage as Stage] = rounds(stage);
        }

        return {
            [Call.Plain]:  stages,
            [Call.Bob]:    stages,
            [Call.Single]: stages,
        };
    }

}

export class Course extends SerialContainer<Lead> {

    protected createBlock(initialRow: Row, index: number): Lead {
        return new Lead(initialRow, { container: this, index });
    }

    protected get defaultLength(): number {
        return this.stage - 1;
    }

}

export class Touch extends RandomAccessContainer<Course> { }
