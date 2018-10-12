/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Stage } from '../../rows';
import { createTestRow } from '../../testFunctions.spec';
import Course from '../Course';
import SixType from '../SixType';
import AbstractStrategy from './AbstractStrategy';

/**
 * Tests that a strategy behaves as an AbstractStrategy
 */
export const testAbstractStrategyImplementation = (
    factory: () => AbstractStrategy,
    lengthTestCases: Array<[Stage, number]>,
    progressionTestCases: Array<[SixType, SixType]>,
) => {

    const initialRow = createTestRow();

    const testCourse = new Course(initialRow);

    beforeEach(() => {
        // Sensible default: first input from testcases must be valid
        testCourse.setFirstSixType(progressionTestCases[0][0]);
    });

    for (const testCase of lengthTestCases) {
        const stage = testCase[0];
        const expected = testCase[1];
        it(`computes the correct length for a ${stage} course`, () => {
            const row = createTestRow('', stage);
            expect(factory().getCourseLength(row)).toBe(expected);
        });
    }

    const runProgressionTests = (
        test: (sixType: SixType, expected: SixType) => void,
    ) => {
        for (const testCase of progressionTestCases) {
            const sixType = testCase[0];
            const expected = testCase[1];
            test(sixType, expected);
        }
    };

    runProgressionTests((sixType) => {
        it(`can create a ${sixType} six for the first six`, () => {
            testCourse.setFirstSixType(sixType);
            const six = factory().createSix(initialRow, testCourse, 1);
            expect(six.type).toBe(sixType);
        });
    });

    it('passes the initial row to created sixes', () => {
        const six = factory().createSix(initialRow, testCourse, 42);
        expect(six.initialRow).toEqual(initialRow);
    });

    it('passes the course to created sixes', () => {
        const six = factory().createSix(initialRow, testCourse, 42);
        expect(six.container).toBe(testCourse);
    });

    it('passes the index to created sixes', () => {
        const six = factory().createSix(initialRow, testCourse, 42);
        expect(six.index).toBe(42);
    });

    runProgressionTests((sixType, expected) => {
        it(`can create a ${expected} six for the second six`, () => {
            testCourse.setFirstSixType(sixType);
            const six = factory().createSix(initialRow, testCourse, 2);
            expect(six.type).toBe(expected);
        });
    });

    it('can create a course worth of sixes correctly', () => {
        const strategy = factory();
        const maxIndex = strategy.getCourseLength(initialRow);
        let type = testCourse.firstSixType;

        for (let index = 1; index <= maxIndex; index = index + 1) {
            const six = strategy.createSix(initialRow, testCourse, index);
            expect(six.container).toBe(testCourse);
            expect(six.index).toBe(index);
            expect(six.type).toBe(type);
            type = strategy.getNextSixType(type);
        }
    });

    runProgressionTests((sixType) => {
        it(`knows that a ${sixType} six is valid`, () => {
            expect(() => factory().checkSixType(sixType)).not.toThrow();
        });
    });

    it('knows that an invalid six is invalid', () => {
        expect(() => factory().checkSixType(SixType.Invalid)).toThrow();
    });

    runProgressionTests((sixType, expected) => {
        it(`computes the correct successor for a ${sixType} six`, () => {
            expect(factory().getNextSixType(sixType)).toBe(expected);
        });
    });

    it('throws when trying to compute the successor of an invalid six', () => {
        expect(() => factory().getNextSixType(SixType.Invalid)).toThrow();
    });

};
