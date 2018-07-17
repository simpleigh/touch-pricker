/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/**
 * Computes the width of an element
 */
export const getWidth = (element: HTMLElement) =>
    element.offsetWidth + 1  // Allow for fractional part
        + getMetric(element, 'marginLeft')
        + getMetric(element, 'marginRight');

/**
 * Computes the height of an element
 */
export const getHeight = (element: HTMLElement) =>
    element.offsetHeight + 1  // Allow for fractional part
        + getMetric(element, 'marginTop')
        + getMetric(element, 'marginBottom');

/**
 * Reads a style-related metric from an element
 * Designed to read dimensions of padding, margins, etc.
 * Values of "auto" are returned as zero: set explicit values in
 * stylesheets in order to avoid this.
 */
const getMetric = (element: HTMLElement, metric: string): number => {
    const metricText = window.getComputedStyle
        ? (getComputedStyle(element) as any)[metric]
        : (element as any).currentStyle[metric];

    return metricText === 'auto' ? 0 : parseInt(metricText) + 1;
};
