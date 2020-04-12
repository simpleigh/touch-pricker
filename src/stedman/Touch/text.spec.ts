/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import Touch from '.';
import SixType from '../SixType';

describe('text template for Stedman Touch', () => {

    it('renders a touch correctly', () => {
        const text = '2314567890E\n'
            + '2314568790E  1 s10 s13 s15 22\n'
            + '2314567890E  1 s10 s13 s15 22\n';
        const touch = Touch.fromString(text);
        expect(touch.print('text')).toBe(text);
    });

    it('includes the start when rendering a touch', () => {
        const text = '3124567890E\n'
            + '3124568790E  1 s10 s13 s15 22\n'
            + '3124567890E  1 s10 s13 s15 22\n';
        const touch = Touch.fromString(text);

        touch.start.sixType = SixType.Quick;
        touch.start.rowIndex = 2;

        const expected = text + touch.start.print('text') + '\n';
        expect(touch.print('text')).toBe(expected);
    });

});
