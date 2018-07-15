/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import AbstractSix from '.';
import { BlockOwnership } from '../blocks';
import Call from '../Call';
import Quick from '../Quick';
import { Row } from '../rows';
import SixType from '../SixType';
import Slow from '../Slow';
import { createTestRow } from '../testFunctions.spec';

/**
 * Tests the template behaves like the parent version
 * @param Six       six to test
 */
const testSirilAbstractSixTemplate = (
    factory: (initialRow: Row, _ownership?: BlockOwnership) => AbstractSix,
) => () => {

    describe('is a siril template', () => {
        let six: AbstractSix;

        let type: string;

        beforeEach(() => {
            six = factory(createTestRow());
            type = SixType[six.type].toLowerCase();
        });

        it('renders a six correctly', () => {
            expect(six.print('siril')).toBe('plain, ' + type + ', ');
        });

        it('renders a bobbed six', () => {
            six.setCall(Call.Bob);
            expect(six.print('siril')).toBe('bob, ' + type + ', ');
        });

        it('renders a singled six', () => {
            six.setCall(Call.Single);
            expect(six.print('siril')).toBe('single, ' + type + ', ');
        });

        it('renders just the call when only one row is needed', () => {
            expect(six.print('siril', {'touchRows': 1})).toBe('plain, ');
        });

        it('renders the whole six when six rows are needed', () => {
            expect(six.print('siril', {'touchRows': 6}))
                .toBe('plain, ' + type + ', ');
        });

        it('renders place notation for lengths in between', () => {
            for (let touchRows: number = 2; touchRows <= 5; touchRows += 1) {
                expect(six.print('siril', {'touchRows': touchRows})).toBe(
                    'plain, +'
                        + six.notation.slice(0, touchRows - 1).join('.')
                        + ', ',
                );
            }
        });

    });

};

describe('siril template for Quick six', testSirilAbstractSixTemplate(
    (initialRow, _ownership) => new Quick(initialRow, _ownership),
));

describe('siril template for Slow six', testSirilAbstractSixTemplate(
    (initialRow, _ownership) => new Slow(initialRow, _ownership),
));
