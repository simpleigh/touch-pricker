/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import Uint6Packing from './Uint6Packing';
import testPackingImplementation from './testPackingImplementation';

describe('Uint6Packing algorithm', () => {
    testPackingImplementation(
        () => new Uint6Packing(),
        63,
        // prettier-ignore
        [
            0x00, 0x00, 0x00,
            0xff, 0xff, 0xff,

            0x3f, 0x00, 0x00,
            0x00, 0x3f, 0x00,
            0x00, 0x00, 0x3f,
            0xc0, 0xc0, 0xc0,

            0xa1, 0x21, 0x61,
            0x5e, 0xde, 0x9e,
        ],
        // prettier-ignore
        [
            0, 0, 0, 0,
            63, 63, 63, 63,

            63, 0, 0, 0,
            0, 63, 0, 0,
            0, 0, 63, 0,
            0, 0, 0, 63,

            33, 33, 33, 33,
            30, 30, 30, 30,
        ],
    );
});
