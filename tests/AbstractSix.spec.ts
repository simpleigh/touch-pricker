/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="functions.ts" />
/// <reference path="AbstractBlock.spec.ts" />

// tslint:disable-next-line:variable-name
function testSixImplementation(Six, testCases, rowTests, type, notation) {

    function runTestCases(testFunction) {
        return () => {
            for (const testCase of testCases) {
                if (!testCase) { continue; }  // IE8 trailing comma
                testFunction(
                    createTestRow(testCase[0], testCase[2]),  // Previous sixend
                    createTestRow(testCase[1], testCase[2]),  // Expected sixend
                    testCase[2],                              // Stage
                    testCase[3],                              // Call
                );
            }
        };
    }

    it('has the expected type', () => {
        const six = new Six(createTestRow('231'));
        expect(six.type).toBe(type);
    });

    it('has the expected notation', () => {
        const six = new Six(createTestRow('231'));
        expect(six.notation).toEqual(notation);
        expect(Six.notation).toEqual(notation);
    });

    it('calculates the last row correctly', runTestCases(
        (previous, expected, stage, call) => {
            const six = new Six(previous);
            six.setCall(call);
            expect(six.getLast()).toEqual(expected);
        },
    ));

    it('updates when the initial row changes', runTestCases(
        (previous, expected, stage, call) => {
            const incorrectPrevious: Pricker.Row = createTestRow('', stage),
                six = new Six(incorrectPrevious);

            six.setCall(call);
            expect(six.getLast()).not.toEqual(expected);

            six.setInitialRow(previous);
            expect(six.getLast()).toEqual(expected);
        },
    ));

    it('updates when the call is toggled', runTestCases(
        (previous, expected, stage, call) => {
            const six = new Six(previous);

            // Set the call to the one before the right one
            if (call === Pricker.Call.Plain) {
                six.setCall(Pricker.Call.Single);
            } else if (call === Pricker.Call.Bob) {
                six.setCall(Pricker.Call.Plain);
            } else {
                six.setCall(Pricker.Call.Bob);
            }

            expect(six.getLast()).not.toEqual(expected);

            six.toggleCall();
            expect(six.getLast()).toEqual(expected);
        },
    ));

    it('generates the correct last row when visited', runTestCases(
        (previous, expected, stage, call) => {
            const six = new Six(previous),
                visitor = new Pricker.Visitor.StringArray();
            let strings: string[];

            six.setCall(call);
            six.accept(visitor);
            strings = visitor.getStrings();

            expect(strings[5]).toEqual(Pricker.stringFromRow(expected));
        },
    ));

    it('computes the six head correctly', runTestCases(
        (previous, expected, stage, call) => {
            const six = new Six(previous),
                row = previous.slice();
            Pricker.Changes.permuteCall(row, call);
            six.setCall(call);
            expect(six.getHead()).toEqual(row);
        },
    ));

    it('generates the correct rows when visited', () => {
        let initialRow: Pricker.Row,
            six: typeof Six,
            visitor: Pricker.Visitor.StringArray,
            strings: string[];

        for (const rowTest of rowTests) {
            if (!rowTest) { continue; }  // IE8 trailing comma
            const expectedRow: any[] = rowTest.slice(0, 6);  // Six test rows
            initialRow = createTestRow('', rowTest[6]);      // ... and stage
            six = new Six(initialRow);
            visitor = new Pricker.Visitor.StringArray();

            six.accept(visitor);
            strings = visitor.getStrings();

            expect(strings).toEqual(expectedRow);
        }
    });

    describe('is derived from AbstractSix and', () => {

        function createTestSix(
            container: Pricker.AbstractBlock = null,
            index: number = 999,
        ): typeof Six {
            if (container) {
                return new Six(
                    createTestRow(),
                    {'container': container, 'index': index},
                );
            }
            return new Six(createTestRow());
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
            expect(createTestSix().getCall()).toBe(Pricker.Call.Plain);
        });

        it('lets the call be set', () => {
            const six = createTestSix();
            six.setCall(Pricker.Call.Bob);
            expect(six.getCall()).toBe(Pricker.Call.Bob);
        });

        it('rotates between calls when toggled', () => {
            const six = createTestSix();

            six.toggleCall();
            expect(six.getCall()).toBe(Pricker.Call.Bob);

            six.toggleCall();
            expect(six.getCall()).toBe(Pricker.Call.Single);

            six.toggleCall();
            expect(six.getCall()).toBe(Pricker.Call.Plain);
        });

        it('returns the new call when toggled', () => {
            const six = createTestSix();
            expect(six.toggleCall()).toBe(Pricker.Call.Bob);
            expect(six.toggleCall()).toBe(Pricker.Call.Single);
            expect(six.toggleCall()).toBe(Pricker.Call.Plain);
        });

        it('can suppress updates when a call is set', () => {
            const six = createTestSix(),
                originalLast: Pricker.Row = six.getLast();

            six.setCall(Pricker.Call.Bob, false);
            expect(six.getLast()).toEqual(originalLast);
        });

        it('notifies the parent course when a call is set', () => {
            const parent = jasmine.createSpyObj('Course', ['notify']),
                six = createTestSix(parent);
            six.setCall(Pricker.Call.Plain);
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
            six.setCall(Pricker.Call.Plain, false);
            expect(parent.notify).not.toHaveBeenCalled();
        });

        it('passes itself to visitors', () => {
            const six = new Six(createTestRow('123')),
                visitor = jasmine.createSpyObj('AbstractVisitor', ['visit']);

            six.accept(visitor);
            expect(visitor.visit).toHaveBeenCalledTimes(6);
            for (let i = 0; i < 6; i += 1) {
                expect(visitor.visit.calls.argsFor(i)[1]).toBe(six);
            }
        });

        testAbstractBlockImplementation(
            Six,
            (six: Pricker.AbstractSix) => { six.toggleCall(); },
            6,
        );
    });
}
