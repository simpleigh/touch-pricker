/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Lead from '.';
import { rowFromString, Stage, stringFromRow } from '../../rows';
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
        expect(lead.print('html')).toBe(
            stringFromRow(lead.getLast())
                + '&nbsp;&nbsp;1<br />',
        );
    });

    it('displays the index correctly', () => {
        lead = createTestLead(999);
        expect(lead.print('html')).toBe(
            stringFromRow(lead.getLast())
                + '&nbsp;&nbsp;999<br />',
        );
    });

    it('can underline a lead head', () => {
        expect(lead.print('html', { underline: true })).toBe(
            '<u>'
                + stringFromRow(lead.getLast())
                + '</u>'
                + '&nbsp;&nbsp;1<br />',
        );
    });

});
