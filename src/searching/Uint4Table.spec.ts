/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { Stage } from '../rows';
import Uint4Table from './Uint4Table';
import testAbstractTableImplementation from './testAbstractTableImplementation';

describe('Uint4Table', () => {
    testAbstractTableImplementation(
        (data?: Uint8Array) => new Uint4Table(Stage.Minimus, data),
        [0, 15],
        // prettier-ignore
        [
            0x10, 0x32, 0x54, 0x76, 0x98, 0xba, 0xdc, 0xfe,
            0x21, 0x43, 0x65, 0x87,
        ],
        // prettier-ignore
        [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
            1, 2, 3, 4, 5, 6, 7, 8,
        ],
    );
});
