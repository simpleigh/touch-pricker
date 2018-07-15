/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/**
 * Creates an iframe for pricker rendering
 * @param parentDocument - document object to use (inject for testing)
 */
function createIframe(
    parentDocument: HTMLDocument = document,
): HTMLIFrameElement {
    const iframe = parentDocument.createElement('iframe');

    iframe.frameBorder = '0';
    iframe.scrolling = 'no';
    iframe.src = 'about:blank';
    iframe.style.border = 'none';

    return iframe;
}

export default createIframe;
