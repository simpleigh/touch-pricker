import Call from '../Call';
import Row from '../Row';
import rowFromString from '../rowFromString';
import Stage from '../Stage';

type testFn = (previous: Row, expected: Row, stage: Stage, call: Call) => void;

export const createSixTests = (
    // tslint:disable-next-line:variable-name
    Six: any,
    testCases: Array<[string, string, Stage, Call]>,
) => {
    const runTestCases = (testFunction: testFn) => {
        return () => {
            for (const testCase of testCases) {
                testFunction(
                    // Previous six end
                    rowFromString(testCase[0], testCase[2]),
                    // Expected six end
                    rowFromString(testCase[1], testCase[2]),
                    // Stage
                    testCase[2],
                    // Call
                    testCase[3],
                );
            }
        };
    };

    return () => {
        it('transposes the six end correctly', runTestCases(
            (previous, expected, stage, call) => {
                const six = new Six(previous, call);
                expect(six.getSixEnd()).toEqual(expected);
            },
        ));

        it('allows access to the call', runTestCases(
            (previous, expected, stage, call) => {
                const six = new Six(previous, call);
                expect(six.getCall()).toBe(call);
            },
        ));

        it('updates when the previous six end changes', runTestCases(
            (previous, expected, stage, call) => {
                const incorrectRow = rowFromString('', stage);
                const six = new Six(incorrectRow, call);
                expect(six.getSixEnd()).not.toEqual(expected);
                six.setPreviousSixEnd(previous);
                expect(six.getSixEnd()).toEqual(expected);
            },
        ));

        it('updates when the call changes', runTestCases(
            (previous, expected, stage, call) => {
                const incorrectCall =
                    (call === Call.Plain ? Call.Bob : Call.Plain);
                const six = new Six(previous, incorrectCall);
                expect(six.getSixEnd()).not.toEqual(expected);
                six.setCall(call);
                expect(six.getSixEnd()).toEqual(expected);
            },
        ));
    };
};
