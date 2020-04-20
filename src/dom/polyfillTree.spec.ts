/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import {
    testPassedToHandleTouchEvents,
} from './elementPolyfills/handleTouchEvents.spec';
import polyfillTree from './polyfillTree';

describe('polyfillTree DOM utility', () => {

    /**
     * Helper to create and append a child element
     */
    const addChild = (parent: HTMLElement): HTMLElement => {
        const child = document.createElement('div');
        child.setAttribute('onclick', 'test()');
        parent.appendChild(child);
        return child;
    };

    it('passes a clickable element to handleTouchEvents()', () => {
        const parent = document.createElement('div');
        const child = addChild(parent);

        polyfillTree(parent);

        testPassedToHandleTouchEvents(child);
    });

    it('processes multiple clickable children', () => {
        const parent = document.createElement('div');
        const child1 = addChild(parent);
        const child2 = addChild(parent);

        polyfillTree(parent);

        testPassedToHandleTouchEvents(child1);
        testPassedToHandleTouchEvents(child2);
    });

    it('ignores non-clickable children', () => {
        const parent = document.createElement('div');
        const child1 = addChild(parent);

        const child2 = document.createElement('div');
        parent.appendChild(child2);

        polyfillTree(parent);

        testPassedToHandleTouchEvents(child1);
        testPassedToHandleTouchEvents(child2, true);
    });

});
