/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Lead from '.';
import {
    testAbstractBlockImplementation,
} from '../../blocks/AbstractBlock.spec';
import { multiply, Row, rowFromString, Stage, stringFromRow } from '../../rows';
import { StringArray } from '../../visitors';
import library from '../library';

describe('Lead', () => {
    const testRow = rowFromString('', Stage.Maximus);

    let lead: Lead;

    beforeEach(() => {
        lead = new Lead(testRow);
    });

    const testMethods: Array<[string, string]> = [
        ['Bristol', '1795E3T20486'],
        ['Cambridge', '157392E4T608'],
        ['Crayford', '18604T2E3957'],
    ];

    type TestFunction = (method: string, leadHead: Row) => void;

    const runTestCases = (testFunction: TestFunction) => () => {
        for (const testMethod of testMethods) {
            testFunction(
                testMethod[0],                                // Method
                rowFromString(testMethod[1], Stage.Maximus),  // Lead head row
            );
        }
    };

    it('defaults to Bristol', () => {
        expect(lead.method).toBe('Bristol');
    });

    it('knows the first lead head', () => {
        expect(stringFromRow(lead.getLast())).toBe('1795E3T20486');
    });

    it('can calculate the second lead head', () => {
        lead.initialRow = lead.getLast();
        expect(stringFromRow(lead.getLast())).toBe('1T0E89674523');
    });

    it('allows the method to be set', () => {
        lead.method = 'Cambridge';
        expect(lead.method).toBe('Cambridge');
    });

    it('throws if an unknown method is set', () => {
        expect(() => { lead.method = 'not a method'; }).toThrow();
    });

    it('computes last rows correctly from rounds', runTestCases(
        (method, leadHead) => {
            lead.method = method;
            expect(lead.getLast()).toEqual(leadHead);
        },
    ));

    it('computes last rows correctly from another row', runTestCases(
        (method, leadHead) => {
            const initialRow = rowFromString('TE0987654321', Stage.Maximus);
            lead.initialRow = initialRow;
            lead.method = method;
            expect(lead.getLast()).toEqual(multiply(initialRow, leadHead));
        },
    ));

    it('computes the correct rows from rounds when visited', runTestCases(
        (method) => {
            const expected = library.getRows(method)!.map(stringFromRow);
            const visitor = new StringArray();
            lead.method = method;
            lead.accept(visitor);
            expect(visitor.strings).toEqual(expected);
        },
    ));

    it('computes the correct rows from another row when visited', runTestCases(
        (method) => {
            const initialRow = rowFromString('TE0987654321', Stage.Maximus);
            const expected = library.getRows(method)!.map((row) => {
                row = multiply(initialRow, row);
                return stringFromRow(row);
            });
            const visitor = new StringArray();

            lead.initialRow = initialRow;
            lead.method = method;
            lead.accept(visitor);
            expect(visitor.strings).toEqual(expected);
        },
    ));

    it('estimates the numbers of rows correctly', runTestCases(
        (method) => {
            lead.method = method;
            expect(lead.estimateRows()).toBe(library.getRowCount(method)!);
        },
    ));

    testAbstractBlockImplementation(
        (initialRow, _ownership) => new Lead(initialRow, _ownership),
        [
            rowFromString('TE0987654321', Stage.Maximus),
            rowFromString('2143658709TE', Stage.Maximus),
        ],
        (block) => { (block as Lead).method = 'Cambridge'; },
        48,
    );
});
