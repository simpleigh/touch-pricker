/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/**
 * Creates an ontouchstart handler based to better support touch devices
 * Calls through to the onclick handler but patches it to avoid double-clicks.
 * @param element  element to modify
 */
const handleTouchEvents = (element: HTMLElement): void => {
    const originalHandler = element.onclick;

    element.ontouchstart = () => {
        // Simulate a click as soon as we're touched
        // TODO: copy location information from the TouchEvent
        const clickEvent = new MouseEvent('click');
        element.dispatchEvent(clickEvent);

        // Patch the onclick method to avoid calling the handler twice
        // An `ontouchstart` will always be followed by a click: do nothing here
        // except restore the handler ready for the next click.
        element.onclick = () => {
            element.onclick = originalHandler;
            return false;
        };

        // Stop any further processing (e.g. double-click zoom, click animation)
        return false;
    };
};

export default handleTouchEvents;
