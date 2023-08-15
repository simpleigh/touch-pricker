/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

/*
eslint-disable
@typescript-eslint/no-explicit-any,
@typescript-eslint/no-invalid-this,
*/

/**
 * Custom matcher that compares text ignoring newlines
 *
 * doT.js strips newlines but these are useful for readability when testing.
 * This matcher strips newlines from the expected string in order to allow them
 * to be used in tests. It also ignores indents (spaces following a newline).
 * In order to explicitly match a newline escape this as `\\n`.
 */
const toRenderAs: jest.CustomMatcher = function toRenderAs(
    actual: any,
    expected: string,
) {
    const result: jest.CustomMatcherResult = {
        message: () => '',
        pass: false,
    };

    if (typeof actual !== 'string') {
        result.message = () =>
            `Expected ${this.utils.printExpected(
                'string',
            )} not ${this.utils.printReceived(typeof actual)}`;
        return result;
    }

    expected = expected.replace(/\n */gu, '').replace(/\\n/gu, '\n');

    result.pass = actual === expected;
    result.message = () =>
        `Expected ${this.utils.printReceived(actual)}${
            result.pass ? ' not' : ''
        } to render as ${this.utils.printExpected(expected)}.`;
    return result;
};

export default toRenderAs;
