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
@typescript-eslint/no-unsafe-member-access,
*/

import toBePrintable from './toBePrintable';

const toHaveTemplate: jest.CustomMatcher = function toHaveTemplate(
    actual: any,
    expected: string,
) {
    const result: jest.CustomMatcherResult = {
        message: () =>
            `Expected object not to have ${this.utils.printReceived(
                expected,
            )} template`,
        pass: false,
    };

    const print = toBePrintable.call(this, actual) as jest.CustomMatcherResult;
    const { message, pass } = print;
    if (!pass) {
        result.message = () => `Expected printable object\n${message()}`;
        return result;
    }

    if (!actual.templates[expected]) {
        result.message = () =>
            `Expected object to have ${this.utils.printExpected(
                expected,
            )} template`;
        return result;
    }

    result.pass = true;
    return result;
};

export default toHaveTemplate;
