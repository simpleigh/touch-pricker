/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Library from './Library';

describe('select template for Library', () => {

    const library = new Library();

    it('renders correctly', () => {
        const options = library.getNames().map(
            (name) => `<option value="${name}">${name}</option>`,
        );
        expect(library.print('select')).toBe(options.join(''));
    });

    it('can select the correct method', () => {
        const names = library.getNames();
        const options = names.map(
            (name) => `<option value="${name}">${name}</option>`,
        );
        options[4] =
            `<option selected value="${names[4]}">${names[4]}</option>`;

        expect(library.print('select', { selected: names[4] }))
            .toBe(options.join(''));
    });

});
