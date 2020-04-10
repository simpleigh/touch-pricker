/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import create from './create';
import template from './create.dot';
import * as Dom from './dom';
import Pricker from './Pricker';
import { MbdPricker as Grandsire } from './grandsire';
import { MbdPricker as Stedman } from './stedman';

describe('create function', () => {

    let parentDocument: jasmine.SpyObj<HTMLDocument>;
    let element: jasmine.SpyObj<HTMLDivElement>;
    const iframe: any = { };

    beforeEach(() => {
        parentDocument = jasmine.createSpyObj('HTMLDocument', [
            'getElementById',
        ]);
        element = jasmine.createSpyObj('HTMLDivElement', ['appendChild']);

        spyOn(Dom, 'createAndAppendStyle');
        spyOn(Dom, 'createIframe');
        spyOn(Dom, 'injectIframeData');

        parentDocument.getElementById.and.returnValue(element);
        (Dom.createIframe as jasmine.Spy).and.returnValue(iframe);
    });

    it('throws an error if the element is not found', () => {
        parentDocument.getElementById.and.returnValue(null);
        expect(() => create('element', { }, parentDocument))
            .toThrowError("Cannot find HTML element: 'element'");
    });

    describe('creates an iframe to host the pricker', () => {

        let pricker: Pricker;

        beforeEach(() => {
            pricker = create('element', undefined, parentDocument);
        });

        it('creates the pricker with the iframe', () => {
            expect(pricker).toEqual(new Stedman(iframe));
        });

        it('can create a grandsire pricker if requested', () => {
            pricker = create('element', { type: 'grandsire' }, parentDocument);
            expect(pricker).toEqual(new Grandsire(iframe));
        });

        it('creates an iframe to hold the pricker', () => {
            expect(Dom.createIframe).toHaveBeenCalledWith(parentDocument);
        });

        it('appends the created iframe to the supplied element', () => {
            expect(element.appendChild).toHaveBeenCalledWith(iframe);
        });

        it('injects data into the iframe', () => {
            expect(Dom.injectIframeData).toHaveBeenCalledWith(
                iframe,
                template({ pricker }),
                { pricker },
            );
        });

    });

    describe('appends the pricker to an element if requested', () => {

        let pricker: Pricker;

        beforeEach(() => {
            pricker = create('element', { iframe: false }, parentDocument);
        });

        it('creates the pricker', () => {
            expect(pricker).toEqual(new Stedman());
        });

        it('can create a grandsire pricker if requested', () => {
            pricker = create(
                'element',
                { iframe: false, type: 'grandsire' },
                parentDocument,
            );
            expect(pricker).toEqual(new Grandsire());
        });

        it('creates a style element and appends it to the document', () => {
            expect(Dom.createAndAppendStyle)
                .toHaveBeenCalledWith(parentDocument, pricker.print('css'));
        });

        it('appends the created pricker to the supplied element', () => {
            expect(element.innerHTML).toBe(pricker.print('html'));
        });

        it('stores the pricker object globally', () => {
            expect((window as any).pricker).toBe(pricker);
        });

    });

});
