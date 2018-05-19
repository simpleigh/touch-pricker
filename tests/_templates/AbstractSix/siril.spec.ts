/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../functions.ts" />

/**
 * Tests the template behaves like the parent version
 * @param Six       six to test
 */
// tslint:disable-next-line:variable-name
function testSirilAbstractSixTemplate(Six) {

    describe('is a siril template', () => {
        let six;

        let type: string;

        beforeEach(() => {
            six = new Six(createTestRow());
            type = Pricker.SixType[six.type].toLowerCase();
        });

        it('renders a six correctly', () => {
            expect(six.print('siril')).toBe('plain, ' + type + ', ');
        });

        it('renders a bobbed six', () => {
            six.setCall(Pricker.Call.Bob);
            expect(six.print('siril')).toBe('bob, ' + type + ', ');
        });

        it('renders a singled six', () => {
            six.setCall(Pricker.Call.Single);
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

}

describe('siril template for Quick six', () => {
    testSirilAbstractSixTemplate(Pricker.Quick);
});

describe('siril template for Slow six', () => {
    testSirilAbstractSixTemplate(Pricker.Slow);
});
