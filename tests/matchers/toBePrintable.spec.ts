/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { rounds, Stage, Stedman } from '../../src';

describe('toBePrintable matcher', () => {
    it('fails for items that are not objects', () => {
        expect('string').not.toBePrintable();
    });

    it('fails for objects without a print property', () => {
        const actual = { templates: {} };
        expect(actual).not.toBePrintable();
    });

    it('fails for objects where print is not callable', () => {
        const actual = {
            print: 'string',
            templates: {},
        };
        expect(actual).not.toBePrintable();
    });

    it('fails for objects without a templates property', () => {
        const actual = { print: () => '' };
        expect(actual).not.toBePrintable();
    });

    it('fails for objects where templates is not an object', () => {
        const actual = {
            print: () => '',
            templates: 'string',
        };
        expect(actual).not.toBePrintable();
    });

    it('fails for objects where a template is not a function', () => {
        const actual = {
            print: () => '',
            templates: { template: 'string' },
        };
        expect(actual).not.toBePrintable();
    });

    it('passes for printable objects', () => {
        const course = new Stedman.Course(rounds(Stage.Cinques));
        expect(course).toBePrintable();
    });
});
