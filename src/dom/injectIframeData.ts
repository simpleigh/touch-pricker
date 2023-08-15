/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

const injectIframeData = (
    iframe: HTMLIFrameElement,
    content: string = '',
    globals: Record<string, unknown> = {},
): void => {
    const theWindow = iframe.contentWindow;
    if (!theWindow) {
        throw new Error('Assertion failed: missing iframe window');
    }

    const theDoc = theWindow.document;
    theDoc.open();

    for (const key in globals) {
        if (Object.prototype.hasOwnProperty.call(globals, key)) {
            (theWindow as unknown as Record<string, unknown>)[key] =
                globals[key];
        }
    }

    theDoc.write(content);
    theDoc.close();
};

export default injectIframeData;
