/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import SixType from '../../SixType';
import Erin from '../Erin';
import Stedman from '../Stedman';
import StedmanJump from '../StedmanJump';
import AbstractMethod from '.';

/**
 * Tests the template behaves like the parent version
 */
const testSelectAbstractMethodTemplate = (
    Method: new() => AbstractMethod,
    types: SixType[],
) => () => {

    describe('is a select template', () => {
        it('renders six type options correctly', () => {
            let expected = '';
            for (const type of types) {
                expected += `<option value="${type}">${type}</option>`;
            }
            expect(new Method().print('select')).toBe(expected);
        });
    });

};

describe('select template for Erin', testSelectAbstractMethodTemplate(
    Erin,
    [SixType.Slow],
));

describe('select template for Stedman', testSelectAbstractMethodTemplate(
    Stedman,
    [SixType.Slow, SixType.Quick],
));

describe('select template for Stedman Jump', testSelectAbstractMethodTemplate(
    StedmanJump,
    [SixType.Cold, SixType.Hot],
));
