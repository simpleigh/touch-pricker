/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

namespace Pricker {

    /**
     * DOM helper utilities
     */
    export namespace Dom {

        /**
         * Creates an iframe for pricker rendering
         * @param parentDocument - document object to use (inject for testing)
         */
        export function createIframe(
            parentDocument: HTMLDocument = document,
        ): HTMLIFrameElement {
            const iframe = parentDocument.createElement('iframe');

            iframe.frameBorder = '0';
            if (iframe.sandbox) {
                iframe.sandbox.add('allow-same-origin');
                iframe.sandbox.add('allow-scripts');
            }
            iframe.scrolling = 'no';
            iframe.src = 'about:blank';
            iframe.style.border = 'none';

            return iframe;
        }

    }

}
