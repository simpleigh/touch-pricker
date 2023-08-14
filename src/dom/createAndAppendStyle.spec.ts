/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import createAndAppendStyle from './createAndAppendStyle';

describe('createAndAppendStyle DOM utility', () => {
    it('creates a style element', () => {
        expect(createAndAppendStyle().tagName).toBe('STYLE');
    });

    it('creates a style element from the parent document', () => {
        jest.spyOn(document, 'createElement');
        createAndAppendStyle(document);
        expect(document.createElement).toHaveBeenCalledWith('style');
    });

    it('sets the type on the created style element', () => {
        const style = createAndAppendStyle();
        expect(style.type).toBe('text/css');
    });

    it('injects the styles into the style element', () => {
        const style = createAndAppendStyle(undefined, 'styles');
        expect(style.innerText).toBe('styles');
    });

    it('appends the style element to the head of the document', () => {
        jest.spyOn(document.head, 'appendChild');
        const style = createAndAppendStyle();
        expect(document.head.appendChild).toHaveBeenCalledWith(style);
    });
});
