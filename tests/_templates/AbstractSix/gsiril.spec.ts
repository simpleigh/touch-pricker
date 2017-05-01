/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../functions.ts" />

/**
 * Tests the template behaves like the parent version
 * @param {AbstractSix}  Six      - six to test
 * @param {string}       type     - six type
 * @param {string[]}     notation - array of place notation
 */
// tslint:disable-next-line:variable-name
function testGsirilAbstractSixTemplate(Six, type: string, notation: string[]) {

    describe('is a gsiril template', function () {

        it('renders a six correctly', function () {
            const six = new Six(createTestRow());
            expect(six.print('gsiril')).toBe('plain,' + type + ',');
        });

        it('renders a bobbed six', function () {
            const six = new Six(createTestRow());
            six.setCall(Pricker.Call.Bob);
            expect(six.print('gsiril')).toBe('bob,' + type + ',');
        });

        it('renders a singled six', function () {
            const six = new Six(createTestRow());
            six.setCall(Pricker.Call.Single);
            expect(six.print('gsiril')).toBe('single,' + type + ',');
        });

        it('renders just the call when only one row is needed', function () {
            const six = new Six(createTestRow());
            expect(six.print('gsiril', {'touchRows': 1})).toBe('plain,');
        });

        it('renders the whole six when six rows are needed', function () {
            const six = new Six(createTestRow());
            expect(six.print('gsiril', {'touchRows': 6}))
                .toBe('plain,' + type + ',');
        });

        it('renders place notation for lengths in between', function () {
            const six = new Six(createTestRow());
            for (let touchRows: number = 2; touchRows <= 5; touchRows += 1) {
                expect(six.print('gsiril', {'touchRows': touchRows})).toBe(
                    'plain,+'
                        + notation.slice(0, touchRows - 1).join('.')
                        + ',',
                );
            }
        });

    });

}
