/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../dist/stedman-pricker.d.ts" />

function testMetricImplementation(
    metricFunction: (element: HTMLElement) => number,
    elementMetric: string,
    firstMargin: string,
    secondMargin: string,
) {
    let element: any;

    function setupMetrics(
        elementMetricValue: number,
        firstMarginValue: string,
        secondMarginValue: string,
    ) {
        element = {
            [elementMetric]: elementMetricValue,
            'currentStyle': {
                [firstMargin]: firstMarginValue,
                [secondMargin]: secondMarginValue,
            },
        };
        spyOn(window, 'getComputedStyle').and.returnValue(element.currentStyle);
    }

    it('adds one to the total', () => {
        setupMetrics(0, 'auto', 'auto');
        expect(metricFunction(element as HTMLElement)).toBe(1);
    });

    it('adds the elementMetric to the total', () => {
        setupMetrics(1, 'auto', 'auto');
        expect(metricFunction(element as HTMLElement)).toBe(2);
    });

    it('adds the first margin and an additional one to the total', () => {
        setupMetrics(0, '1', 'auto');
        expect(metricFunction(element as HTMLElement)).toBe(3);
    });

    it('adds the second margin and an additional one to the total', () => {
        setupMetrics(0, 'auto', '1');
        expect(metricFunction(element as HTMLElement)).toBe(3);
    });

    it('copes when margins have a px suffix', () => {
        setupMetrics(0, '1px', '1px');
        expect(metricFunction(element as HTMLElement)).toBe(5);
    });

    it('falls back to currentStyle if getComputedStyle is unavailable', () => {
        const getComputedStyleBackup = window.getComputedStyle;
        (window as any).getComputedStyle = false;

        setupMetrics(0, '1px', '1px');
        expect(metricFunction(element as HTMLElement)).toBe(5);

        window.getComputedStyle = getComputedStyleBackup;
    });

}

describe('getWidth DOM utility', () => testMetricImplementation(
    Pricker.Dom.getWidth,
    'offsetWidth',
    'marginLeft',
    'marginRight',
));

describe('getHeight DOM utility', () => testMetricImplementation(
    Pricker.Dom.getHeight,
    'offsetHeight',
    'marginTop',
    'marginBottom',
));
