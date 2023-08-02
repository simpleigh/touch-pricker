/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { rounds, Stage, Stedman } from '../../src';
import toHaveTemplate from './toHaveTemplate';

describe('toHaveTemplate matcher', () => {
    const compare = toHaveTemplate({ } as jasmine.MatchersUtil).compare;

    it('fails for items that are not printable', () => {
        expect(compare('string', 'template').pass).toBe(false);
    });

    it('fails for objects without the expected template', () => {
        const course = new Stedman.Course(rounds(Stage.Cinques));
        expect(compare(course, 'other').pass).toBe(false);
    });

    it('passes where the template is present', () => {
        const course = new Stedman.Course(rounds(Stage.Cinques));
        expect(compare(course, 'text').pass).toBe(true);
    });
});
