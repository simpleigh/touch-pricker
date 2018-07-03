/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import * as Dom from './Dom';
import Options from './Options';
import * as Pricker from './Pricker';
import Templates from './Templates';

/**
 * Factory function to create a pricker
 * @param elementId - ID of HTML element to which the pricker will be bound
 * @param options - pricker options
 * @param parentDocument - document to use to create pricker (for testing)
 */
function create(
    elementId: string,
    options: Options = { },
    parentDocument: HTMLDocument = document,
): Pricker.Mbd {
    let pricker: Pricker.Mbd;

    const element = parentDocument.getElementById(elementId);
    if (!element) {
        throw new Error(`Cannot find HTML element: '${elementId}'`);
    }

    if (options.iframe || options.iframe === undefined) {
        const iframe = Dom.createIframe(parentDocument);
        element.appendChild(iframe);
        pricker = new Pricker.Mbd(iframe);
        Dom.injectIframeData(
            iframe,
            Templates.create({'pricker': pricker}),
            { pricker },
        );
    } else {
        pricker = new Pricker.Mbd();
        Dom.createAndAppendStyle(parentDocument, pricker.print('css'));
        element.innerHTML = pricker.print('html');
        (window as any).pricker = pricker;
        if (parentDocument === document) {
            // don't run in tests (when document has been overridden)
            pricker.onLoad();
        }
    }

    return pricker;
}

export default create;
