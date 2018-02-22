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

    beforeEach(() => {
        parentDocument = jasmine.createSpyObj('HTMLDocument', [
            'getElementById',
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
        spyOn(Pricker.Dom, 'createIframe');

        parentDocument.getElementById.and.returnValue(element);
        (Pricker.Dom.createIframe as jasmine.Spy).and.returnValue(iframe);
    });

    it('throws an error if the element is not found', () => {
        parentDocument.getElementById.and.returnValue(undefined);
        expect(() => Pricker.create('element', parentDocument))
            .toThrowError("Cannot find HTML element: 'element'");
    });

    it('creates the pricker', () => {
        const pricker = Pricker.create('element', parentDocument);
        expect(pricker).toEqual(new Pricker.Pricker.Mbd(iframe));
    });

    it('creates an iframe to hold the pricker', () => {
        Pricker.create('element', parentDocument);
        expect(Pricker.Dom.createIframe).toHaveBeenCalled();
    });

    it('appends the created iframe to the supplied element', () => {
        Pricker.create('element', parentDocument);
        expect(element.appendChild).toHaveBeenCalledWith(iframe);
    });

    it('passes the created pricker to the child window', () => {
        const pricker = Pricker.create('element', parentDocument);
        expect(iframe.contentWindow.pricker).toBe(pricker);
    });

    it('opens the document for writing', () => {
        Pricker.create('element', parentDocument);
        expect(childDocument.open).toHaveBeenCalled();
    });

    it('writes the pricker into the document', () => {
        const pricker = Pricker.create('element', parentDocument);
        expect(childDocument.write)
            .toHaveBeenCalledWith(Pricker.Templates.create({
                'pricker': pricker,
            }));
    });

    it('closes the document after use', () => {
        Pricker.create('element', parentDocument);
        expect(childDocument.close).toHaveBeenCalled();
    });
});
