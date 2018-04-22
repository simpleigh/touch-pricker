/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="../dist/touch-pricker.d.ts" />

describe('create function', () => {

    let parentDocument: jasmine.SpyObj<HTMLDocument>;
    let element: jasmine.SpyObj<HTMLDivElement>;
    const iframe: any = { };

    beforeEach(() => {
        parentDocument = jasmine.createSpyObj('HTMLDocument', [
            'getElementById',
        ]);
        element = jasmine.createSpyObj('HTMLDivElement', ['appendChild']);

        spyOn(Pricker.Dom, 'createAndAppendStyle');
        spyOn(Pricker.Dom, 'createIframe');
        spyOn(Pricker.Dom, 'injectIframeData');

        parentDocument.getElementById.and.returnValue(element);
        (Pricker.Dom.createIframe as jasmine.Spy).and.returnValue(iframe);
    });

    it('throws an error if the element is not found', () => {
        parentDocument.getElementById.and.returnValue(undefined);
        expect(() => Pricker.create('element', { }, parentDocument))
            .toThrowError("Cannot find HTML element: 'element'");
    });

    describe('creates an iframe to host the pricker', () => {

        let pricker: Pricker.Pricker.AbstractPricker;

        beforeEach(() => {
            pricker = Pricker.create('element', { }, parentDocument);
        });

        it('creates the pricker with the iframe', () => {
            expect(pricker).toEqual(new Pricker.Pricker.Mbd(iframe));
        });

        it('creates an iframe to hold the pricker', () => {
            expect(Pricker.Dom.createIframe)
                .toHaveBeenCalledWith(parentDocument);
        });

        it('appends the created iframe to the supplied element', () => {
            expect(element.appendChild).toHaveBeenCalledWith(iframe);
        });

        it('injects data into the iframe', () => {
            expect(Pricker.Dom.injectIframeData).toHaveBeenCalledWith(
                iframe,
                Pricker.Templates.create({'pricker': pricker}),
                { pricker },
            );
        });

    });

    describe('appends the pricker to an element if requested', () => {

        let pricker: Pricker.Pricker.Mbd;

        beforeEach(() => {
            pricker = Pricker.create(
                'element',
                { 'iframe': false },
                parentDocument,
            );
        });

        it('creates the pricker', () => {
            expect(pricker).toEqual(new Pricker.Pricker.Mbd());
        });

        it('creates a style element and appends it to the document', () => {
            expect(Pricker.Dom.createAndAppendStyle).toHaveBeenCalledWith(
                parentDocument,
                pricker.print('css'),
            );
        });

        it('appends the created pricker to the supplied element', () => {
            expect(element.innerHTML).toBe(pricker.print('html'));
        });

        it('stores the pricker object globally', () => {
            expect((window as any).pricker).toBe(pricker);
        });

    });

});
