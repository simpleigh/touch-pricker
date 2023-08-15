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

const toBePrintable: jest.CustomMatcher = function toBePrintable(actual: any) {
    const result: jest.CustomMatcherResult = {
        message: () => 'Expected object not to be printable',
        pass: false,
    };

    if (typeof actual !== 'object' || actual === null) {
        result.message = () => 'Expected an object';
        return result;
    }

    if (!actual.print) {
        result.message = () => 'Expected object to have a "print" property';
        return result;
    }

    if (typeof actual.print !== 'function') {
        result.message = () =>
            `Expected object "print" property to be ${this.utils.printExpected(
                'function',
            )} not ${this.utils.printReceived(typeof actual.print)}`;
        return result;
    }

    if (!actual.templates) {
        result.message = () => 'Expected object to have templates';
        return result;
    }

    if (typeof actual.templates !== 'object') {
        result.message = () => 'Expected object to have templates object';
        return result;
    }

    for (const name in actual.templates) {
        if (typeof actual.templates[name] !== 'function') {
            result.message = () =>
                `Expected "${name}" template to be ${this.utils.printExpected(
                    'function',
                )} not ${this.utils.printReceived(
                    typeof actual.templates[name],
                )}`;
            return result;
        }
    }

    result.pass = true;
    return result;
};

export default toBePrintable;
