/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import createIframe from './createIframe';

describe('createIframe DOM utility', () => {

    let mockIframe: any;
    let parentDocument: jasmine.SpyObj<HTMLDocument>;

    beforeEach(() => {
        mockIframe = { style: { } };
        parentDocument = jasmine.createSpyObj('HTMLDocument', [
            'createElement',
        ]);
        parentDocument.createElement.and.returnValue(mockIframe);
    });

    it('creates an iframe', () => {
        expect(createIframe().tagName).toBe('IFRAME');
    });

    it('creates an iframe from the parent document', () => {
        const iframe = createIframe(parentDocument);
        expect(parentDocument.createElement).toHaveBeenCalledWith('iframe');
        expect(iframe).toBe(mockIframe);
    });

    it('ensures the created iframe has no border', () => {
        createIframe(parentDocument);
        expect(mockIframe.frameBorder).toBe('0');
        expect(mockIframe.style.border).toBe('none');
    });

    it('disables scrolling on the created iframe', () => {
        createIframe(parentDocument);
        expect(mockIframe.scrolling).toBe('no');
    });

});
