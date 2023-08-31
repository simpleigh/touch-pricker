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
        16,
        [0x00, 0x12, 0x34, 0x56, 0x78, 0x9a, 0xbc, 0xde, 0xf0],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1],
    );
});
