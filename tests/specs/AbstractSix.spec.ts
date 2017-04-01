/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractBlock.spec.ts" />

// tslint:disable-next-line:variable-name
function testSixImplementation(Six, testCases, rowTests) {

    function runTestCases(testFunction) {
        return function () {
            let i: number;

            for (i = 0; i < testCases.length; i += 1) {
                testFunction(
                    // Previous six end
                    Pricker.rowFromString(testCases[i][0], testCases[i][2]),
                    // Expected six end
                    Pricker.rowFromString(testCases[i][1], testCases[i][2]),
                    // Stage
                    testCases[i][2],
                    // Call
                    testCases[i][3],
                );
            }
        };
    }

    it('transposes the six end correctly', runTestCases(
        function (previous, expected, stage, call) {
            const six: Pricker.AbstractSix = new Six(previous);
            six.setCall(call);
            expect(six.getEnd()).toEqual(expected);
        },
    ));

    it('updates when the previous six end changes', runTestCases(
        function (previous, expected, stage, call) {
            const incorrectPrevious: Pricker.Row =
                    Pricker.rowFromString('', stage),
                six: Pricker.AbstractSix = new Six(incorrectPrevious);

            six.setCall(call);
            expect(six.getEnd()).not.toEqual(expected);

            six.setInitialRow(previous);
            expect(six.getEnd()).toEqual(expected);
        },
    ));

    it('updates when the call is toggled', runTestCases(
        function (previous, expected, stage, call) {
            const six: Pricker.AbstractSix = new Six(previous);

            // Set the call to the one before the right one
            if (call === Pricker.Call.Plain) {
                six.setCall(Pricker.Call.Single);
            } else if (call === Pricker.Call.Bob) {
                six.setCall(Pricker.Call.Plain);
            } else {
                six.setCall(Pricker.Call.Bob);
            }

            expect(six.getEnd()).not.toEqual(expected);

            six.toggleCall();
            expect(six.getEnd()).toEqual(expected);
        },
    ));

    it('generates the correct end row when visited', runTestCases(
        function (previous, expected, stage, call) {
            const six: Pricker.AbstractSix = new Six(previous),
                visitor: Pricker.Visitor.StringArray =
                    new Pricker.Visitor.StringArray();
            let strings: string[];

            six.setCall(call);
            six.accept(visitor);
            strings = visitor.getStrings();

            expect(strings[5]).toEqual(Pricker.stringFromRow(expected));
        },
    ));

    it('generates the correct rows when visited', function () {
        let i: number,
            initialRow: Pricker.Row,
            six: Pricker.AbstractSix,
            visitor: Pricker.Visitor.StringArray,
            strings: string[];

        for (i = 0; i < rowTests.length; i++) {
            initialRow = Pricker.rowFromString('', rowTests[i][6]);
            rowTests[i].pop();  // Remove stage
            six = new Six(initialRow);
            visitor = new Pricker.Visitor.StringArray();

            six.accept(visitor);
            strings = visitor.getStrings();

            expect(strings).toEqual(rowTests[i]);
        }
    });

    describe('is derived from AbstractSix and', function () {

        function createTestRow(): Pricker.Row {
            return Pricker.rowFromString('231', Pricker.Stage.Cinques);
        }

        function createTestSix(
            container: Pricker.AbstractBlock = null,
            index: number = 999,
        ): Pricker.AbstractSix {
            return new Six(createTestRow(), container, index);
        }

        it('starts life as a plain six', function () {
            expect(createTestSix().getCall()).toBe(Pricker.Call.Plain);
        });

        it('lets the call be set', function () {
            const six: Pricker.AbstractSix = createTestSix();
            six.setCall(Pricker.Call.Bob);
            expect(six.getCall()).toBe(Pricker.Call.Bob);
        });

        it('rotates between calls when toggled', function () {
            const six: Pricker.AbstractSix = createTestSix();

            six.toggleCall();
            expect(six.getCall()).toBe(Pricker.Call.Bob);

            six.toggleCall();
            expect(six.getCall()).toBe(Pricker.Call.Single);

            six.toggleCall();
            expect(six.getCall()).toBe(Pricker.Call.Plain);
        });

        it('returns the new call when toggled', function () {
            const six: Pricker.AbstractSix = createTestSix();
            expect(six.toggleCall()).toBe(Pricker.Call.Bob);
            expect(six.toggleCall()).toBe(Pricker.Call.Single);
            expect(six.toggleCall()).toBe(Pricker.Call.Plain);
        });

        it('can suppress updates when a call is set', function () {
            const six: Pricker.AbstractSix = createTestSix(),
                originalEnd: Pricker.Row = six.getEnd();

            six.setCall(Pricker.Call.Bob, false);
            expect(six.getEnd()).toEqual(originalEnd);
        });

        it('notifies the parent course when a call is set', function () {
            const parent = jasmine.createSpyObj('Course', ['notify']),
                six: Pricker.AbstractSix = createTestSix(parent);
            six.setCall(Pricker.Call.Plain);
            expect(parent.notify).toHaveBeenCalledWith(999);
        });

        it('notifies the parent course when toggled', function () {
            const parent = jasmine.createSpyObj('Course', ['notify']),
                six: Pricker.AbstractSix = createTestSix(parent);
            six.toggleCall();
            expect(parent.notify).toHaveBeenCalledWith(999);
        });

        it('can suppress notification when a call is set', function () {
            const parent = jasmine.createSpyObj('Course', ['notify']),
                six: Pricker.AbstractSix = createTestSix(parent);
            six.setCall(Pricker.Call.Plain, false);
            expect(parent.notify).not.toHaveBeenCalledWith(999);
        });

        it('can be attached to a new parent course', function () {
            const parentOld = jasmine.createSpyObj('Course', ['notify']),
                parentNew = jasmine.createSpyObj('Course', ['notify']),
                six: Pricker.AbstractSix = createTestSix(parentOld);

            six.setOwnership(parentNew, 998);
            six.toggleCall();
            expect(parentNew.notify).toHaveBeenCalledWith(998);
            expect(parentOld.notify).not.toHaveBeenCalled();
        });

        it('can have its parent course cleared', function () {
            const parent = jasmine.createSpyObj('Course', ['notify']),
                six: Pricker.AbstractSix = createTestSix(parent);

            six.clearOwnership();
            expect(parent.notify).not.toHaveBeenCalled();
        });

        testAbstractBlockImplementation(Six);
    });
}
