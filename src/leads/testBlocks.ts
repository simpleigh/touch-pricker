/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { RandomAccessContainer } from '../blocks';
import { rounds, Row, Stage } from '../rows';
import AbstractLead from './AbstractLead';
import Call from './Call';
import LeadHeadTable from './LeadHeadTable';
import AbstractCourse from './AbstractCourse';

export class Lead extends AbstractLead {

    public readonly rows: number = 0;

    public accept(): this {
        return this;
    }

    protected get leadHeadTable(): LeadHeadTable {
        const stages: Partial<Record<Stage, Row>> = {};
        for (let stage = 4; stage < 16; stage += 1) {
            stages[stage as Stage] = rounds(stage);
        }

        return {
            [Call.Plain]: stages,
            [Call.Bob]: stages,
            [Call.Single]: stages,
        };
    }

}

export class Course extends AbstractCourse<Lead> {

    protected get defaultLength(): number {
        return this.stage - 1;
    }

    protected createBlock(initialRow: Row, index: number): Lead {
        return new Lead(initialRow);
    }

}

export class Touch extends RandomAccessContainer<Course> {}
