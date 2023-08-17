/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { rounds, Stage, Stedman } from '../../src';

describe('toHaveTemplate matcher', () => {
    it('fails for items that are not printable', () => {
        expect('string').not.toHaveTemplate('template');
    });

    it('fails for objects without the expected template', () => {
        const course = new Stedman.Course(rounds(Stage.Cinques));
        expect(course).not.toHaveTemplate('other');
    });

    it('passes where the template is present', () => {
        const course = new Stedman.Course(rounds(Stage.Cinques));
        expect(course).toHaveTemplate('text');
    });
});
