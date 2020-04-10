/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import Course from '.';
import { rounds, Stage } from '../../rows';

describe('html template for Grandsire Course', () => {

    it('renders a course correctly', () => {
        const initialRow = rounds(Stage.Cinques);
        const course = Course.fromString(initialRow, 's2 3 (4)');
        expect(course.print('html')).toRenderAs(`
            <u>1234567890E</u><br />
            ${course.print('text')}
        `);
    });

});
