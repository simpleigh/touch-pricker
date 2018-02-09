/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="Pricker/Abstract.ts" />
/// <reference path="Pricker/Mbd.ts" />
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
        let theDoc: HTMLDocument;
        let pricker: Pricker.AbstractPricker;

        const element = parentDocument.getElementById(elementId);
        if (!element) {
            throw new Error(`Cannot find HTML element: '${elementId}'`);
        }

        const iframe = parentDocument.createElement('iframe');
        iframe.frameBorder = '0';
        if (iframe.sandbox) {
            iframe.sandbox.add('allow-same-origin');
            iframe.sandbox.add('allow-scripts');
        }
        iframe.scrolling = 'no';
        iframe.src = 'about:blank';
        iframe.style.border = 'none';
        element.appendChild(iframe);

        theDoc = iframe.contentWindow.document;
        pricker = new Pricker.Mbd(theDoc, iframe);

        theDoc.open();
        (iframe.contentWindow as any).pricker = pricker;
        theDoc.write(Templates.create({'pricker': pricker}));
        theDoc.close();

        return pricker;
    }

}
