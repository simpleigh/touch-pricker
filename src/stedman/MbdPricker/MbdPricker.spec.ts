/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import testAbstractPrickerImplementation from '../../testAbstractPrickerImplementation';
import MbdPricker from '.';

describe('Stedman Mbd Pricker class', () => {
    testAbstractPrickerImplementation(MbdPricker);
});
