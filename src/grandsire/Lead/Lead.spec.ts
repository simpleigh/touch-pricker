/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import {
    testAbstractBlockImplementation,
} from '../../blocks/AbstractBlock.spec';
import { rounds, Row, rowFromString, Stage, stringFromRow } from '../../rows';
import { Call } from '../../shared';
import { StringArray } from '../../visitors';
import Lead from '.';

describe('Grandsire Lead class', () => {

    testAbstractBlockImplementation(
        Stage.Doubles,
        (initialRow, _ownership) => new Lead(initialRow, _ownership),
        10,
        (lead) => (lead as Lead).toggleCall(),
    );

    const lastTestCases: [Stage, Call, string][] = [
        [Stage.Doubles,   Call.Plain,  '12534'],
        [Stage.Triples,   Call.Plain,  '1253746'],
        [Stage.Caters,    Call.Plain,  '125374968'],
        [Stage.Cinques,   Call.Plain,  '12537496E80'],
        [Stage.Sextuples, Call.Plain,  '12537496E8A0T'],
        [Stage.Septuples, Call.Plain,  '12537496E8A0CTB'],
        [Stage.Doubles,   Call.Bob,    '14523'],
        [Stage.Triples,   Call.Bob,    '1752634'],
        [Stage.Caters,    Call.Bob,    '175293846'],
        [Stage.Cinques,   Call.Bob,    '175293E4068'],
        [Stage.Sextuples, Call.Bob,    '175293E4A6T80'],
        [Stage.Septuples, Call.Bob,    '175293E4A6C8B0T'],
        [Stage.Doubles,   Call.Single, '15423'],
        [Stage.Triples,   Call.Single, '1572634'],
        [Stage.Caters,    Call.Single, '157293846'],
        [Stage.Cinques,   Call.Single, '157293E4068'],
        [Stage.Sextuples, Call.Single, '157293E4A6T80'],
        [Stage.Septuples, Call.Single, '157293E4A6C8B0T'],
    ];

    type TestFunction = (stage: Stage, call: Call, expected: Row) => void;

    const runTestCases = (testFunction: TestFunction) => () => {
        for (const testCase of lastTestCases) {
            testFunction(
                testCase[0],                              // Stage
                testCase[1],                              // Call
                rowFromString(testCase[2], testCase[0]),  // Expected last row
            );
        }
    };

    it('calculates the last row correctly', runTestCases(
        (stage, call, expected) => {
            const lead = new Lead(rounds(stage));
            lead.setCall(call);
            expect(lead.getLast()).toEqual(expected);
        }
    ));

    it('updates when the initial row changes', runTestCases(
        (stage, call, expected) => {
            const incorrectPrevious = rowFromString('54321', stage);
            const lead = new Lead(incorrectPrevious);

            lead.setCall(call);
            expect(lead.getLast()).not.toEqual(expected);

            lead.initialRow = rounds(stage);

            expect(lead.getLast()).toEqual(expected);
        },
    ));

    it('generates the correct last row when visited', runTestCases(
        (stage, call, expected) => {
            const lead = new Lead(rounds(stage));
            const visitor = new StringArray();

            lead.setCall(call);
            lead.accept(visitor);

            const lastString = visitor.strings[visitor.strings.length - 1];
            expect(lastString).toEqual(stringFromRow(expected));
        },
    ));

    const rowTests: [Stage, Call, string[]][] = [
        [Stage.Doubles, Call.Plain, [
            '21354',
            '23145',
            '32415',
            '34251',
            '43521',
            '45312',
            '54132',
            '51423',
            '15243',
            '12534',
        ]],
        [Stage.Doubles, Call.Bob, [
            '21354',
            '23145',
            '32415',
            '34251',
            '43521',
            '45312',
            '54132',
            '51423',
            '15432',
            '14523',
        ]],
        [Stage.Doubles, Call.Single, [
            '21354',
            '23145',
            '32415',
            '34251',
            '43521',
            '45312',
            '54132',
            '51423',
            '15432',
            '15423',
        ]],
        [Stage.Triples, Call.Plain, [
            '2135476',
            '2314567',
            '3241657',
            '3426175',
            '4362715',
            '4637251',
            '6473521',
            '6745312',
            '7654132',
            '7561423',
            '5716243',
            '5172634',
            '1527364',
            '1253746',
        ]],
        [Stage.Caters, Call.Plain, [
            '213547698',
            '231456789',
            '324165879',
            '342618597',
            '436281957',
            '463829175',
            '648392715',
            '684937251',
            '869473521',
            '896745312',
            '987654132',
            '978561423',
            '795816243',
            '759182634',
            '571928364',
            '517293846',
            '152739486',
            '125374968',
        ]],
        [Stage.Cinques, Call.Plain, [
            '213547698E0',
            '2314567890E',
            '3241658709E',
            '342618507E9',
            '43628105E79',
            '4638201E597',
            '648302E1957',
            '68403E29175',
            '8604E392715',
            '806E4937251',
            '08E69473521',
            '0E896745312',
            'E0987654132',
            'E9078561423',
            '9E705816243',
            '97E50182634',
            '795E1028364',
            '7591E203846',
            '57192E30486',
            '517293E4068',
            '1527394E608',
            '12537496E80',
        ]],
        [Stage.Sextuples, Call.Plain, [
            '213547698E0AT',
            '2314567890ETA',
            '3241658709TEA',
            '342618507T9AE',
            '43628105T7A9E',
            '4638201T5A7E9',
            '648302T1A5E79',
            '68403T2A1E597',
            '8604T3A2E1957',
            '806T4A3E29175',
            '08T6A4E392715',
            '0T8A6E4937251',
            'T0A8E69473521',
            'TA0E896745312',
            'ATE0987654132',
            'AET9078561423',
            'EA9T705816243',
            'E9A7T50182634',
            '9E7A5T1028364',
            '97E5A1T203846',
            '795E1A2T30486',
            '7591E2A3T4068',
            '57192E3A4T608',
            '517293E4A6T80',
            '1527394E6A8T0',
            '12537496E8A0T',
        ]],
        [Stage.Septuples, Call.Plain, [
            '213547698E0ATCB',
            '2314567890ETABC',
            '3241658709TEBAC',
            '342618507T9BECA',
            '43628105T7B9CEA',
            '4638201T5B7C9AE',
            '648302T1B5C7A9E',
            '68403T2B1C5A7E9',
            '8604T3B2C1A5E79',
            '806T4B3C2A1E597',
            '08T6B4C3A2E1957',
            '0T8B6C4A3E29175',
            'T0B8C6A4E392715',
            'TB0C8A6E4937251',
            'BTC0A8E69473521',
            'BCTA0E896745312',
            'CBATE0987654132',
            'CABET9078561423',
            'ACEB9T705816243',
            'AEC9B7T50182634',
            'EA9C7B5T1028364',
            'E9A7C5B1T203846',
            '9E7A5C1B2T30486',
            '97E5A1C2B3T4068',
            '795E1A2C3B4T608',
            '7591E2A3C4B6T80',
            '57192E3A4C6B8T0',
            '517293E4A6C8B0T',
            '1527394E6A8C0BT',
            '12537496E8A0CTB',
        ]],
    ];

    it('generates the correct rows when visited', () => {
        for (const rowTest of rowTests) {
            const stage = rowTest[0];
            const call = rowTest[1];
            const expected = rowTest[2];

            const lead = new Lead(rounds(stage));
            lead.setCall(call);
            const visitor = new StringArray();

            lead.accept(visitor);

            expect(visitor.strings).toEqual(expected);
        }
    });

    it('passes itself to visitors', () => {
        const lead = new Lead(rounds(Stage.Doubles));
        const visitor = jasmine.createSpyObj('AbstractVisitor', ['visit']);

        lead.accept(visitor);
        expect(visitor.visit).toHaveBeenCalledTimes(10);
        for (let i = 1; i < 10; i += 1) {
            expect(visitor.visit.calls.argsFor(i)[1]).toBe(lead);
        }
    });

    it('is unchanged when visited', () => {
        const lead = new Lead(rounds(Stage.Doubles));
        const visitor = new StringArray();

        const initialRowBackup = lead.initialRow;
        const callBackup = lead.call;

        lead.accept(visitor);

        expect(lead.initialRow).toEqual(initialRowBackup);
        expect(lead.call).toEqual(callBackup);
    });

    const lengthTestCases: [Stage, number][] = [
        [Stage.Doubles,   10],
        [Stage.Triples,   14],
        [Stage.Caters,    18],
        [Stage.Cinques,   22],
        [Stage.Sextuples, 26],
        [Stage.Septuples, 30],
    ];

    it('estimates the number of rows correctly', () => {
        for (const testCase of lengthTestCases) {
            const stage = testCase[0];
            const expected = testCase[1];
            const lead = new Lead(rounds(stage));
            expect(lead.estimateRows()).toBe(expected);
        }
    });

    // tslint:disable:max-line-length
    const notationTestCases: [Stage, Call, string[]][] = [
        [Stage.Doubles, Call.Plain, [
            '3', '1', '5', '1', '5', '1', '5', '1', '5', '1',
        ]],
        [Stage.Triples, Call.Plain, [
            '3', '1', '7', '1', '7', '1', '7', '1', '7', '1', '7', '1', '7', '1',
        ]],
        [Stage.Caters, Call.Plain, [
            '3', '1', '9', '1', '9', '1', '9', '1', '9', '1', '9', '1', '9', '1', '9', '1', '9', '1',
        ]],
        [Stage.Cinques, Call.Plain, [
            '3', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1',
        ]],
        [Stage.Sextuples, Call.Plain, [
            '3', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1',
        ]],
        [Stage.Septuples, Call.Plain, [
            '3', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1',
        ]],
        [Stage.Doubles, Call.Bob, [
            '3', '1', '5', '1', '5', '1', '5', '1', '3', '1',
        ]],
        [Stage.Triples, Call.Bob, [
            '3', '1', '7', '1', '7', '1', '7', '1', '7', '1', '7', '1', '3', '1',
        ]],
        [Stage.Caters, Call.Bob, [
            '3', '1', '9', '1', '9', '1', '9', '1', '9', '1', '9', '1', '9', '1', '9', '1', '3', '1',
        ]],
        [Stage.Cinques, Call.Bob, [
            '3', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1', '3', '1',
        ]],
        [Stage.Sextuples, Call.Bob, [
            '3', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', '3', '1',
        ]],
        [Stage.Septuples, Call.Bob, [
            '3', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', '3', '1',
        ]],
        [Stage.Doubles, Call.Single, [
            '3', '1', '5', '1', '5', '1', '5', '1', '3', '123',
        ]],
        [Stage.Triples, Call.Single, [
            '3', '1', '7', '1', '7', '1', '7', '1', '7', '1', '7', '1', '3', '123',
        ]],
        [Stage.Caters, Call.Single, [
            '3', '1', '9', '1', '9', '1', '9', '1', '9', '1', '9', '1', '9', '1', '9', '1', '3', '123',
        ]],
        [Stage.Cinques, Call.Single, [
            '3', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1', 'E', '1', '3', '123',
        ]],
        [Stage.Sextuples, Call.Single, [
            '3', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', 'A', '1', '3', '123',
        ]],
        [Stage.Septuples, Call.Single, [
            '3', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', 'C', '1', '3', '123',
        ]],
    ];
    // tslint:enable:max-line-length

    it('computes the correct notation', () => {
        for (const notationTestCase of notationTestCases) {
            const stage = notationTestCase[0];
            const call = notationTestCase[1];
            const expected = notationTestCase[2];

            const lead = new Lead(rounds(stage));
            lead.setCall(call);

            expect(lead.notation).toEqual(expected);
        }
    });

    it('starts life as a plain lead', () => {
        const lead = new Lead(rounds(Stage.Doubles));
        expect(lead.call).toBe(Call.Plain);
    });

    it('lets the call be set using the property', () => {
        const lead = new Lead(rounds(Stage.Doubles));
        lead.call = Call.Bob;
        expect(lead.call).toBe(Call.Bob);
    });

    it('lets the call be set using a method', () => {
        const lead = new Lead(rounds(Stage.Doubles));
        lead.setCall(Call.Bob);
        expect(lead.call).toBe(Call.Bob);
    });

    it('rotates between calls when toggled', () => {
        const lead = new Lead(rounds(Stage.Doubles));

        lead.toggleCall();
        expect(lead.call).toBe(Call.Bob);

        lead.toggleCall();
        expect(lead.call).toBe(Call.Single);

        lead.toggleCall();
        expect(lead.call).toBe(Call.Plain);
    });

    it('returns the new call when toggled', () => {
        const lead = new Lead(rounds(Stage.Doubles));
        expect(lead.toggleCall()).toBe(Call.Bob);
        expect(lead.toggleCall()).toBe(Call.Single);
        expect(lead.toggleCall()).toBe(Call.Plain);
    });

    it('updates the last row when the call is toggled', runTestCases(
        (stage, call, expected) => {
            const lead = new Lead(rounds(stage));

            // Set the call to the one before the right one
            if (call === Call.Plain) {
                lead.setCall(Call.Single);
            } else if (call === Call.Bob) {
                lead.setCall(Call.Plain);
            } else {
                lead.setCall(Call.Bob);
            }

            expect(lead.getLast()).not.toEqual(expected);

            lead.toggleCall();
            expect(lead.getLast()).toEqual(expected);
        },
    ));

    it('can suppress updates when a call is set', () => {
        const lead = new Lead(rounds(Stage.Doubles));
        const originalLast: Row = lead.getLast();

        lead.setCall(Call.Bob, false);
        expect(lead.getLast()).toEqual(originalLast);
    });

    it('notifies the parent course when a call is set', () => {
        const container = jasmine.createSpyObj('Course', ['notify']);
        const lead = new Lead(rounds(Stage.Doubles));
        // set this after creation to avoid spurious notifications
        lead.ownership = { container, index: 999 };

        lead.setCall(Call.Plain);

        expect(container.notify).toHaveBeenCalledWith(999);
    });

    it('notifies the parent course when toggled', () => {
        const container = jasmine.createSpyObj('Course', ['notify']);
        const lead = new Lead(rounds(Stage.Doubles));
        // set this after creation to avoid spurious notifications
        lead.ownership = { container, index: 999 };

        lead.toggleCall();

        expect(container.notify).toHaveBeenCalledWith(999);
    });

    it('can suppress notification when a call is set', () => {
        const container = jasmine.createSpyObj('Course', ['notify']);
        const lead = new Lead(rounds(Stage.Doubles));
        // set this after creation to avoid spurious notifications
        lead.ownership = { container, index: 999 };

        lead.setCall(Call.Plain, false);

        expect(container.notify).not.toHaveBeenCalled();
    });

    it('is printable', () => {
        expect(new Lead(rounds(Stage.Doubles))).toBePrintable();
    });

    it('has a template for MBD-style prickers', () => {
        expect(new Lead(rounds(Stage.Doubles))).toHaveTemplate('mbd');
    });

    it('has a template for Siril output', () => {
        expect(new Lead(rounds(Stage.Doubles))).toHaveTemplate('siril');
    });

});
