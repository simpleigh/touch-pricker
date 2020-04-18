/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

/**
 * Reads a style-related metric from an element
 * Designed to read dimensions of padding, margins, etc.
 * Values of "auto" are returned as zero: set explicit values in
 * stylesheets in order to avoid this.
 */
const getMetric = (
    element: HTMLElement,
    metric: 'marginBottom' | 'marginLeft' | 'marginRight' | 'marginTop',
): number => {
    const metricText = getComputedStyle(element)[metric];
    return metricText === 'auto' ? 0 : parseInt(metricText) + 1;
};

/**
 * Computes the width of an element
 */
export const getWidth = (element: HTMLElement): number =>
    element.offsetWidth + 1  // Allow for fractional part
        + getMetric(element, 'marginLeft')
        + getMetric(element, 'marginRight');

/**
 * Computes the height of an element
 */
export const getHeight = (element: HTMLElement): number =>
    element.offsetHeight + 1  // Allow for fractional part
        + getMetric(element, 'marginTop')
        + getMetric(element, 'marginBottom');
