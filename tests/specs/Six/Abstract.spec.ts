function createSixTests(Six, testCaseFn) {

    let testCases = testCaseFn();

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
                    testCases[i][3]
                );
            }
        };
    }

    return function () {

        it('stores the previous six end', runTestCases(
            function (previous, expected, stage, call) {
                let six: Pricker.Six.AbstractSix = new Six(previous);
                expect(six.getPreviousSixEnd()).toEqual(previous);
            }
        ));

        it('starts life as a plain six', runTestCases(
            function (previous, expected, stage, call) {
                let six: Pricker.Six.AbstractSix = new Six(previous);
                expect(six.getCall()).toEqual(Pricker.Call.Plain);
            }
        ));

        it('lets the call be set', runTestCases(
            function (previous, expected, stage, call) {
                let six: Pricker.Six.AbstractSix = new Six(previous);
                six.setCall(call);
                expect(six.getCall()).toBe(call);
            }
        ));

        it('transposes the six end correctly', runTestCases(
            function (previous, expected, stage, call) {
                let six: Pricker.Six.AbstractSix = new Six(previous);
                six.setCall(call);
                expect(six.getSixEnd()).toEqual(expected);
            }
        ));

        it('rotates between calls when toggled', runTestCases(
            function (previous, expected, stage, call) {
                let six: Pricker.Six.AbstractSix = new Six(previous),
                    newCall: Pricker.Call;

                six.setCall(call);
                newCall = six.toggleCall();
                expect(six.getCall()).toBe(newCall);

                if (call === Pricker.Call.Plain) {
                    expect(newCall).toBe(Pricker.Call.Bob);
                } else if (call === Pricker.Call.Bob) {
                    expect(newCall).toBe(Pricker.Call.Single);
                } else {
                    expect(newCall).toBe(Pricker.Call.Plain);
                }
            }
        ));

        it('updates when the previous six end changes', runTestCases(
            function (previous, expected, stage, call) {
                let incorrectPrevious: Pricker.Row =
                        Pricker.rowFromString('', stage),
                    six: Pricker.Six.AbstractSix = new Six(incorrectPrevious);

                six.setCall(call);
                expect(six.getSixEnd()).not.toEqual(expected);

                six.setPreviousSixEnd(previous);
                expect(six.getSixEnd()).toEqual(expected);
            }
        ));

        it('updates when the call is toggled', runTestCases(
            function (previous, expected, stage, call) {
                let six: Pricker.Six.AbstractSix = new Six(previous);

                // Set the call to the one before the right one
                if (call === Pricker.Call.Plain) {
                    six.setCall(Pricker.Call.Single);
                } else if (call === Pricker.Call.Bob) {
                    six.setCall(Pricker.Call.Plain);
                } else {
                    six.setCall(Pricker.Call.Bob);
                }

                expect(six.getSixEnd()).not.toEqual(expected);

                six.toggleCall();
                expect(six.getSixEnd()).toEqual(expected);
            }
        ));

        it('ignores mutations of the returned previous six end', function () {
            let row: Pricker.Row = Pricker.rowFromString(
                    '231',
                    Pricker.Stage.Cinques
                ),
                six: Pricker.Six.AbstractSix = new Six(row),
                previousSixEndFixed = six.getPreviousSixEnd().slice(),
                previousSixEndChanged = six.getPreviousSixEnd();

            expect(six.getPreviousSixEnd()).toEqual(previousSixEndFixed);
            expect(six.getPreviousSixEnd()).toEqual(previousSixEndChanged);
            previousSixEndChanged[3] = 999;  // N.B. invalid row
            expect(six.getPreviousSixEnd()).toEqual(previousSixEndFixed);
            expect(six.getPreviousSixEnd()).not.toEqual(previousSixEndChanged);
        });

        it('ignores mutations of the returned six end', function () {
            let row: Pricker.Row = Pricker.rowFromString(
                    '231',
                    Pricker.Stage.Cinques
                ),
                six: Pricker.Six.AbstractSix = new Six(row),
                sixEndFixed = six.getSixEnd().slice(),
                sixEndChanged = six.getSixEnd();

            expect(six.getSixEnd()).toEqual(sixEndFixed);
            expect(six.getSixEnd()).toEqual(sixEndChanged);
            sixEndChanged[3] = 999;  // N.B. invalid row
            expect(six.getSixEnd()).toEqual(sixEndFixed);
            expect(six.getSixEnd()).not.toEqual(sixEndChanged);
        });

    };
}
