/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import AbstractLibrary from './AbstractLibrary';

class Library extends AbstractLibrary<string> { }

describe('select template for AbstractLibrary', () => {
    const library = new Library({
        'name1': 'value1',
        'name2': 'value2',
        'name3': 'value3',
        'name4': 'value4',
        'name5': 'value5',
    });

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
