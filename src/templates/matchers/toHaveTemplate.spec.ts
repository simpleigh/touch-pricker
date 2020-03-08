/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import * as Templates from '..';
import toHaveTemplate from './toHaveTemplate';

describe('toHaveTemplate matcher', () => {
    const compare = toHaveTemplate(jasmine.matchersUtil, [ ]).compare;

    @Templates.makePrintable({ template: () => '' })
    class Printable implements Templates.Interface {
        public print: Templates.Print;
    }

    const printable = new Printable();

    it('fails for items that are not printable', () => {
        expect(compare('string', 'template').pass).toBe(false);
    });

    it('fails for objects without the expected template', () => {
        expect(compare(printable, 'other').pass).toBe(false);
    });

    it('passes where the template is present', () => {
        expect(compare(printable, 'template').pass).toBe(true);
    });
});
