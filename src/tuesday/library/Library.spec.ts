/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { stringFromRow } from '../../rows';
import Library from './Library';

describe('method library', () => {

    const library = new Library();

    const testCases: Array<[string, string, number]> = [
        ['Ariel', '108T6E492735', 48],
        ['Avon', '142638507T9E', 48],
        ['Bastow', '142638507T9E', 4],
        ['Bristol', '1795E3T20486', 48],
        ['Cambridge', '157392E4T608', 48],
        ['Crayford', '18604T2E3957', 8],
        ['Deimos', '13527496E8T0', 36],
        ['Little', '1648203T5E79', 8],
        ['Maypole', '1795E3T20486', 40],
        ['Orion', '142638507T9E', 48],
        ['Phobos', '1648203T5E79', 48],
        ['Rigel', '1648203T5E79', 48],
        ['Strathclyde', '18604T2E3957', 48],
        ['Zanussi', '1ET907856342', 48],
    ];

    type TestFunction =
        (name: string, leadHead: string, length: number) => void;

    const runTestCases = (testFunction: TestFunction) => () => {
        for (const testCase of testCases) {
            testFunction(
                testCase[0],  // Name
                testCase[1],  // Lead head
                testCase[2],  // Lead length
            );
        }
    };

    describe('getNames method', () => {
        it('returns the expected names', () => {
            const expected = testCases.map((testCase) => testCase[0]);
            expect(library.getNames()).toEqual(expected);
        });
    });

    describe('getRows method', () => {
        it('recognises the expected methods', runTestCases((name) => {
            expect(library.getRows(name)).toBeDefined();
        }));

        it('returns the right number of rows', runTestCases(
            (name, leadHead, length) => {
                expect(library.getRows(name)!.length).toBe(length);
            },
        ));

        it('returns maximus rows', runTestCases((name) => {
            for (const row of library.getRows(name)!) {
                expect(row.length).toBe(12);
            }
        }));

        it('finishes with the correct row', runTestCases(
            (name, leadHead, length) => {
                const lastRow = library.getRows(name)![length - 1];
                expect(stringFromRow(lastRow)).toBe(leadHead);
            },
        ));

        it('returns undefined for unknown methods', () => {
            expect(library.getRows('not a method')).toBeUndefined();
        });
    });

    describe('getLeadHead method', () => {
        it('recognises the expected methods', runTestCases((name) => {
            expect(library.getLeadHead(name)).toBeDefined();
        }));

        it('returns the correct lead head', runTestCases((name, leadHead) => {
            expect(stringFromRow(library.getLeadHead(name)!)).toBe(leadHead);
        }));

        it('returns undefined for unknown methods', () => {
            expect(library.getLeadHead('not a method')).toBeUndefined();
        });
    });

    describe('getRowCount method', () => {
        it('recognises the expected methods', runTestCases((name) => {
            expect(library.getRowCount(name)).toBeDefined();
        }));

        it('returns the correct row count', runTestCases(
            (name, leadHead, length) => {
                expect(library.getRowCount(name)).toBe(length);
            },
        ));

        it('returns undefined for unknown methods', () => {
            expect(library.getRowCount('not a method')).toBeUndefined();
        });
    });

});
