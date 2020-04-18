/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

/**
 * Custom matcher that compares text ignoring newlines
 *
 * doT.js strips newlines but these are useful for readability when testing.
 * This matcher strips newlines from the expected string in order to allow them
 * to be used in tests. It also ignores indents (spaces following a newline).
 * In order to explicitly match a newline escape this as `\\n`.
 */
const toRenderAs: jasmine.CustomMatcherFactory = (util) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    compare: (actual: any, expected: string) => {
        const result: jasmine.CustomMatcherResult = { pass: false };

        if (typeof actual !== 'string') {
            result.message = 'Expected a string';
            return result;
        }

        expected = expected
            .replace(/\n */g, '')
            .replace(/\\n/g, '\n');

        result.pass = actual === expected;
        result.message = util.buildFailureMessage(
            'toRenderAs',
            result.pass,
            actual,
            expected
        );

        return result;
    },
});

export default toRenderAs;
