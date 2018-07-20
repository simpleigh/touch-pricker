/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Course from '.';
import { stringFromRow } from '../../rows';
import { createTestRow } from '../../testFunctions.spec';

describe('mbd template for Course', () => {

    it('renders a course correctly', () => {
        const course = Course.fromString(createTestRow(), 's2 3 (4)');
        expect(course.print('mbd')).toBe(''
            + '<u>2314567890E</u><br />'
            + course.getBlock(1).print('mbd')
            + course.getBlock(2).print('mbd')
            + course.getBlock(3).print('mbd')
            + course.getBlock(4).print('mbd', { underline: true }),
        );
    });

    it('can print extra sixes after the pricker', () => {
        const course = new Course(createTestRow());
        const extraSixes = course.clone();

        course.setLength(2);
        extraSixes.setLength(2);

        expect(course.print('mbd', { extraSixes })).toBe(''
            + '<u>2314567890E</u><br />'
            + course.getBlock(1).print('mbd')
            + course.getBlock(2).print('mbd', { underline: true })
            + '<span class="extraSix">'
            + stringFromRow(extraSixes.getBlock(1).getLast())
            + '</span><br />'
            + '<span class="extraSix">'
            + stringFromRow(extraSixes.getBlock(2).getLast())
            + '</span><br />',
        );
    });

    it('can display a six head as well as a six end', () => {
        const course = new Course(createTestRow());
        const extraSixes = course.clone();

        course.setLength(2);
        extraSixes.setLength(2);

        expect(course.print('mbd', {
            extraSixes,
            showSixHeads: true,
        })).toBe(''
            + '<u>2314567890E</u><br />'
            + course.getBlock(1).print('mbd', { showSixHeads: true })
            + course.getBlock(2).print('mbd', {
                showSixHeads: true,
                underline: true,
            })
            + '<span class="extraSix">'
            + stringFromRow(extraSixes.getBlock(1).getFirst())
            + '<br /><u>'
            + stringFromRow(extraSixes.getBlock(1).getLast())
            + '</u></span><br />'
            + '<span class="extraSix">'
            + stringFromRow(extraSixes.getBlock(2).getFirst())
            + '<br /><u>'
            + stringFromRow(extraSixes.getBlock(2).getLast())
            + '</u></span><br />',
        );
    });

});
