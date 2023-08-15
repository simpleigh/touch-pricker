/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import testAbstractBlockImplementation from
    '../blocks/testAbstractBlockImplementation';
import { AbstractBlock } from '../blocks';
import { rounds, Row, rowFromString, Stage, stringFromRow } from '../rows';
import { AbstractVisitor, StringArray } from '../visitors';
import AbstractLead from './AbstractLead';
import Call from './Call';
import { Course } from './testBlocks';

class Visitor extends AbstractVisitor {
    protected override visitImplementation(
        row: Row,
        block?: AbstractBlock,
    ): void {
        // NOOP
    }
}

/**
 * Tests that a lead behaves as an AbstractLead
 * @param testStage        stage to use when testing this block
 * @param factory          creates a non-empty instance of the block
 * @param testCases        testcases for the last row in the lead
 * @param lengthTestCases  testcases for the length of the lead
 */
const testAbstractLeadImplementation = (
    testStage: Stage,
    factory: (initialRow: Row) => AbstractLead,
    testCases: [string, string, Stage, Call][],
    lengthTestCases: [Stage, number][],
): void => {
    describe('is derived from AbstractLead and', () => {
        testAbstractBlockImplementation(
            testStage,
            factory,
            lengthTestCases,
            (abstractLead) => (abstractLead as AbstractLead).toggleCall(),
        );

        let lead: AbstractLead;

        beforeEach(() => {
            lead = factory(rounds(testStage));
        });

        it('calculates the last row correctly', () => {
            for (const [initialRow, lastRow, stage, call] of testCases) {
                lead = factory(rowFromString(initialRow, stage));
                lead.call = call;

                expect(stringFromRow(lead.getLast())).toEqual(lastRow);
            }
        });

        it('throws an exception if used for an unexpected stage', () => {
            expect(() => {
                factory([1, 2]);
            }).toThrowError("Cannot find lead head for stage '2'");
        });

        it('updates when the initial row changes', () => {
            for (const [initialRow, lastRow, stage, call] of testCases) {
                lead = factory(rounds(stage));
                lead.call = call;

                expect(stringFromRow(lead.getLast())).not.toBe(lastRow);

                lead.initialRow = rowFromString(initialRow, stage);

                expect(stringFromRow(lead.getLast())).toBe(lastRow);
            }
        });

        it('starts life as a plain lead', () => {
            expect(lead.call).toBe(Call.Plain);
        });

        it('lets the call be set using the property', () => {
            lead.call = Call.Bob;
            expect(lead.call).toBe(Call.Bob);
        });

        it('lets the call be set using a method', () => {
            lead.setCall(Call.Bob);
            expect(lead.call).toBe(Call.Bob);
        });

        it('rotates between calls when toggled', () => {
            lead.toggleCall();
            expect(lead.call).toBe(Call.Bob);

            lead.toggleCall();
            expect(lead.call).toBe(Call.Single);

            lead.toggleCall();
            expect(lead.call).toBe(Call.Plain);
        });

        it('returns the new call when toggled', () => {
            expect(lead.toggleCall()).toBe(Call.Bob);
            expect(lead.toggleCall()).toBe(Call.Single);
            expect(lead.toggleCall()).toBe(Call.Plain);
        });

        it('updates when the call is toggled', () => {
            for (const [initialRow, lastRow, stage, call] of testCases) {
                lead = factory(rowFromString(initialRow, stage));

                // Set the call to the one before the right one
                if (call === Call.Plain) {
                    lead.call = Call.Single;
                } else if (call === Call.Bob) {
                    lead.call = Call.Plain;
                } else {
                    lead.call = Call.Bob;
                }

                expect(stringFromRow(lead.getLast())).not.toBe(lastRow);

                lead.toggleCall();
                expect(stringFromRow(lead.getLast())).toBe(lastRow);
            }
        });

        it('can suppress updates when a call is set', () => {
            const originalLast: Row = lead.getLast();

            lead.setCall(Call.Bob, false);
            expect(lead.getLast()).toEqual(originalLast);
        });

        it('notifies the parent course when a call is set', () => {
            const container = new Course(lead.initialRow);
            jest.spyOn(container, 'notify');
            // set this after creation to avoid spurious notifications
            lead.ownership = { container, index: 999 };

            lead.setCall(Call.Plain);

            expect(container.notify).toHaveBeenCalledWith(999);
        });

        it('notifies the parent course when toggled', () => {
            const container = new Course(lead.initialRow);
            jest.spyOn(container, 'notify');
            // set this after creation to avoid spurious notifications
            lead.ownership = { container, index: 999 };

            lead.toggleCall();

            expect(container.notify).toHaveBeenCalledWith(999);
        });

        it('can suppress notification when a call is set', () => {
            const container = new Course(lead.initialRow);
            jest.spyOn(container, 'notify');
            // set this after creation to avoid spurious notifications
            lead.ownership = { container, index: 999 };

            lead.setCall(Call.Plain, false);

            expect(container.notify).not.toHaveBeenCalled();
        });

        it('generates the correct last row when visited', () => {
            for (const [initialRow, expected, stage, call] of testCases) {
                lead = factory(rowFromString(initialRow, stage));
                const visitor = new StringArray();

                lead.setCall(call);
                lead.accept(visitor);

                const lastRow = visitor.strings[visitor.strings.length - 1];
                expect(lastRow).toEqual(expected);
            }
        });

        it('passes itself to visitors', () => {
            const visitor = new Visitor();
            jest.spyOn(visitor, 'visit');

            lead.accept(visitor);

            expect(visitor.visit).toHaveBeenCalledTimes(lead.rows);
            for (let i = 0; i < lead.rows; i += 1) {
                expect((visitor.visit as jest.Mock).mock.calls[i][1]).toBe(
                    lead,
                );
            }
        });

        it('is unchanged when visited', () => {
            const visitor = new StringArray();

            const initialRowBackup = lead.initialRow;
            const callBackup = lead.call;

            lead.accept(visitor);

            expect(lead.initialRow).toEqual(initialRowBackup);
            expect(lead.call).toEqual(callBackup);
        });
    });
};

export default testAbstractLeadImplementation;
