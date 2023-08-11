/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

describe('toRenderAs matcher', () => {
    it('fails for items that are not a string', () => {
        expect(null).not.toRenderAs('string');
    });

    it('knows when simple strings are the same', () => {
        expect('string').toRenderAs('string');
    });

    it('knows when simple strings differ', () => {
        expect('string1').not.toRenderAs('string2');
    });

    it('ignores a single newline in the expected string', () => {
        expect('string').toRenderAs('string\n');
    });

    it('ignores multiple newlines in the expected string', () => {
        expect('string').toRenderAs('\nstring\n');
    });

    it('ignores newlines in a template literal', () => {
        expect('string').toRenderAs(
            `
string
`
        );
    });

    it('ignores indented text in a template literal', () => {
        expect('string').toRenderAs(`
            string
        `);
    });

    it('allows a single newline to be explicitly matched', () => {
        expect('str\ning').toRenderAs('str\\ning');
    });

    it('allows multiple newlines to be explicitly matched', () => {
        expect('str\ning\n').toRenderAs('str\\ning\\n');
    });
});
