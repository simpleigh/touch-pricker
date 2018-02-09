/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../Stage.ts" />
/// <reference path="../Templates.ts" />

namespace Pricker {

    /**
     * Prickers
     * Sadly for tslint, these will shadow the top-level namespace until I can
     * think of a better name.
     */
    // tslint:disable-next-line:no-shadowed-variable
    export namespace Pricker {

        export abstract class AbstractPricker {

            /**
             * Constructor
             */
            constructor(
                protected _document: HTMLDocument = document,
                protected _iframe?: HTMLIFrameElement,
            ) {
                // NOOP
            }

            /**
             * Event handler for window.onload
             */
            public abstract onLoad(): void;

            /**
             * Resizes the parent iframe
             * May be overridden; default implementation uses elements that are
             * immediate children of the body element as follows:
             *  - width: sum of all elements' widths and margins
             *  - height: maximum of all elements' heights and margins
             */
            protected resize(): void {
                if (!this._iframe) {
                    return;
                }

                const elements = this._document.body.children;
                let width = 0;
                let height = 0;

                // tslint:disable-next-line:prefer-for-of
                for (let i = 0; i < elements.length; i = i + 1) {
                    const element = elements[i] as HTMLElement;
                    width = width + this.getWidth(element);
                    height = Math.max(height, this.getHeight(element));
                }

                this._iframe.width = width + 'px';
                this._iframe.height = height + 'px';
            }

            /**
             * Wraps document.getElementById and adds type information
             */
            protected getEl<T extends HTMLElement>(id: string): T {
                // Ignore risk elements may be null when using our own templates
                return this._document.getElementById(id) as T;
            }

            /**
             * Computes the width of an element
             */
            private getWidth(element: HTMLElement) {
                return element.offsetWidth + 1  // Allow for fractional part
                    + this.getMetric(element, 'marginLeft')
                    + this.getMetric(element, 'marginRight');
            }

            /**
             * Computes the height of an element
             */
            private getHeight(element: HTMLElement) {
                return element.offsetHeight + 1  // Allow for fractional part
                    + this.getMetric(element, 'marginTop')
                    + this.getMetric(element, 'marginBottom');
            }

            /**
             * Reads a style-related metric from an element
             * Designed to read dimensions of padding, margins, etc.
             * Values of "auto" are returned as zero: set explicit values in
             * stylesheets in order to avoid this.
             */
            private getMetric(element: HTMLElement, metric: string): number {
                let metricText: string;
                if (window.getComputedStyle) {
                    metricText =
                        (getComputedStyle(element) as any)[metric];
                } else {
                    metricText = (element as any).currentStyle[metric];
                }
                return metricText === 'auto' ? 0 : parseInt(metricText) + 1;
            }

        }

    }

}
