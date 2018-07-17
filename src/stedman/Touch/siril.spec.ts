/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Touch from '.';

describe('siril template for Touch', () => {

    it('renders', () => {
        const text = '2314567890E\n'
            + '2314568790E  1 s10 s13 s15 22\n'
            + '2314567890E  1 s10 s13 s15 22\n';
        const touch = Touch.fromString(text);
        expect(touch.print('siril').length).toBeGreaterThanOrEqual(1);
    });

});
