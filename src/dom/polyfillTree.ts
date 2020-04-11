/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { handleTouchEvents } from './elementPolyfills';

/**
 * Updates a tree of DOM nodes by applying a series of polyfills
 * @param parent  root of tree
 */
const polyfillTree = (parent: ParentNode): void => {
    const nodes = parent.querySelectorAll('[onclick]');

    // tslint:disable-next-line prefer-for-of
    for (let i = 0; i < nodes.length; i += 1) {
        handleTouchEvents(nodes[i] as HTMLElement);
    }
};

export default polyfillTree;
