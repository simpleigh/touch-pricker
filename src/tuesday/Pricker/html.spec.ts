/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Pricker from '.';

describe('html template for Tuesday pricker', () => {

    const element = document.createElement('div');

    beforeAll(() => {
        const pricker = new Pricker();
        element.innerHTML = pricker.print('html');
    });

    it('renders a div to display leads', () => {
        const leadheads = element.getElementsByTagName('div')[0];
        expect(leadheads).toBeDefined();
        expect(leadheads.id).toBe('leadheads');
    });

});
