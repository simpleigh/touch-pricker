/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import type Pricker from './Pricker';

/**
 * A `window` with an attached pricker
 */
interface PrickerWindow extends Window {
    pricker?: Pricker;
}

export default PrickerWindow;
