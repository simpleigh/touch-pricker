/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import AbstractSix from '.';
import { BlockOwnership } from '../../../blocks';
import {
    testAbstractBlockImplementation,
} from '../../../blocks/AbstractBlock.spec';
import { Row, Stage, stringFromRow } from '../../../rows';
import matchers from '../../../templates/matchers';
import { createTestRow } from '../../../testFunctions.spec';
import { StringArray } from '../../../visitors';
import Call from '../../Call';
import * as Changes from '../../changes';
import Course from '../../Course';
import SixType from '../../SixType';

export const testSixImplementation = (
    factory: (initialRow: Row, _ownership?: BlockOwnership) => AbstractSix,
    testCases: Array<[string, string, Stage, Call]>,
    rowTests: Array<[string, string, string, string, string, string, Stage]>,
    type: SixType,
    notation: string[],
    notationStringTests: [string, string, string, string, string],
) => {

    type TestFunction =
        (previous: Row, expected: Row, stage: Stage, call: Call) => void;

    const runTestCases = (testFunction: TestFunction) => () => {
        for (const testCase of testCases) {
            testFunction(
                createTestRow(testCase[0], testCase[2]),  // Previous sixend
                createTestRow(testCase[1], testCase[2]),  // Expected sixend
                testCase[2],                              // Stage
                testCase[3],                              // Call
            );
        }
    };

    it('has the expected type', () => {
        const six = factory(createTestRow());
        expect(six.type).toBe(type);
    });

    it('has the expected notation', () => {
        const six = factory(createTestRow());
        expect(six.notation).toEqual(notation);
    });

    it('can render the notation as a string', () => {
        const six = factory(createTestRow());
        for (let i = 1; i <= 5; i = i + 1) {
            expect(six.getNotationString(i)).toBe(notationStringTests[i - 1]);
        }
    });

    it('calculates the last row correctly', runTestCases(
        (previous, expected, stage, call) => {
            const six = factory(previous);
            six.setCall(call);
            expect(six.getLast()).toEqual(expected);
        },
    ));

    it('updates when the initial row changes', runTestCases(
        (previous, expected, stage, call) => {
            const incorrectPrevious = createTestRow('', stage);
            const six = factory(incorrectPrevious);

            six.setCall(call);
            expect(six.getLast()).not.toEqual(expected);

            six.initialRow = previous;
            expect(six.getLast()).toEqual(expected);
        },
    ));

    it('updates when the call is toggled', runTestCases(
        (previous, expected, stage, call) => {
            const six = factory(previous);

            // Set the call to the one before the right one
            if (call === Call.Plain) {
                six.setCall(Call.Single);
            } else if (call === Call.Bob) {
                six.setCall(Call.Plain);
            } else {
                six.setCall(Call.Bob);
            }

            expect(six.getLast()).not.toEqual(expected);

            six.toggleCall();
            expect(six.getLast()).toEqual(expected);
        },
    ));

    it('generates the correct last row when visited', runTestCases(
        (previous, expected, stage, call) => {
            const six = factory(previous);
            const visitor = new StringArray();

            six.setCall(call);
            six.accept(visitor);

            expect(visitor.strings[5]).toEqual(stringFromRow(expected));
        },
    ));

    it('computes the six head correctly', runTestCases(
        (previous, expected, stage, call) => {
            const six = factory(previous);
            const row = previous.slice();
            Changes.permuteCall(row, call);
            six.setCall(call);
            expect(six.getFirst()).toEqual(row);
        },
    ));

    it('generates the correct rows when visited', () => {
        for (const rowTest of rowTests) {
            const expectedRow: any[] = rowTest.slice(0, 6);  // Six test rows
            const initialRow = createTestRow('', rowTest[6]); // ... and stage
            const six = factory(initialRow);
            const visitor = new StringArray();

            six.accept(visitor);

            expect(visitor.strings).toEqual(expectedRow);
        }
    });

    describe('is derived from AbstractSix and', () => {

        beforeEach(() => {
            jasmine.addMatchers(matchers);
        });

        const createTestSix = (
            container?: Course,
            index: number = 999,
        ): AbstractSix => {
            if (container) {
                return factory(createTestRow(), { container, index });
            }
            return factory(createTestRow());
        };

        it('ignores changes to the returned six head', () => {
            const six = createTestSix();
            const getFirst = six.getFirst();
            const getFirstBackup = getFirst.slice();

            getFirst[3] = 999;  // Mutate the getFirst result
            expect(getFirst).not.toEqual(getFirstBackup);

            expect(six.getFirst()).not.toEqual(getFirst);
            expect(six.getFirst()).toEqual(getFirstBackup);
        });

        it('starts life as a plain six', () => {
            expect(createTestSix().call).toBe(Call.Plain);
        });

        it('lets the call be set using the property', () => {
            const six = createTestSix();
            six.call = Call.Bob;
            expect(six.call).toBe(Call.Bob);
        });

        it('lets the call be set using a method', () => {
            const six = createTestSix();
            six.setCall(Call.Bob);
            expect(six.call).toBe(Call.Bob);
        });

        it('rotates between calls when toggled', () => {
            const six = createTestSix();

            six.toggleCall();
            expect(six.call).toBe(Call.Bob);

            six.toggleCall();
            expect(six.call).toBe(Call.Single);

            six.toggleCall();
            expect(six.call).toBe(Call.Plain);
        });

        it('returns the new call when toggled', () => {
            const six = createTestSix();
            expect(six.toggleCall()).toBe(Call.Bob);
            expect(six.toggleCall()).toBe(Call.Single);
            expect(six.toggleCall()).toBe(Call.Plain);
        });

        it('can suppress updates when a call is set', () => {
            const six = createTestSix();
            const originalLast: Row = six.getLast();

            six.setCall(Call.Bob, false);
            expect(six.getLast()).toEqual(originalLast);
        });

        it('notifies the parent course when a call is set', () => {
            const parent = jasmine.createSpyObj('Course', ['notify']);
            const six = createTestSix(parent);
            six.setCall(Call.Plain);
            expect(parent.notify).toHaveBeenCalledWith(999);
        });

        it('notifies the parent course when toggled', () => {
            const parent = jasmine.createSpyObj('Course', ['notify']);
            const six = createTestSix(parent);
            six.toggleCall();
            expect(parent.notify).toHaveBeenCalledWith(999);
        });

        it('can suppress notification when a call is set', () => {
            const parent = jasmine.createSpyObj('Course', ['notify']);
            const six = createTestSix(parent);
            six.setCall(Call.Plain, false);
            expect(parent.notify).not.toHaveBeenCalled();
        });

        it('passes itself to visitors', () => {
            const six = factory(createTestRow('123'));
            const visitor = jasmine.createSpyObj('AbstractVisitor', ['visit']);

            six.accept(visitor);
            expect(visitor.visit).toHaveBeenCalledTimes(6);
            for (let i = 0; i < 6; i += 1) {
                expect(visitor.visit.calls.argsFor(i)[1]).toBe(six);
            }
        });

        it('is printable', () => {
            expect(factory(createTestRow())).toBePrintable();
        });

        it('has a template for MBD-style prickers', () => {
            expect(factory(createTestRow())).toHaveTemplate('mbd');
        });

        it('has a template for Siril output', () => {
            expect(factory(createTestRow())).toHaveTemplate('siril');
        });

        testAbstractBlockImplementation(
            factory,
            (six) => { (six as AbstractSix).toggleCall(); },
            6,
        );
    });
};