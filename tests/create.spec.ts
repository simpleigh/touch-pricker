/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../dist/stedman-pricker.d.ts" />

describe('create function', () => {

    let parentDocument: jasmine.SpyObj<HTMLDocument>;
    let element: jasmine.SpyObj<HTMLDivElement>;
    const iframe: any = { };

    beforeEach(() => {
        parentDocument = jasmine.createSpyObj('HTMLDocument', [
            'getElementById',
        ]);
        element = jasmine.createSpyObj('HTMLDivElement', ['appendChild']);

        spyOn(Pricker.Dom, 'createIframe');
        spyOn(Pricker.Dom, 'injectIframeData');

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
        expect(Pricker.Dom.createIframe).toHaveBeenCalledWith(parentDocument);
    });

    it('appends the created iframe to the supplied element', () => {
        Pricker.create('element', parentDocument);
        expect(element.appendChild).toHaveBeenCalledWith(iframe);
    });

    it('injects data into the iframe', () => {
        const pricker = Pricker.create('element', parentDocument);
        expect(Pricker.Dom.injectIframeData).toHaveBeenCalledWith(
            iframe,
            Pricker.Templates.create({'pricker': pricker}),
            { pricker },
        );
    });

});
