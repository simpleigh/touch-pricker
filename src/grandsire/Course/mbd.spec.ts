/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { rounds, Stage, stringFromRow } from '../../rows';
import Course from '.';

describe('mbd template for Grandsire Course', () => {

    it('renders a course correctly', () => {
        const initialRow = rounds(Stage.Cinques);
        const course = Course.fromString(initialRow, 's2 3 (4)');
        expect(course.print('mbd')).toRenderAs(`
            <u>1234567890E</u><br />
            ${course.getBlock(1).print('mbd')}
            ${course.getBlock(2).print('mbd')}
            ${course.getBlock(3).print('mbd')}
            ${course.getBlock(4).print('mbd', { underline: true })}
        `);
    });

    it('can print extra leads after the pricker', () => {
        const course = new Course(rounds(Stage.Cinques));
        const extraLeads = new Course(rounds(Stage.Cinques));

        course.setLength(2);
        extraLeads.setLength(2);

        expect(course.print('mbd', { extraLeads })).toRenderAs(`
            <u>1234567890E</u><br />
            ${course.getBlock(1).print('mbd')}
            ${course.getBlock(2).print('mbd', { underline: true })}
            <span class="extraLead">
                ${stringFromRow(extraLeads.getBlock(1).getLast())}
            </span><br />
            <span class="extraLead">
                ${stringFromRow(extraLeads.getBlock(2).getLast())}
            </span><br />
        `);
    });

});
