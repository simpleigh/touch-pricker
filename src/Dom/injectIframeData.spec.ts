/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import injectIframeData from './injectIframeData';

describe('injectIframeData DOM utility', () => {

    let contentDocument: jasmine.SpyObj<HTMLDocument>;
    let iframe: any;

    beforeEach(() => {
        contentDocument = jasmine.createSpyObj('HTMLDocument', [
            'open',
            'write',
            'close',
        ]);
        iframe = { 'contentWindow': { 'document': contentDocument } };
    });

    it('opens the document for writing', () => {
        injectIframeData(iframe);
        expect(contentDocument.open).toHaveBeenCalled();
    });

    it('passes global variables to the child window', () => {
        injectIframeData(iframe, '', { 'key': 'value' });
        expect(iframe.contentWindow.key).toBe('value');
    });

    it('writes the content into the document', () => {
        injectIframeData(iframe, 'content');
        expect(contentDocument.write).toHaveBeenCalledWith('content');
    });

    it('closes the document after use', () => {
        injectIframeData(iframe);
        expect(contentDocument.close).toHaveBeenCalled();
    });

});
