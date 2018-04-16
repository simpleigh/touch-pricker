/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

namespace Pricker {

    /**
     * DOM helper utilities
     */
    export namespace Dom {

        export function injectIframeData(
            iframe: HTMLIFrameElement,
            content: string = '',
            globals: { [key: string]: any } = { },
        ) {
            const theDoc = (iframe.contentWindow as Window).document;
            theDoc.open();

            for (const key in globals) {
                if (globals.hasOwnProperty(key)) {
                    (iframe.contentWindow as any)[key] = globals[key];
                }
            }

            theDoc.write(content);
            theDoc.close();
        }

    }

}
