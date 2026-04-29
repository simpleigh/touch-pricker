/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import injectIframeData from './injectIframeData';

describe('injectIframeData DOM utility', () => {
    let iframe: HTMLIFrameElement;

    beforeEach(() => {
        iframe = document.createElement('iframe');

        // triggers creation of contentWindow, contentDocument, etc.
        document.body.appendChild(iframe);
    });

    it('opens the document for writing', () => {
        jest.spyOn(iframe.contentDocument!, 'open');
        injectIframeData(iframe);
        expect(iframe.contentDocument!.open).toHaveBeenCalled();
    });

    it('passes global variables to the child window', () => {
        const globals = new Map([['key', 'value']]);
        injectIframeData(iframe, '', globals);
        const win = iframe.contentWindow as unknown as Record<string, unknown>;
        expect(win['key']).toBe('value');
    });

    it('writes the content into the document', () => {
        jest.spyOn(iframe.contentDocument!, 'write');
        injectIframeData(iframe, 'content');
        expect(iframe.contentDocument!.write).toHaveBeenCalledWith('content');
    });

    it('closes the document after use', () => {
        jest.spyOn(iframe.contentDocument!, 'close');
        injectIframeData(iframe);
        expect(iframe.contentDocument!.close).toHaveBeenCalled();
    });
});
