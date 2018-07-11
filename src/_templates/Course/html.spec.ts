/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Course from '../../Course';
import { createTestRow } from '../../testFunctions.spec';

describe('html template for Course', () => {

    it('renders a course correctly', () => {
        const course = Course.fromString(createTestRow(), 's2 3 (4)');
        expect(course.print('html')).toBe(
            '<u>2314567890E</u><br />' + course.print('text'),
        );
    });

});
