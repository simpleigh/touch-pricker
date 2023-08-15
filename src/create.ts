/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import template from './create.dot';
import { createAndAppendStyle, createIframe, injectIframeData } from './dom';
import Options from './Options';
import Pricker from './Pricker';
import PrickerWindow from './PrickerWindow';
import { MbdPricker as Grandsire } from './grandsire';
import { MbdPricker as Stedman, StedTurnPricker as StedTurn } from './stedman';
import AbstractPricker from './AbstractPricker';

type PrickerConstructor = new (_iframe?: HTMLIFrameElement) => AbstractPricker;

const PRICKER_CONSTRUCTORS: Record<string, PrickerConstructor> = {
    grandsire: Grandsire,
    stedman: Stedman,
    stedturn: StedTurn,
};

/**
 * Factory function to create a pricker
 * @param elementId       ID of HTML element to which the pricker will be bound
 * @param options         pricker options
 * @param parentDocument  document to use to create pricker (for testing)
 */
const create = (
    elementId: string,
    options: Options = {},
    parentDocument: Document = document,
): Pricker => {
    const PrickerConstructor = PRICKER_CONSTRUCTORS[options.type ?? 'stedman'];

    const element = parentDocument.getElementById(elementId);
    if (!element) {
        throw new Error(`Cannot find HTML element: '${elementId}'`);
    }

    if (options.iframe === false) {
        // Use of an iframe has been explicitly suppressed
        const pricker = new PrickerConstructor();

        createAndAppendStyle(parentDocument, pricker.print('css'));
        element.innerHTML = pricker.print('html');
        (window as PrickerWindow).pricker = pricker;
        if (parentDocument === document) {
            // don't run in tests (when document has been overridden)
            pricker.onLoad();
        }

        return pricker;
    }

    const iframe = createIframe(parentDocument);
    element.appendChild(iframe);

    const pricker = new PrickerConstructor(iframe);

    injectIframeData(iframe, template({ pricker }), { pricker });

    return pricker;
};

export default create;
