/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-26 Leigh Simpson. All rights reserved.
 */

import injectIframeData from './injectIframeData';

describe('injectIframeData DOM utility', () => {
    let iframe: HTMLIFrameElement;

    beforeEach(() => {
        iframe = document.createElement('iframe');

        // triggers creation of contentWindow, contentDocument, etc.
        document.body.appendChild(iframe);
    });

    it('passes global variables to the child window', () => {
        const globals = new Map([['key', 'value']]);
        injectIframeData(iframe, '', globals);
        const win = iframe.contentWindow as unknown as Record<string, unknown>;
        expect(win['key']).toBe('value');
    });

    it('writes the content into the docuement', () => {
        const expected =
            '<head><title>Title</title></head><body>Content</body>';

        expect(iframe.contentDocument?.documentElement.innerHTML).toBe(
            '<head></head><body></body>',
        );

        injectIframeData(iframe, expected);

        expect(iframe.contentDocument?.documentElement.innerHTML).toBe(
            expected,
        );
    });
});
