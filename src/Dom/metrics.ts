/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/**
 * Computes the width of an element
 */
export function getWidth(element: HTMLElement) {
    return element.offsetWidth + 1  // Allow for fractional part
        + getMetric(element, 'marginLeft')
        + getMetric(element, 'marginRight');
}

/**
 * Computes the height of an element
 */
export function getHeight(element: HTMLElement) {
    return element.offsetHeight + 1  // Allow for fractional part
        + getMetric(element, 'marginTop')
        + getMetric(element, 'marginBottom');
}

/**
 * Reads a style-related metric from an element
 * Designed to read dimensions of padding, margins, etc.
 * Values of "auto" are returned as zero: set explicit values in
 * stylesheets in order to avoid this.
 */
function getMetric(element: HTMLElement, metric: string): number {
    let metricText: string;
    if (window.getComputedStyle) {
        metricText =
            (getComputedStyle(element) as any)[metric];
    } else {
        metricText = (element as any).currentStyle[metric];
    }
    return metricText === 'auto' ? 0 : parseInt(metricText) + 1;
}
