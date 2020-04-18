/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

/* eslint-disable max-len */

import { rounds, Stage } from '../../rows';
import Course from '.';

describe('siril template for Grandsire Course', () => {

    it('renders a course correctly', () => {
        const course = Course.fromString(rounds(Stage.Doubles), 's2 3 (4)');
        expect(course.print('siril')).toRenderAs(`
            plain, single, bob, plain, "@  ${course.print('text', { courseEnd: false })}"\\n
        `);
    });

    const EXPECTED_OUTPUTS = [
        '',  // length zero not tested
        '+3, ',
        '+3.1, ',
        '+3.1.5, ',
        '+3.1.5.1, ',
        '+3.1.5.1.5, ',
        '+3.1.5.1.5.1, ',
        '+3.1.5.1.5.1.5, ',
        '+3.1.5.1.5.1.5.1, ',
        '+3.1.5.1.5.1.5.1.5, ',
        'plain, ',
        'plain, +3, ',
        'plain, +3.1, ',
        'plain, +3.1.5, ',
        'plain, +3.1.5.1, ',
        'plain, +3.1.5.1.5, ',
        'plain, +3.1.5.1.5.1, ',
        'plain, +3.1.5.1.5.1.5, ',
        'plain, +3.1.5.1.5.1.5.1, ',
        'plain, +3.1.5.1.5.1.5.1.3, ',
        'plain, single, ',
        'plain, single, +3, ',
        'plain, single, +3.1, ',
        'plain, single, +3.1.5, ',
        'plain, single, +3.1.5.1, ',
        'plain, single, +3.1.5.1.5, ',
        'plain, single, +3.1.5.1.5.1, ',
        'plain, single, +3.1.5.1.5.1.5, ',
        'plain, single, +3.1.5.1.5.1.5.1, ',
        'plain, single, +3.1.5.1.5.1.5.1.3, ',
        'plain, single, bob, ',
        'plain, single, bob, +3, ',
        'plain, single, bob, +3.1, ',
        'plain, single, bob, +3.1.5, ',
        'plain, single, bob, +3.1.5.1, ',
        'plain, single, bob, +3.1.5.1.5, ',
        'plain, single, bob, +3.1.5.1.5.1, ',
        'plain, single, bob, +3.1.5.1.5.1.5, ',
        'plain, single, bob, +3.1.5.1.5.1.5.1, ',
        'plain, single, bob, +3.1.5.1.5.1.5.1.5, ',
        'plain, single, bob, plain, ',
    ];

    it('stops rendering based on the remaining rows in the touch', () => {
        const course = Course.fromString(rounds(Stage.Doubles), 's2 3 (4)');
        for (let i = 1; i < EXPECTED_OUTPUTS.length; i += 1) {
            expect(course.print('siril', { touchRows: i }))
                .toBe(`${EXPECTED_OUTPUTS[i]}"@  s2 3  (4 leads)"\n`);
        }
    });

});
