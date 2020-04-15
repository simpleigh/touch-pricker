
/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import * as Templates from './templates';

/**
 * Represents a pricker
 */
interface Pricker extends Templates.Interface {

    /* Pricker methods ********************************************************/

    /**
     * Event handler for window.onload
     */
    onLoad: () => void;

}

export default Pricker;
