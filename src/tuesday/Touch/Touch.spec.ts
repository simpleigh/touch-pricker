/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Touch from '.';
import {
    testSerialContainerImplementation,
} from '../../blocks/SerialContainer.spec';
import { rowFromString, Stage } from '../../rows';

describe('Touch class', () => {

    testSerialContainerImplementation(
        (initialRow, _ownership) => new Touch(initialRow, _ownership),
        [
            rowFromString('', Stage.Maximus),
            rowFromString('2143658709TE', Stage.Maximus),
        ],
        [[Stage.Maximus, 11, 528]],
        11,
        528,
    );

});
