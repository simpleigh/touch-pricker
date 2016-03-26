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

        it('starts life as a plain six', runTestCases(
            function (previous, expected, stage, call) {
                let six: Pricker.AbstractSix = new Six(previous);
                expect(six.getCall()).toBe(Pricker.Call.Plain);
            }
        ));

        it('lets the call be set', runTestCases(
            function (previous, expected, stage, call) {
                let six: Pricker.AbstractSix = new Six(previous);
                six.setCall(call);
                expect(six.getCall()).toBe(call);
            }
        ));

        it('transposes the six end correctly', runTestCases(
            function (previous, expected, stage, call) {
                let six: Pricker.AbstractSix = new Six(previous);
                six.setCall(call);
                expect(six.getEnd()).toEqual(expected);
            }
        ));

        it('rotates between calls when toggled', runTestCases(
            function (previous, expected, stage, call) {
                let six: Pricker.AbstractSix = new Six(previous),
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
                    six: Pricker.AbstractSix = new Six(incorrectPrevious);

                six.setCall(call);
                expect(six.getEnd()).not.toEqual(expected);

                six.setInitialRow(previous);
                expect(six.getEnd()).toEqual(expected);
            }
        ));

        it('updates when the call is toggled', runTestCases(
            function (previous, expected, stage, call) {
                let six: Pricker.AbstractSix = new Six(previous);

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
            }
        ));

        it('notifies the parent course when a call is set', function () {
            let row: Pricker.Row =
                    Pricker.rowFromString('231', Pricker.Stage.Cinques),
                parent = jasmine.createSpyObj('Course', ['notify']),
                six: Pricker.AbstractSix = new Six(row, parent, 8);

            six.setCall(Pricker.Call.Plain);
            expect(parent.notify).toHaveBeenCalledWith(8);
        });

        it('notifies the parent course when toggled', function () {
            let row: Pricker.Row =
                    Pricker.rowFromString('231', Pricker.Stage.Cinques),
                parent = jasmine.createSpyObj('Course', ['notify']),
                six: Pricker.AbstractSix = new Six(row, parent, 999);

            six.toggleCall();
            expect(parent.notify).toHaveBeenCalledWith(999);
        });

        testAbstractBlockImplementation(Six);
    };
}
