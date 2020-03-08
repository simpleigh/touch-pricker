/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

/**
 * Hides a block element
 */
export const hide = (element: HTMLElement): void => {
    element.style.display = 'none';
    element.style.visibility = 'hidden';
};

/**
 * Shows a block element
 */
export const show = (element: HTMLElement): void => {
    element.style.display = '';
    element.style.visibility = 'visible';
};
