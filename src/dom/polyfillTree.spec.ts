/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import polyfillTree from './polyfillTree';
import handleTouchEvents from './elementPolyfills/handleTouchEvents';

jest.mock('./elementPolyfills/handleTouchEvents.ts');

describe('polyfillTree DOM utility', () => {
    beforeEach(() => {
        (handleTouchEvents as jest.Mock).mockClear();
    });

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

        expect(handleTouchEvents).toHaveBeenCalledWith(child);
    });

    it('processes multiple clickable children', () => {
        const parent = document.createElement('div');
        const child1 = addChild(parent);
        const child2 = addChild(parent);

        polyfillTree(parent);

        expect(handleTouchEvents).toHaveBeenCalledWith(child1);
        expect(handleTouchEvents).toHaveBeenCalledWith(child2);
    });

    it('ignores non-clickable children', () => {
        const parent = document.createElement('div');
        const child1 = addChild(parent);

        const child2 = document.createElement('div');
        parent.appendChild(child2);

        polyfillTree(parent);

        expect(handleTouchEvents).toHaveBeenCalledWith(child1);
        expect(handleTouchEvents).not.toHaveBeenCalledWith(child2);
    });
});
