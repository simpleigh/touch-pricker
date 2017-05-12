/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

describe('text template for Touch', function () {

    it('renders a touch correctly', function () {
        const text: string = '2314567890E\n'
                + '2314568790E  1 s10 s13 s15 22\n'
                + '2314567890E  1 s10 s13 s15 22\n',
            touch: Pricker.Touch = Pricker.Touch.fromString(text);

        expect(touch.print('text')).toBe(text);
    });

});
