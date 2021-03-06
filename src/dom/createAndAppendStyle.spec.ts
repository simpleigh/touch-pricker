/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import createAndAppendStyle from './createAndAppendStyle';

describe('createAndAppendStyle DOM utility', () => {

    let mockStyle: HTMLStyleElement;
    let parentDocument: jasmine.SpyObj<HTMLDocument>;

    beforeEach(() => {
        mockStyle = { } as HTMLStyleElement;
        parentDocument = jasmine.createSpyObj('HTMLDocument', [
            'createElement',
        ]);
        parentDocument.createElement.and.returnValue(mockStyle);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (parentDocument as any).head = { appendChild: jasmine.createSpy() };
    });

    it('creates a style element', () => {
        expect(createAndAppendStyle().tagName).toBe('STYLE');
    });

    it('creates a style element from the parent document', () => {
        const style = createAndAppendStyle(parentDocument);
        expect(parentDocument.createElement).toHaveBeenCalledWith('style');
        expect(style).toBe(mockStyle);
    });

    it('sets the type on the created style element', () => {
        createAndAppendStyle(parentDocument);
        expect(mockStyle.type).toBe('text/css');
    });

    it('injects the styles into the style element', () => {
        createAndAppendStyle(parentDocument, 'styles');
        expect(mockStyle.innerText).toBe('styles');
    });

    it('appends the style element to the head of the document', () => {
        const style = createAndAppendStyle(parentDocument);
        expect(parentDocument.head.appendChild).toHaveBeenCalledWith(style);
    });

});
