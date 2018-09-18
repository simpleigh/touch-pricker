/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Stage } from '../../rows';
import { createTestRow } from '../../testFunctions.spec';
import SixType from '../SixType';
import AbstractStrategy from './AbstractStrategy';

/**
 * Tests that a strategy behaves as an AbstractStrategy
 */
export const testAbstractStrategyImplementation = (
    factory: () => AbstractStrategy,
    lengthTestCases: Array<[Stage, number]>,
    successorTestCases: Array<[SixType, SixType]>,
) => {

    for (const testCase of lengthTestCases) {
        const stage = testCase[0];
        const expected = testCase[1];
        it(`computes the correct length for a ${stage} course`, () => {
            const row = createTestRow('', stage);
            expect(factory().getCourseLength(row)).toBe(expected);
        });
    }

    for (const testCase of successorTestCases) {
        const type = testCase[0];
        const expected = testCase[1];
        it(`computes the correct successor for a ${type} six`, () => {
            expect(factory().getNextSixType(type)).toBe(expected);
        });
    }

};
