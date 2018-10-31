/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import AbstractStrategy from '.';
import SixType from '../../SixType';
import Erin from '../Erin';
import Stedman from '../Stedman';

/**
 * Tests the template behaves like the parent version
 */
const testSelectAbstractStrategyTemplate = (
    Strategy: { new(): AbstractStrategy },  // tslint:disable-line
    types: SixType[],
) => () => {

    describe('is a select template', () => {
        it('renders six type options correctly', () => {
            let expected = '';
            for (const type of types) {
                expected = expected +
                    `<option value="${type}">${type}</option>`;
            }
            expect(new Strategy().print('select')).toBe(expected);
        });
    });

};

describe('select template for Erin', testSelectAbstractStrategyTemplate(
    Erin,
    [SixType.Slow],
));

describe('select template for Stedman', testSelectAbstractStrategyTemplate(
    Stedman,
    [SixType.Slow, SixType.Quick],
));
