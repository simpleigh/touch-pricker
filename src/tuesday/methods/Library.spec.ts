/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { stringFromRow } from '../../rows';
import data from './data';
import Library from './Library';

describe('method library', () => {

    const library = new Library(data);

    const testCases: [string, string, string, number, string][] = [
        ['Ariel', '1806T4E29375', '108T6E492735', 48, '1T'],
        ['Avon', '1243658709TE', '142638507T9E', 48, '1T'],
        ['Bastow', '1243658709TE', '142638507T9E', 4, '1T'],
        ['Bristol', '197E5T302846', '1795E3T20486', 48, '1T'],
        ['Cambridge', '1537294E6T80', '157392E4T608', 48, '12'],
        ['Crayford', '168402T3E597', '18604T2E3957', 8, '1T'],
        ['Deimos', '1537294E6T80', '13527496E8T0', 36, '1T'],
        ['Little', '168402T3E597', '1648203T5E79', 8, '12'],
        ['Maypole', '197E5T302846', '1795E3T20486', 40, '1T'],
        ['Orion', '1243658709TE', '142638507T9E', 48, '1T'],
        ['Phobos', '14628305T7E9', '1648203T5E79', 48, '1T'],
        ['Rigel', '14628305T7E9', '1648203T5E79', 48, '1T'],
        ['Strathclyde', '168402T3E597', '18604T2E3957', 48, '1T'],
        ['Zanussi', '1TE098765432', '1ET907856342', 48, '1T'],
    ];

    type TestFunction = (
        name: string,
        leadEnd: string,
        leadHead: string,
        length: number,
        defaultCall: string,
    ) => void;

    const runTestCases = (testFunction: TestFunction) => () => {
        for (const testCase of testCases) {
            testFunction(
                testCase[0],  // Name
                testCase[1],  // Lead end
                testCase[2],  // Lead head
                testCase[3],  // Lead length
                testCase[4],  // Default call
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
            (name, leadEnd, leadHead, length) => {
                expect(library.getRows(name)!.length).toBe(length);
            },
        ));

        it('returns maximus rows', runTestCases((name) => {
            for (const row of library.getRows(name)!) {
                expect(row.length).toBe(12);
            }
        }));

        it('finishes with the correct row', runTestCases(
            (name, leadEnd, leadHead, length) => {
                const lastRow = library.getRows(name)![length - 1];
                expect(stringFromRow(lastRow)).toBe(leadHead);
            },
        ));

        it('returns undefined for unknown methods', () => {
            expect(library.getRows('not a method')).toBeUndefined();
        });
    });

    describe('getLeadEnd method', () => {
        it('recognises the expected methods', runTestCases((name) => {
            expect(library.getLeadEnd(name)).toBeDefined();
        }));

        it('returns the correct lead end', runTestCases((name, leadEnd) => {
            expect(stringFromRow(library.getLeadEnd(name)!)).toBe(leadEnd);
        }));

        it('returns undefined for unknown methods', () => {
            expect(library.getLeadEnd('not a method')).toBeUndefined();
        });
    });

    describe('getLeadHead method', () => {
        it('recognises the expected methods', runTestCases((name) => {
            expect(library.getLeadHead(name)).toBeDefined();
        }));

        it('returns the correct lead head', runTestCases(
            (name, leadEnd, leadHead) => {
                expect(stringFromRow(library.getLeadHead(name)!))
                    .toBe(leadHead);
            },
        ));

        it('returns undefined for unknown methods', () => {
            expect(library.getLeadHead('not a method')).toBeUndefined();
        });
    });

    describe('getRowCount method', () => {
        it('recognises the expected methods', runTestCases((name) => {
            expect(library.getRowCount(name)).toBeDefined();
        }));

        it('returns the correct row count', runTestCases(
            (name, leadEnd, leadHead, length) => {
                expect(library.getRowCount(name)).toBe(length);
            },
        ));

        it('returns undefined for unknown methods', () => {
            expect(library.getRowCount('not a method')).toBeUndefined();
        });
    });

    describe('getDefaultCall method', () => {
        it('recognises the expected methods', runTestCases((name) => {
            expect(library.getDefaultCall(name)).toBeDefined();
        }));

        it('returns the correct default call', runTestCases(
            (name, leadEnd, leadHead, length, defaultCall) => {
                expect(library.getDefaultCall(name)).toBe(defaultCall);
            },
        ));

        it('returns undefined for unknown methods', () => {
            expect(library.getDefaultCall('not a method')).toBeUndefined();
        });
    });

});
