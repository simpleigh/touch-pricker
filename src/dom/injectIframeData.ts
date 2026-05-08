/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-26 Leigh Simpson. All rights reserved.
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

    for (const [key, value] of globals.entries()) {
        (theWindow as unknown as Record<string, unknown>)[key] = value;
    }

    theWindow.document.documentElement.innerHTML = content;
};

export default injectIframeData;
