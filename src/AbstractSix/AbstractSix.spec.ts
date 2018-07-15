/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import AbstractSix from '.';
import { testAbstractBlockImplementation } from '../AbstractBlock.spec';
import AbstractContainer from '../AbstractContainer';
import BlockOwnership from '../BlockOwnership';
import Call from '../Call';
import { permuteCall } from '../Changes';
import Row from '../Row';
import SixType from '../SixType';
import Stage from '../Stage';
import stringFromRow from '../stringFromRow';
import { createTestRow } from '../testFunctions.spec';
import { StringArray } from '../Visitor';

export const testSixImplementation = (
    factory: (initialRow: Row, _ownership?: BlockOwnership) => AbstractSix,
    testCases: Array<[string, string, Stage, Call]>,
    rowTests: Array<[string, string, string, string, string, string, Stage]>,
    type: SixType,
    notation: string[],
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
        const six = factory(createTestRow('231'));
        expect(six.type).toBe(type);
    });

    it('has the expected notation', () => {
        const six = factory(createTestRow('231'));
        expect(six.notation).toEqual(notation);
        // TODO: restore following assertion
        // expect(Six.notation).toEqual(notation);
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
            const incorrectPrevious: Row = createTestRow('', stage),
                six = factory(incorrectPrevious);

            six.setCall(call);
            expect(six.getLast()).not.toEqual(expected);

            six.setInitialRow(previous);
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
            const six = factory(previous),
                visitor = new StringArray();
            let strings: string[];

            six.setCall(call);
            six.accept(visitor);
            strings = visitor.getStrings();

            expect(strings[5]).toEqual(stringFromRow(expected));
        },
    ));

    it('computes the six head correctly', runTestCases(
        (previous, expected, stage, call) => {
            const six = factory(previous),
                row = previous.slice();
            permuteCall(row, call);
            six.setCall(call);
            expect(six.getHead()).toEqual(row);
        },
    ));

    it('generates the correct rows when visited', () => {
        let initialRow: Row,
            six: AbstractSix,
            visitor: StringArray,
            strings: string[];

        for (const rowTest of rowTests) {
            const expectedRow: any[] = rowTest.slice(0, 6);  // Six test rows
            initialRow = createTestRow('', rowTest[6]);      // ... and stage
            six = factory(initialRow);
            visitor = new StringArray();

            six.accept(visitor);
            strings = visitor.getStrings();

            expect(strings).toEqual(expectedRow);
        }
    });

    describe('is derived from AbstractSix and', () => {

        function createTestSix(
            container?: AbstractContainer<AbstractSix>,
            index: number = 999,
        ): AbstractSix {
            if (container) {
                return factory(
                    createTestRow(),
                    { 'container': container, 'index': index },
                );
            }
            return factory(createTestRow());
        }

        it('ignores changes to the returned six head', () => {
            const six = createTestSix(),
                getHead = six.getHead(),
                getHeadBackup = getHead.slice();

            getHead[3] = 999;  // Mutate the getHead result
            expect(getHead).not.toEqual(getHeadBackup);

            expect(six.getHead()).not.toEqual(getHead);
            expect(six.getHead()).toEqual(getHeadBackup);
        });

        it('provides a getEnd method for convenience', () => {
            const six = createTestSix();
            expect(six.getEnd()).toEqual(six.getLast());
        });

        it('starts life as a plain six', () => {
            expect(createTestSix().getCall()).toBe(Call.Plain);
        });

        it('lets the call be set', () => {
            const six = createTestSix();
            six.setCall(Call.Bob);
            expect(six.getCall()).toBe(Call.Bob);
        });

        it('rotates between calls when toggled', () => {
            const six = createTestSix();

            six.toggleCall();
            expect(six.getCall()).toBe(Call.Bob);

            six.toggleCall();
            expect(six.getCall()).toBe(Call.Single);

            six.toggleCall();
            expect(six.getCall()).toBe(Call.Plain);
        });

        it('returns the new call when toggled', () => {
            const six = createTestSix();
            expect(six.toggleCall()).toBe(Call.Bob);
            expect(six.toggleCall()).toBe(Call.Single);
            expect(six.toggleCall()).toBe(Call.Plain);
        });

        it('can suppress updates when a call is set', () => {
            const six = createTestSix(),
                originalLast: Row = six.getLast();

            six.setCall(Call.Bob, false);
            expect(six.getLast()).toEqual(originalLast);
        });

        it('notifies the parent course when a call is set', () => {
            const parent = jasmine.createSpyObj('Course', ['notify']),
                six = createTestSix(parent);
            six.setCall(Call.Plain);
            expect(parent.notify).toHaveBeenCalledWith(999);
        });

        it('notifies the parent course when toggled', () => {
            const parent = jasmine.createSpyObj('Course', ['notify']),
                six = createTestSix(parent);
            six.toggleCall();
            expect(parent.notify).toHaveBeenCalledWith(999);
        });

        it('can suppress notification when a call is set', () => {
            const parent = jasmine.createSpyObj('Course', ['notify']),
                six = createTestSix(parent);
            six.setCall(Call.Plain, false);
            expect(parent.notify).not.toHaveBeenCalled();
        });

        it('passes itself to visitors', () => {
            const six = factory(createTestRow('123')),
                visitor = jasmine.createSpyObj('AbstractVisitor', ['visit']);

            six.accept(visitor);
            expect(visitor.visit).toHaveBeenCalledTimes(6);
            for (let i = 0; i < 6; i += 1) {
                expect(visitor.visit.calls.argsFor(i)[1]).toBe(six);
            }
        });

        testAbstractBlockImplementation(
            factory,
            (six) => { (six as AbstractSix).toggleCall(); },
            6,
        );
    });
};
