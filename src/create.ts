/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import AbstractPricker from './AbstractPricker';
import template from './create.dot';
import { createAndAppendStyle, createIframe, injectIframeData } from './dom';
import Options from './Options';
import Pricker from './Pricker';
import { MbdPricker } from './stedman';
import { Pricker as TuesdayPricker } from './tuesday';
import Type from './Type';

/**
 * Pricker constructor function
 */
interface PrickerConstructor {
    new(_iframe?: HTMLIFrameElement): AbstractPricker;
}

const prickerConstructors: { [type in Type]: PrickerConstructor } = {
    [Type.Mbd]: MbdPricker,
    [Type.Tuesday]: TuesdayPricker,
};

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
    let pricker: AbstractPricker;

    const element = parentDocument.getElementById(elementId);
    if (!element) {
        throw new Error(`Cannot find HTML element: '${elementId}'`);
    }

    const prickerType = prickerConstructors[options.type || Type.Mbd];

    if (options.iframe || options.iframe === undefined) {
        const iframe = createIframe(parentDocument);
        element.appendChild(iframe);
        pricker = new prickerType(iframe);
        injectIframeData(iframe, template({ pricker }), { pricker });
    } else {
        pricker = new prickerType();
        createAndAppendStyle(parentDocument, pricker.print('css'));
        element.innerHTML = pricker.print('html');
        (window as any).pricker = pricker;
        if (parentDocument === document) {
            // don't run in tests (when document has been overridden)
            pricker.onLoad();
        }
    }

    return pricker;
};

export default create;
