/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import toRenderAs from './toRenderAs';

describe('toRenderAs matcher', () => {
    const compare = toRenderAs(jasmine.matchersUtil, [ ]).compare;

    it('knows when simple strings are the same', () => {
        expect(compare('string', 'string').pass).toBe(true);
    });

    it('knows when simple strings differ', () => {
        expect(compare('string1', 'string2').pass).toBe(false);
    });

    it('ignores a single newline in the expected string', () => {
        expect(compare('string', 'string\n').pass).toBe(true);
    });

    it('ignores multiple newlines in the expected string', () => {
        expect(compare('string', '\nstring\n').pass).toBe(true);
    });

    it('ignores newlines in a template literal', () => {
        expect(compare('string', `
string
`
        ).pass).toBe(true);
    });

    it('ignores indented text in a template literal', () => {
        expect(compare('string', `
            string
        `).pass).toBe(true);
    });

    it('allows a single newline to be explicitly matched', () => {
        expect(compare('str\ning', 'str\\ning').pass).toBe(true);
    });

    it('allows multiple newlines to be explicitly matched', () => {
        expect(compare('str\ning\n', 'str\\ning\\n').pass).toBe(true);
    });
});
