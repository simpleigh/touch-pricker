/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { Call } from '../../leads';
import { rounds, Stage } from '../../rows';
import Lead from '.';

describe('siril template for Grandsire Lead', () => {
    let lead: Lead;

    beforeEach(() => {
        lead = new Lead(rounds(Stage.Doubles));
    });

    it('renders a plain lead', () => {
        expect(lead.print('siril')).toBe('plain, ');
    });

    it('renders a bobbed lead', () => {
        lead.setCall(Call.Bob);
        expect(lead.print('siril')).toBe('bob, ');
    });

    it('renders a singled lead', () => {
        lead.setCall(Call.Single);
        expect(lead.print('siril')).toBe('single, ');
    });

    it('renders the whole lead when enough rows are needed', () => {
        expect(lead.print('siril', { touchRows: 10 })).toBe('plain, ');
    });

    it('renders place notation when fewer rows are needed', () => {
        expect(lead.print('siril', { touchRows: 9 })).toBe(
            '+3.1.5.1.5.1.5.1.5, ',
        );
    });
});
