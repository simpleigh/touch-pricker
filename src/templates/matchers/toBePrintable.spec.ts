/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import * as Templates from '..';
import toBePrintable from './toBePrintable';

describe('toBePrintable matcher', () => {
    const compare = toBePrintable(jasmine.matchersUtil, [ ]).compare;

    it('fails for items that are not objects', () => {
        expect(compare('string').pass).toBe(false);
    });

    it('fails for objects without a print property', () => {
        const actual = { templates: { } };
        expect(compare(actual).pass).toBe(false);
    });

    it('fails for objects where print is not callable', () => {
        const actual = {
            print: 'string',
            templates: { },
        };
        expect(compare(actual).pass).toBe(false);
    });

    it('fails for objects without a templates property', () => {
        const actual = { print: () => '' };
        expect(compare(actual).pass).toBe(false);
    });

    it('fails for objects where templates is not an object', () => {
        const actual = {
            print: () => '',
            templates: 'string',
        };
        expect(compare(actual).pass).toBe(false);
    });

    it('fails for objects where a template is not a function', () => {
        const actual = {
            print: () => '',
            templates: { template: 'string' },
        };
        expect(compare(actual).pass).toBe(false);
    });

    it('passes for printable objects', () => {
        @Templates.makePrintable({ })
        class Printable implements Templates.Interface {
            public print: Templates.Print;
        }

        const printable = new Printable();
        expect(compare(printable).pass).toBe(true);
    });
});
