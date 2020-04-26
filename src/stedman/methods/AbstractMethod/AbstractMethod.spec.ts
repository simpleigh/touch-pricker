/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { rowFromString, Stage } from '../../../rows';
import Course from '../../Course';
import SixType from '../../SixType';
import AbstractMethod from '.';

/**
 * Tests that a method behaves as an AbstractMethod
 */
export const testAbstractMethodImplementation = (
    Method: new() => AbstractMethod,
    name: string,
    lengthTestCases: [Stage, number][],
    progressionTestCases: [SixType, SixType][],
    [defaultFirstSix, defaultStartSixType, defaultStartRowIndex]:
        [SixType, SixType, number],
) => {

    const initialRow = rowFromString('231', Stage.Cinques);

    const testCourse = new Course(initialRow, new Method());

    const method = new Method();

    beforeEach(() => {
        // Sensible default: first input from testcases must be valid
        testCourse.setFirstSixType(progressionTestCases[0][0]);
    });

    it('provides access to the method name', () => {
        expect(method.name).toBe(name);
    });

    for (const [stage, expected] of lengthTestCases) {
        it(`computes the correct length for a ${stage} course`, () => {
            expect(method.getCourseLength(stage)).toBe(expected);
        });
    }

    const runProgressionTests = (
        testFunction: (sixType: SixType, expected: SixType) => void,
    ) => {
        for (const [sixType, expected] of progressionTestCases) {
            testFunction(sixType, expected);
        }
    };

    runProgressionTests((sixType) => {
        it(`can create a ${sixType} six for the first six`, () => {
            testCourse.setFirstSixType(sixType);
            const six = method.createSix(initialRow, testCourse, 1);
            expect(six.type).toBe(sixType);
        });
    });

    it('passes the initial row to created sixes', () => {
        const six = method.createSix(initialRow, testCourse, 42);
        expect(six.initialRow).toEqual(initialRow);
    });

    runProgressionTests((sixType, expected) => {
        it(`can create a ${expected} six for the second six`, () => {
            testCourse.setFirstSixType(sixType);
            const six = method.createSix(initialRow, testCourse, 2);
            expect(six.type).toBe(expected);
        });
    });

    it('can create a course worth of sixes correctly', () => {
        const maxIndex = method.getCourseLength(initialRow.length);
        let type = testCourse.firstSixType;

        for (let index = 1; index <= maxIndex; index += 1) {
            const six = method.createSix(initialRow, testCourse, index);
            expect(six.type).toBe(type);
            type = method.getNextSixType(type);
        }
    });

    runProgressionTests((sixType) => {
        it(`knows that a ${sixType} six is valid`, () => {
            expect(() => method.checkSixType(sixType)).not.toThrow();
        });
    });

    it(`starts a course with a ${defaultFirstSix} six by default`, () => {
        expect(method.defaultFirstSix).toBe(defaultFirstSix);
    });

    it('starts a course with a valid six by default', () => {
        expect(() => method.checkSixType(defaultFirstSix)).not.toThrow();
    });

    it(`starts on row ${defaultStartRowIndex} of a six by default`, () => {
        expect(method.defaultStartRowIndex).toBe(defaultStartRowIndex);
    });

    it(`starts a touch with a ${defaultStartSixType} six by default`, () => {
        expect(method.defaultStartSixType).toBe(defaultStartSixType);
    });

    it('starts a touch with a valid six by default', () => {
        expect(() => method.checkSixType(defaultStartSixType)).not.toThrow();
    });

    runProgressionTests((sixType, expected) => {
        it(`computes the correct successor for a ${sixType} six`, () => {
            expect(method.getNextSixType(sixType)).toBe(expected);
        });
    });

    describe('is derived from AbstractMethod and', () => {

        it('knows that an invalid six is invalid', () => {
            expect(() => method.checkSixType(SixType.Invalid))
                .toThrowError("'invalid' blocks not allowed for this method");
        });

        it('throws computing the successor of an invalid six', () => {
            expect(() => method.getNextSixType(SixType.Invalid))
                .toThrowError("'invalid' blocks not allowed for this method");
        });

        it('is printable', () => {
            expect(method).toBePrintable();
        });

        it('has a template for printing six type options', () => {
            expect(method).toHaveTemplate('select');
        });

    });

};
