/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import * as Templates from '.';
import { Context } from './types';

describe('Printable implementation', () => {

    const templates = {
        'templateOne': jasmine.createSpy().and.returnValue('one'),
        'templateTwo': jasmine.createSpy().and.returnValue('two'),
    };

    @Templates.makePrintable(templates)
    class Printable implements Templates.Interface {
        public print: Templates.Print;
    }

    let printable: Printable;

    beforeEach(() => {
        templates.templateOne.calls.reset();
        templates.templateTwo.calls.reset();
        printable = new Printable();
    });

    it('calls the correct template', () => {
        printable.print('templateOne');
        expect(templates.templateOne).toHaveBeenCalled();
        expect(templates.templateTwo).not.toHaveBeenCalled();
    });

    it('returns the template result', () => {
        expect(printable.print('templateTwo')).toBe('two');
    });

    it('passes itself to templates', () => {
        printable.print('templateOne');
        expect(templates.templateOne)
            .toHaveBeenCalledWith({ 'object': printable });
    });

    it('passes additional context to templates', () => {
        printable.print('templateOne', { 'test': 'value' });
        expect(templates.templateOne)
            .toHaveBeenCalledWith({ 'object': printable, 'test': 'value' });
    });

    it('leaves the passed context unchanged', () => {
        const context: Context = { };
        printable.print('templateTwo');
        expect(context).toEqual({ });
    });

});
