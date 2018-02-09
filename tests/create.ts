/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../dist/stedman-pricker.d.ts" />

describe('create function', () => {

    let parentDocument: jasmine.SpyObj<HTMLDocument>;
    let childDocument: jasmine.SpyObj<HTMLDocument>;
    let element: jasmine.SpyObj<HTMLDivElement>;
    let iframe: any;
    let pricker: Pricker.Pricker.AbstractPricker;

    beforeEach(() => {
        parentDocument = jasmine.createSpyObj('HTMLDocument', [
            'getElementById',
            'createElement',
        ]);
        childDocument = jasmine.createSpyObj('HTMLDocument', [
            'open',
            'write',
            'close',
        ]);
        element = jasmine.createSpyObj('HTMLDivElement', ['appendChild']);
        iframe = {
            'contentWindow': { 'document': childDocument },
            'style': { },
        };

        parentDocument.getElementById.and.returnValue(element);
        parentDocument.createElement.and.returnValue(iframe);

        pricker = Pricker.create('element', parentDocument);
    });

    it('throws an error if the element is not found', () => {
        parentDocument.getElementById.and.returnValue(undefined);
        expect(() => Pricker.create('element', parentDocument))
            .toThrowError("Cannot find HTML element: 'element'");
    });

    it('creates the pricker', () => {
        expect(pricker).toEqual(new Pricker.Pricker.Mbd(childDocument, iframe));
    });

    it('creates an iframe to hold the pricker', () => {
        expect(parentDocument.createElement).toHaveBeenCalledWith('iframe');
    });

    it('ensures the created iframe has no border', () => {
        expect(iframe.frameBorder).toBe('0');
        expect(iframe.style.border).toBe('none');
    });

    it('disables scrolling on the created iframe', () => {
        expect(iframe.scrolling).toBe('no');
    });

    it('appends the created iframe to the supplied element', () => {
        expect(element.appendChild).toHaveBeenCalledWith(iframe);
    });

    it('passes the created pricker to the child window', () => {
        expect(iframe.contentWindow.pricker).toBe(pricker);
    });

    it('opens the document for writing', () => {
        expect(childDocument.open).toHaveBeenCalled();
    });

    it('writes the pricker into the document', () => {
        expect(childDocument.write)
            .toHaveBeenCalledWith(Pricker.Templates.create({
                'pricker': pricker,
            }));
    });

    it('closes the document after use', () => {
        expect(childDocument.close).toHaveBeenCalled();
    });
});
