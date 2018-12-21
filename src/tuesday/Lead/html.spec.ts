/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Lead from '.';
import { rowFromString, Stage, stringFromRow } from '../../rows';
import library from '../library';
import Touch from '../Touch';

describe('html template for Lead', () => {

    let lead: Lead;

    const createTestLead = (index: number): Lead => {
        const initialRow = rowFromString('', Stage.Maximus);
        const container: Touch = jasmine.createSpyObj('Touch', ['notify']);
        return new Lead(initialRow, { container, index });
    };

    beforeEach(() => {
        lead = createTestLead(1);
    });

    it('renders a lead correctly', () => {
        expect(lead.print('html')).toBe(''
            + stringFromRow(lead.getLast())
            + '&nbsp;&nbsp;'
            + '<select id="method1" onChange="pricker.onMethod(1)">'
            + library.print('select', { selected: 'Bristol' })
            + '</select>'
            + '&nbsp;&nbsp;'
            + '1<br />',
        );
    });

    it('can underline a lead head', () => {
        expect(lead.print('html', { underline: true })).toBe(''
            + '<u>'
            + stringFromRow(lead.getLast())
            + '</u>'
            + '&nbsp;&nbsp;'
            + '<select id="method1" onChange="pricker.onMethod(1)">'
            + library.print('select', { selected: 'Bristol' })
            + '</select>'
            + '&nbsp;&nbsp;'
            + '1<br />',
        );
    });

    it('passes the method to the library selector', () => {
        lead.method = 'Cambridge';
        expect(lead.print('html')).toBe(''
            + stringFromRow(lead.getLast())
            + '&nbsp;&nbsp;'
            + '<select id="method1" onChange="pricker.onMethod(1)">'
            + library.print('select', { selected: 'Cambridge' })
            + '</select>'
            + '&nbsp;&nbsp;'
            + '1<br />',
        );
    });

    it('displays the index correctly', () => {
        lead = createTestLead(999);
        expect(lead.print('html')).toBe(''
            + stringFromRow(lead.getLast())
            + '&nbsp;&nbsp;'
            + '<select id="method999" onChange="pricker.onMethod(999)">'
            + library.print('select', { selected: 'Bristol' })
            + '</select>'
            + '&nbsp;&nbsp;'
            + '999<br />',
        );
    });

});
