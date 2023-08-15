/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import handleTouchEvents from './handleTouchEvents';

describe('handleTouchEvents polyfill', () => {
    /**
     * Element to use for testing
     */
    let element: HTMLDivElement;

    /**
     * Fixture `onclick` handler
     */
    const clickHandler = jest.fn();

    beforeEach(() => {
        element = document.createElement('div');
        element.onclick = clickHandler;

        handleTouchEvents(element);

        clickHandler.mockClear();
    });

    /**
     * Helper to click the element
     */
    const click = () => {
        const event = new MouseEvent('click');
        return element.dispatchEvent(event);
    };

    /**
     * Helper to touch the element
     */
    const touch = () => {
        const event = new TouchEvent('touchstart');
        return element.dispatchEvent(event);
    };

    it('adds an ontouchstart handler', () => {
        element = document.createElement('div');

        expect(element.ontouchstart).toBeNull();

        handleTouchEvents(element);

        expect(element.ontouchstart).not.toBeNull();
        expect(typeof element.ontouchstart).toBe('function');
    });

    it('allows the original click handler to be called on click', () => {
        click();
        expect(clickHandler).toHaveBeenCalled();
    });

    it('allows the original click handler to be called on touch', () => {
        touch();
        expect(clickHandler).toHaveBeenCalled();
    });

    it('prevents a second click after a touch', () => {
        touch();
        clickHandler.mockClear();

        click();

        expect(clickHandler).not.toHaveBeenCalled();
    });

    it('allows subsequent clicks', () => {
        touch();
        click();
        clickHandler.mockClear();

        click();

        expect(clickHandler).toHaveBeenCalled();
    });

    it('stops further processing on touch', () => {
        expect(touch()).toBe(false);
    });

    it('stops further processing for clicks after a touch', () => {
        touch();
        expect(click()).toBe(false);
    });

    it('works for a longer flow', () => {
        touch();
        expect(clickHandler).toHaveBeenCalledTimes(1);

        click();
        expect(clickHandler).toHaveBeenCalledTimes(1);

        touch();
        expect(clickHandler).toHaveBeenCalledTimes(2);

        click();
        expect(clickHandler).toHaveBeenCalledTimes(2);

        click();
        expect(clickHandler).toHaveBeenCalledTimes(3);
    });
});
