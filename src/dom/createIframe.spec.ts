/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import createIframe from './createIframe';

describe('createIframe DOM utility', () => {
    it('creates an iframe', () => {
        expect(createIframe().tagName).toBe('IFRAME');
    });

    it('creates an iframe from the parent document', () => {
        jest.spyOn(document, 'createElement');
        createIframe(document);
        expect(document.createElement).toHaveBeenCalledWith('iframe');
    });

    it('ensures the created iframe has no border', () => {
        const iframe = createIframe();
        expect(iframe.style.border).toBe('0px none');
        expect(iframe.style.borderStyle).toBe('none');
        expect(iframe.style.borderWidth).toBe('0px');
    });
});
