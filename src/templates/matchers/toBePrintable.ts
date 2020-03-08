/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

const toBePrintable: jasmine.CustomMatcherFactory = () => ({
    compare: (actual: any) => {
        const result: jasmine.CustomMatcherResult = { pass: false };

        if (typeof actual !== 'object') {
            result.message = 'Expected an object';
            return result;
        }

        if (!actual.print) {
            result.message = 'Expected object to have a print property';
            return result;
        }

        if (typeof actual.print !== 'function') {
            result.message = 'Expect object print property to be a function';
            return result;
        }

        if (!actual.templates) {
            result.message = 'Expected object to have templates';
            return result;
        }

        if (typeof actual.templates !== 'object') {
            result.message = 'Expected object to have templates';
            return result;
        }

        for (const name in actual.templates) {
            if (typeof actual.templates[name] !== 'function') {
                result.message = `Expected ${name} template to be a function`;
                return result;
            }
        }

        return {
            message: 'Expected object not to be printable',
            pass: true,
        };
    },
});

export default toBePrintable;
