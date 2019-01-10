/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import MbdPricker from '.';
import {
    testAbstractPrickerImplementation,
} from '../../AbstractPricker.spec';

describe('Mbd Pricker class', () => {

    testAbstractPrickerImplementation(MbdPricker);

});
