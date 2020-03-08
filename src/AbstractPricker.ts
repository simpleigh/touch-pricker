/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { getHeight, getWidth } from './dom';
import Pricker from './Pricker';
import * as Templates from './templates';

abstract class AbstractPricker implements Pricker {

    /**
     * Constructor
     */
    constructor(
        protected _iframe?: HTMLIFrameElement,
    ) {
        // NOOP
    }

    /* templating *************************************************************/

    public print: Templates.Print;

    /* AbstractPricker methods ************************************************/

    /**
     * Event handler for window.onload
     */
    public abstract onLoad(): void;

    /**
     * Resizes the parent iframe if one exists
     * May be overridden; default implementation uses elements that are
     * immediate children of the body element as follows:
     *  - width: sum of all elements' widths and margins
     *  - height: maximum of all elements' heights and margins
     */
    protected resize(): void {
        if (!this._iframe) {
            return;
        }

        const theDoc = (this._iframe.contentWindow as Window).document;
        const elements = theDoc.body.children;
        let width = 0;
        let height = 0;

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < elements.length; i = i + 1) {
            const element = elements[i] as HTMLElement;
            width = width + getWidth(element);
            height = Math.max(height, getHeight(element));
        }

        this._iframe.width = width + 'px';
        this._iframe.height = height + 'px';
    }

    /**
     * Wraps document.getElementById and adds type information
     */
    protected getEl<T extends HTMLElement>(id: string): T {
        const theDoc = this._iframe
            ? (this._iframe.contentWindow as Window).document
            : document;

        // Ignore risk elements may be null when using our own templates
        return theDoc.getElementById(id) as T;
    }

}

export default AbstractPricker;
