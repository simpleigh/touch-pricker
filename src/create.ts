/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import template from './create.dot';
import { createAndAppendStyle, createIframe, injectIframeData } from './dom';
import Options from './Options';
import Pricker from './Pricker';
import PrickerWindow from './PrickerWindow';
import { MbdPricker as Grandsire } from './grandsire';
import { MbdPricker as Stedman } from './stedman';

/**
 * Factory function to create a pricker
 * @param elementId - ID of HTML element to which the pricker will be bound
 * @param options - pricker options
 * @param parentDocument - document to use to create pricker (for testing)
 */
const create = (
    elementId: string,
    options: Options = { },
    parentDocument: HTMLDocument = document,
): Pricker => {
    let pricker: Pricker;

    const element = parentDocument.getElementById(elementId);
    if (!element) {
        throw new Error(`Cannot find HTML element: '${elementId}'`);
    }

    if (options.iframe || options.iframe === undefined) {
        const iframe = createIframe(parentDocument);
        element.appendChild(iframe);

        pricker = options.type === 'grandsire'
            ? new Grandsire(iframe)
            : new Stedman(iframe);

        injectIframeData(iframe, template({ pricker }), { pricker });
    } else {
        pricker = options.type === 'grandsire'
            ? new Grandsire()
            : new Stedman();

        createAndAppendStyle(parentDocument, pricker.print('css'));
        element.innerHTML = pricker.print('html');
        (window as PrickerWindow).pricker = pricker;
        if (parentDocument === document) {
            // don't run in tests (when document has been overridden)
            pricker.onLoad();
        }
    }

    return pricker;
};

export default create;
