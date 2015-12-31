function createSixTests(Six, testCaseFn) {

    var testCases = testCaseFn();

    function runTestCases(testFunction) {
        return function () {
            var i;

            for (i = 0; i < testCases.length; i += 1) {
                testFunction(
                    // Previous six end
                    Pricker.rowFromString(testCases[i][0], testCases[i][2]),
                    // Expected six end
                    Pricker.rowFromString(testCases[i][1], testCases[i][2]),
                    // Stage
                    testCases[i][2],
                    // Call
                    testCases[i][3]
                );
            }
        };
    }

    return function () {

        it('rotates between calls when toggled', runTestCases(
            function (previous, expected, stage, call) {
                var six = new Six(previous, call),
                    newCall = six.toggleCall(),
                    expectedCall;

                if (call === Pricker.Call.Plain) {
                    expectedCall = Pricker.Call.Bob;
                } else if (call === Pricker.Call.Bob) {
                    expectedCall = Pricker.Call.Single;
                } else {
                    expectedCall = Pricker.Call.Plain;
                }

                expect(newCall).toBe(expectedCall);
                expect(six.getCall()).toBe(expectedCall);
            }
        ));

        it('transposes the six end correctly', runTestCases(
            function (previous, expected, stage, call) {
                var six = new Six(previous, call);
                expect(six.getSixEnd()).toEqual(expected);
            }
        ));

        it('defaults the call to "Plain"', runTestCases(
            function (previous, expected, stage, call) {
                if (call === Pricker.Call.Plain) {
                    var six = new Six(previous);
                    expect(six.getCall()).toBe(Pricker.Call.Plain);
                    expect(six.getSixEnd()).toEqual(expected);
                }
            }
        ));

        it('allows access to the previous six end', runTestCases(
            function (previous, expected, stage, call) {
                var six = new Six(previous, call);
                expect(six.getPreviousSixEnd()).toEqual(previous);
            }
        ));

        it('allows access to the call', runTestCases(
            function (previous, expected, stage, call) {
                var six = new Six(previous, call);
                expect(six.getCall()).toBe(call);
            }
        ));

        it('updates when the previous six end changes', runTestCases(
            function (previous, expected, stage, call) {
                var incorrectRow = Pricker.rowFromString('', stage),
                    six = new Six(incorrectRow, call);
                expect(six.getSixEnd()).not.toEqual(expected);
                six.setPreviousSixEnd(previous);
                expect(six.getPreviousSixEnd()).toEqual(previous);
                expect(six.getSixEnd()).toEqual(expected);
            }
        ));

        it('updates when the call changes', runTestCases(
            function (previous, expected, stage, call) {
                var incorrectCall,
                    C = Pricker.Call,
                    six;
                incorrectCall = (call === C.Plain ? C.Bob : C.Plain);
                six = new Six(previous, incorrectCall);
                expect(six.getSixEnd()).not.toEqual(expected);
                six.setCall(call);
                expect(six.getSixEnd()).toEqual(expected);
            }
        ));

        it('ignores mutations of the returned previous six end', function () {
            var row = Pricker.rowFromString('231', Pricker.Stage.Cinques),
                six = new Six(row),
                previousSixEndFixed = six.getPreviousSixEnd().slice(),
                previousSixEndChanged = six.getPreviousSixEnd();

            expect(six.getPreviousSixEnd()).toEqual(previousSixEndFixed);
            expect(six.getPreviousSixEnd()).toEqual(previousSixEndChanged);
            previousSixEndChanged[3] = 'X';  // N.B. invalid row
            expect(six.getPreviousSixEnd()).toEqual(previousSixEndFixed);
            expect(six.getPreviousSixEnd()).not.toEqual(previousSixEndChanged);
        });

        it('ignores mutations of the returned six end', function () {
            var row = Pricker.rowFromString('231', Pricker.Stage.Cinques),
                six = new Six(row),
                sixEndFixed = six.getSixEnd().slice(),
                sixEndChanged = six.getSixEnd();

            expect(six.getSixEnd()).toEqual(sixEndFixed);
            expect(six.getSixEnd()).toEqual(sixEndChanged);
            sixEndChanged[3] = 'X';  // N.B. invalid row
            expect(six.getSixEnd()).toEqual(sixEndFixed);
            expect(six.getSixEnd()).not.toEqual(sixEndChanged);
        });

    };
}
