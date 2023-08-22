/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { handleTouchEvents } from './elementPolyfills';

/**
 * Updates a tree of DOM nodes by applying a series of polyfills
 * @param parent  root of tree
 */
const polyfillTree = (parent: ParentNode): void => {
    for (const node of parent.querySelectorAll('[onclick]')) {
        handleTouchEvents(node as HTMLElement);
    }
};

export default polyfillTree;
