/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import handleTouchEvents from './handleTouchEvents';

/**
 * Type of an `onclick` handler
 */
type onclick = (this: GlobalEventHandlers, ev: MouseEvent) => any;

/**
 * Helper to test that this polyfill has been called for an element
 * Used for testing functions that call this polyfill
 * TODO: if migrating to `jest` then replace with module mocking
 * @param element  element to test
 * @param reverse   reverse sense of tests
 */
export const testPassedToHandleTouchEvents = (
    element: HTMLElement,
    reverse: boolean = false,
): void => {
    if (reverse) {
        expect(element.ontouchstart).toBeNull();
    } else {
        expect(element.ontouchstart).not.toBeNull();
    }

    const clickHandler: jasmine.Spy<onclick> = jasmine.createSpy('handler');
    element.onclick = clickHandler;

    const event = document.createEvent('TouchEvent');
    event.initEvent('touchstart', true, true);
    element.dispatchEvent(event);

    if (reverse) {
        expect(clickHandler).not.toHaveBeenCalled();
    } else {
        expect(clickHandler).toHaveBeenCalled();
    }
};

describe('handleTouchEvents polyfill', () => {

    /**
     * Element to use for testing
     */
    let element: HTMLDivElement;

    /**
     * Fixture `onclick` handler
     */
    const clickHandler: jasmine.Spy<onclick> = jasmine.createSpy('handler');

    beforeEach(() => {
        element = document.createElement('div');
        element.onclick = clickHandler;

        handleTouchEvents(element);
    });

    /**
     * Helper to click the element
     */
    const click = () => {
        const event = document.createEvent('MouseEvent');
        event.initEvent('click', true, true);
        return element.dispatchEvent(event);
    };

    /**
     * Helper to touch the element
     */
    const touch = () => {
        const event = document.createEvent('TouchEvent');
        event.initEvent('touchstart', true, true);
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
        clickHandler.calls.reset();
        click();
        expect(clickHandler).toHaveBeenCalled();
    });

    it('allows the original click handler to be called on touch', () => {
        clickHandler.calls.reset();
        touch();
        expect(clickHandler).toHaveBeenCalled();
    });

    it('prevents a second click after a touch', () => {
        touch();
        clickHandler.calls.reset();

        click();

        expect(clickHandler).not.toHaveBeenCalled();
    });

    it('allows subsequent clicks', () => {
        touch();
        click();
        clickHandler.calls.reset();

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
        clickHandler.calls.reset();

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
