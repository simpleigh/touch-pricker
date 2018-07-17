/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import toBePrintable from './toBePrintable';

const toHaveTemplate: jasmine.CustomMatcherFactory =
    (util, customEqualityTesters) => ({
        compare: (actual: any, expected: string) => {
            const result: jasmine.CustomMatcherResult = { pass: false };

            const { compare } = toBePrintable(util, customEqualityTesters);
            const { message, pass } = compare(actual);
            if (!pass) {
                result.message = `Expected printable object\n${message}`;
                return result;
            }

            if (!actual.templates[expected]) {
                result.message = `Expected object to have ${expected} template`;
                return result;
            }

            return {
                message: `Expected object not to have ${expected} template`,
                pass: true,
            };
        },
    });

export default toHaveTemplate;
