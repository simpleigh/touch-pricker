/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/**
 * Creates an iframe for pricker rendering
 * @param parentDocument  document object to use (inject for testing)
 */
const createIframe = (
    parentDocument: Document = document,
): HTMLIFrameElement => {
    const iframe = parentDocument.createElement('iframe');

    // TODO: these are deprecated: remove/update them and their tests
    iframe.frameBorder = '0';
    iframe.scrolling = 'no';
    iframe.src = 'about:blank';
    iframe.style.borderStyle = 'none';
    iframe.style.borderWidth = '0';

    return iframe;
};

export default createIframe;
