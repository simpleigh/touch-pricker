/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { hide, show } from './showHide';

describe('hide DOM utility', () => {
    it('hides an element', () => {
        const element = { style: { display: 'block', visibility: 'visible' } };
        hide(element as HTMLElement);
        expect(element.style.display).toBe('none');
        expect(element.style.visibility).toBe('hidden');
    });
});

describe('show DOM utility', () => {
    it('shows an element', () => {
        const element = { style: { display: 'none', visibility: 'hidden' } };
        show(element as HTMLElement);
        expect(element.style.display).toBe('');
        expect(element.style.visibility).toBe('visible');
    });
});
