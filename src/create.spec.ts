/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import create from './create';
import template from './create.dot';
import * as Dom from './dom';
import Pricker from './Pricker';
import PrickerWindow from './PrickerWindow';
import { MbdPricker as Grandsire } from './grandsire';
import { MbdPricker as Stedman, StedTurnPricker as StedTurn } from './stedman';

jest.mock('./dom');

describe('create function', () => {
    let parentDocument: Document;
    let element: HTMLElement;
    const iframe = {} as HTMLIFrameElement;

    beforeEach(() => {
        element = {
            appendChild: jest.fn(),
        } as unknown as HTMLElement;
        parentDocument = {
            getElementById: jest.fn().mockReturnValue(element),
        } as unknown as Document;
        (Dom.createIframe as jest.Mock).mockReturnValue(iframe);
    });

    it('throws an error if the element is not found', () => {
        (parentDocument.getElementById as jest.Mock).mockReturnValue(null);
        expect(() => {
            create('element', {}, parentDocument);
        }).toThrowError("Cannot find HTML element: 'element'");
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

        it('can create a stedturn pricker if requested', () => {
            pricker = create('element', { type: 'stedturn' }, parentDocument);
            expect(pricker).toEqual(new StedTurn(iframe));
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

        it('can create a stedturn pricker if requested', () => {
            pricker = create(
                'element',
                { iframe: false, type: 'stedturn' },
                parentDocument,
            );
            expect(pricker).toEqual(new StedTurn());
        });

        it('creates a style element and appends it to the document', () => {
            expect(Dom.createAndAppendStyle).toHaveBeenCalledWith(
                parentDocument,
                pricker.print('css'),
            );
        });

        it('appends the created pricker to the supplied element', () => {
            expect(element.innerHTML).toBe(pricker.print('html'));
        });

        it('stores the pricker object globally', () => {
            expect((window as PrickerWindow).pricker).toBe(pricker);
        });
    });
});
