/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { getHeight, getWidth } from './metrics';

const testMetricImplementation = (
    metricFunction: (element: HTMLElement) => number,
    elementMetric: string,
    firstMargin: string,
    secondMargin: string,
) => {
    const element = { } as HTMLElement;

    const setupMetrics = (
        elementMetricValue: number,
        firstMarginValue: string,
        secondMarginValue: string,
    ) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (element as any)[elementMetric] = elementMetricValue;
        const styles = {
            [firstMargin]: firstMarginValue,
            [secondMargin]: secondMarginValue,
        } as unknown as CSSStyleDeclaration;

        spyOn(window, 'getComputedStyle').and.returnValue(styles);
    };

    it('adds one to the total', () => {
        setupMetrics(0, 'auto', 'auto');
        expect(metricFunction(element)).toBe(1);
    });

    it(`adds the ${elementMetric} to the total`, () => {
        setupMetrics(1, 'auto', 'auto');
        expect(metricFunction(element)).toBe(2);
    });

    it(`adds the ${firstMargin} and an additional one to the total`, () => {
        setupMetrics(0, '1', 'auto');
        expect(metricFunction(element)).toBe(3);
    });

    it(`adds the ${secondMargin} and an additional one to the total`, () => {
        setupMetrics(0, 'auto', '1');
        expect(metricFunction(element)).toBe(3);
    });

    it('copes when margins have a px suffix', () => {
        setupMetrics(0, '1px', '1px');
        expect(metricFunction(element)).toBe(5);
    });

};

describe('getWidth DOM utility', () => testMetricImplementation(
    getWidth,
    'offsetWidth',
    'marginLeft',
    'marginRight',
));

describe('getHeight DOM utility', () => testMetricImplementation(
    getHeight,
    'offsetHeight',
    'marginTop',
    'marginBottom',
));
