/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

/**
 * Copies an onclick handler to ontouchstart to better support touch devices
 * @param {element} - element to modify
 */
const copyClickToTouchStart = (element: Node & GlobalEventHandlers) => {
    const originalHandler = element.onclick;

    element.ontouchstart = () => {
        // Simulate a click as soon as we're touched
        // TODO: copy location information from the TouchEvent
        element.dispatchEvent(new MouseEvent('click'));

        // Patch the onclick method to avoid calling the handler twice
        // An `ontouchstart` will be followed by a click: do nothing here
        // except restore the handler ready for the next click.
        element.onclick = () => {
            element.onclick = originalHandler;
            return false;
        };

        // Stop any further processing (e.g. double-click zoom, click animation)
        return false;
    };
};

/**
 * Implement polyfills for elements with an onclick attribute
 * @param {element} - element to modify
 */
const onclick = (element: Node) => {
    copyClickToTouchStart(element as unknown as Node & GlobalEventHandlers);
};

export default onclick;
