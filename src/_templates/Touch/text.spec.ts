/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import SixType from '../../SixType';
import Touch from '../../Touch';

describe('text template for Touch', () => {

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

        touch.getStart()
            .setRowIndex(2)
            .setSixType(SixType.Quick);

        const expected = text + touch.getStart().print('text') + '\n';
        expect(touch.print('text')).toBe(expected);
    });

});
