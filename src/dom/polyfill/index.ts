/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import onclick from './onclick';

/**
 * Updates a tree of DOM nodes by applying a series of polyfills
 * @param parent - root of tree
 */
const polyfill = (parent: ParentNode): void => {
    parent.querySelectorAll('[onclick]').forEach(onclick);
};

export default polyfill;
