/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Touch from '.';
import { rowFromString, Stage } from '../../rows';

describe('html template for Touch', () => {

    it('renders a touch correctly', () => {
        const initialRow = rowFromString('', Stage.Maximus);
        const touch = new Touch(initialRow);
        touch.setLength(3);

        expect(touch.print('html')).toBe(''
                + '<u>1234567890ET</u><br />'
                + touch.getBlock(1).print('html')
                + touch.getBlock(2).print('html')
                + touch.getBlock(3).print('html', { underline: true }),
        );
    });

});
