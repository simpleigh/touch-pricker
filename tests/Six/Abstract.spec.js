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
        it('transposes the six end correctly', runTestCases(
            function (previous, expected, stage, call) {
                var six = new Six(previous, call);
                expect(six.getSixEnd()).toEqual(expected);
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
    };
}
