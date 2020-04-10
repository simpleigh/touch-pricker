/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import Course from '.';
import { rowFromString, Stage } from '../../rows';

describe('html template for Stedman Course', () => {

    it('renders a course correctly', () => {
        const initialRow = rowFromString('231', Stage.Cinques);
        const course = Course.fromString(initialRow, 's2 3 (4)');
        expect(course.print('html')).toRenderAs(`
            <u>2314567890E</u><br />
            ${course.print('text')}
        `);
    });

});
