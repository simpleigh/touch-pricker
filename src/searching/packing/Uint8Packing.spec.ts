/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import Uint8Packing from './Uint8Packing';
import testPackingImplementation from './testPackingImplementation';

describe('Uint8Packing algorithm', () => {
    testPackingImplementation(
        () => new Uint8Packing(),
        255,
        // prettier-ignore
        [
            0x00,
            0x00, 0x01, 0x02, 0x03,
            0xfc, 0xfd, 0xfe, 0xff,
        ],
        // prettier-ignore
        [
            0,
            1, 2, 3, 4,
            253, 254, 255, 256,
        ],
    );
});
