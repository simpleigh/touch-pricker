/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import Parser from '../Parser';

describe('text template for Grandsire Touch', () => {
    it('renders a touch correctly', () => {
        const text =
            '12345\n' +
            '13425  s2 3 s4  (4 leads)\n' +
            '14235  s2 3 s4  (4 leads)\n' +
            '12345  s2 3 s4  (4 leads)\n';
        const touch = new Parser().parseTouch(text);
        expect(touch.print('text')).toBe(text);
    });
});
