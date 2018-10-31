/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Stage } from '../../../rows';
import matchers from '../../../templates/matchers';
import { createTestRow } from '../../../testFunctions.spec';
import Course from '../../Course';
import SixType from '../../SixType';
import AbstractMethod from './AbstractMethod';

/**
 * Tests that a method behaves as an AbstractMethod
 */
export const testAbstractMethodImplementation = (
    factory: () => AbstractMethod,
    name: string,
    lengthTestCases: Array<[Stage, number]>,
    progressionTestCases: Array<[SixType, SixType]>,
    [defaultStartRowIndex, defaultStartSixType]: [number, SixType],
) => {

    const initialRow = createTestRow();

    const testCourse = new Course(initialRow);

    beforeEach(() => {
        // Sensible default: first input from testcases must be valid
        testCourse.setFirstSixType(progressionTestCases[0][0]);
    });

    it('provides access to the method name', () => {
        expect(factory().name).toBe(name);
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
        testFunction: (sixType: SixType, expected: SixType) => void,
    ) => {
        for (const testCase of progressionTestCases) {
            const sixType = testCase[0];
            const expected = testCase[1];
            testFunction(sixType, expected);
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
        const method = factory();
        const maxIndex = method.getCourseLength(initialRow);
        let type = testCourse.firstSixType;

        for (let index = 1; index <= maxIndex; index = index + 1) {
            const six = method.createSix(initialRow, testCourse, index);
            expect(six.container).toBe(testCourse);
            expect(six.index).toBe(index);
            expect(six.type).toBe(type);
            type = method.getNextSixType(type);
        }
    });

    runProgressionTests((sixType) => {
        it(`knows that a ${sixType} six is valid`, () => {
            expect(() => factory().checkSixType(sixType)).not.toThrow();
        });
    });

    it(`starts on row ${defaultStartRowIndex} of a six by default`, () => {
        expect(factory().defaultStartRowIndex).toBe(defaultStartRowIndex);
    });

    it(`starts with a ${defaultStartSixType} six by default`, () => {
        expect(factory().defaultStartSixType).toBe(defaultStartSixType);
    });

    it('starts with a valid six by default', () => {
        const method = factory();
        expect(() => method.checkSixType(defaultStartSixType)).not.toThrow();
    });

    runProgressionTests((sixType, expected) => {
        it(`computes the correct successor for a ${sixType} six`, () => {
            expect(factory().getNextSixType(sixType)).toBe(expected);
        });
    });

    describe('is derived from AbstractMethod and', () => {

        beforeEach(() => {
            jasmine.addMatchers(matchers);
        });

        it('knows that an invalid six is invalid', () => {
            expect(() => factory().checkSixType(SixType.Invalid)).toThrow();
        });

        it('throws computing the successor of an invalid six', () => {
            expect(() => factory().getNextSixType(SixType.Invalid)).toThrow();
        });

        it('is printable', () => {
            expect(factory()).toBePrintable();
        });

        it('has a template for printing six type options', () => {
            expect(factory()).toHaveTemplate('select');
        });

    });

};
