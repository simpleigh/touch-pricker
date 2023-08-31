/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import Uint4Packing from './Uint4Packing';
import testPackingImplementation from './testPackingImplementation';

describe('Uint4Packing algorithm', () => {
    testPackingImplementation(
        () => new Uint4Packing(),
        15,
        // prettier-ignore
        [
            0x10, 0x32, 0x54, 0x76, 0x98, 0xba, 0xdc, 0xfe,
            0x21, 0x43, 0x65, 0x87, 0xa9, 0xcb, 0xed, 0x0f,
        ],
        // prettier-ignore
        [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0,
        ],
    );
});
