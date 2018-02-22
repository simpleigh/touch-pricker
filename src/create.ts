/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="Pricker/Abstract.ts" />
/// <reference path="Pricker/Mbd.ts" />
/// <reference path="Dom/createIframe.ts" />
/// <reference path="Dom/injectIframeData.ts" />
/// <reference path="Templates.ts" />

namespace Pricker {

    /**
     * Factory function to create a pricker
     * @param elementId - ID of HTML element to which the pricker will be bound
     * @param parentDocument - document to use to create pricker (for testing)
     */
    export function create(
        elementId: string,
        parentDocument: HTMLDocument = document,
    ): Pricker.AbstractPricker {
        let pricker: Pricker.AbstractPricker;

        const element = parentDocument.getElementById(elementId);
        if (!element) {
            throw new Error(`Cannot find HTML element: '${elementId}'`);
        }

        const iframe = Dom.createIframe(parentDocument);
        element.appendChild(iframe);

        pricker = new Pricker.Mbd(iframe);

        Dom.injectIframeData(
            iframe,
            Templates.create({'pricker': pricker}),
            { pricker },
        );

        return pricker;
    }

}
