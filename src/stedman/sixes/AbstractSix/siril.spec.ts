/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import AbstractSix from '.';
import { BlockOwnership } from '../../../blocks';
import { Row } from '../../../rows';
import { createTestRow } from '../../../testFunctions.spec';
import Call from '../../Call';
import Cold from '../Cold';
import Hot from '../Hot';
import Quick from '../Quick';
import Slow from '../Slow';

/**
 * Tests the template behaves like the parent version
 */
const testSirilAbstractSixTemplate = (
    factory: (initialRow: Row, _ownership?: BlockOwnership) => AbstractSix,
) => () => {

    describe('is a siril template', () => {
        let six: AbstractSix;

        beforeEach(() => {
            six = factory(createTestRow());
        });

        it('renders a six correctly', () => {
            expect(six.print('siril')).toBe('plain, ' + six.type + ', ');
        });

        it('renders a bobbed six', () => {
            six.setCall(Call.Bob);
            expect(six.print('siril')).toBe('bob, ' + six.type + ', ');
        });

        it('renders a singled six', () => {
            six.setCall(Call.Single);
            expect(six.print('siril')).toBe('single, ' + six.type + ', ');
        });

        it('renders just the call when only one row is needed', () => {
            expect(six.print('siril', { touchRows: 1 })).toBe('plain, ');
        });

        it('renders the whole six when six rows are needed', () => {
            expect(six.print('siril', { touchRows: 6 }))
                .toBe('plain, ' + six.type + ', ');
        });

        it('renders place notation for lengths in between', () => {
            for (let touchRows = 2; touchRows <= 5; touchRows += 1) {
                expect(six.print('siril', { touchRows }))
                    .toBe(`plain, ${six.getNotationString(touchRows - 1)}, `);
            }
        });

    });

};

describe('siril template for Slow six', testSirilAbstractSixTemplate(
    (initialRow, _ownership) => new Slow(initialRow, _ownership),
));

describe('siril template for Quick six', testSirilAbstractSixTemplate(
    (initialRow, _ownership) => new Quick(initialRow, _ownership),
));

describe('siril template for Cold six', testSirilAbstractSixTemplate(
    (initialRow, _ownership) => new Cold(initialRow, _ownership),
));

describe('siril template for Hot six', testSirilAbstractSixTemplate(
    (initialRow, _ownership) => new Hot(initialRow, _ownership),
));
