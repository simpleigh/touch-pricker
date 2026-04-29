/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

const injectIframeData = (
    iframe: HTMLIFrameElement,
    content: string = '',
    globals: Map<string, unknown> = new Map(),
): void => {
    const theWindow = iframe.contentWindow;
    if (!theWindow) {
        throw new Error('Assertion failed: missing iframe window');
    }

    const theDoc = theWindow.document;
    theDoc.open();

    for (const [key, value] of globals.entries()) {
        (theWindow as unknown as Record<string, unknown>)[key] = value;
    }

    theDoc.write(content);
    theDoc.close();
};

export default injectIframeData;
