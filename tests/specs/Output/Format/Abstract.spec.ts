/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

function createFormatTests(
    Format,
    methodTests: [string, string][],
    callTests: [Pricker.Call, number, string][]
) {

    return function () {

        it('starts with an empty buffer', function () {
            let format: Pricker.Output.Format.AbstractFormat = new Format();
            expect(format.getBuffer()).toBe('');
        });

        it('allows arbitrary text to be written to the buffer', function () {
            let format: Pricker.Output.Format.AbstractFormat = new Format(),
                testString: string = 'arbitrary test string';

            format.print(testString);
            expect(format.getBuffer()).toBe(testString);
        });

        it('returns `this` when text is printed', function () {
            let format: Pricker.Output.Format.AbstractFormat = new Format();
            expect(format.print('')).toBe(format);
        });

        it('stores more text to the buffer', function () {
            let format: Pricker.Output.Format.AbstractFormat = new Format();

            format.print('string1').print('string2');
            expect(format.getBuffer()).toBe('string1string2');
        });

        it('allows the buffer to be cleared', function () {
            let format: Pricker.Output.Format.AbstractFormat = new Format();

            format.print('arbitrary test string').clearBuffer();
            expect(format.getBuffer()).toBe('');
        });

        it('returns `this` when clearing the buffer', function () {
            let format: Pricker.Output.Format.AbstractFormat = new Format();
            expect(format.clearBuffer()).toBe(format);
        });

        it('outputs text in response to method calls', function () {
            let format: Pricker.Output.Format.AbstractFormat = new Format(),
                i: number;

            for (i = 0; i < methodTests.length; i++) {
                format.clearBuffer();
                format[methodTests[i][0]]();
                expect(format.getBuffer()).toBe(methodTests[i][1]);
            }
        });

        it('returns `this` from each method call', function () {
            let format: Pricker.Output.Format.AbstractFormat = new Format(),
                i: number;

            for (i = 0; i < methodTests.length; i++) {
                expect(format[methodTests[i][0]]()).toBe(format);
            }
        });

        it('outputs rows', function () {
            let format: Pricker.Output.Format.AbstractFormat = new Format(),
                row: Pricker.Row = Pricker.rowFromString(
                    '231',
                    Pricker.Stage.Cinques
                );

            expect(format.printRow(row)).toBe(format);
            expect(format.getBuffer()).toBe('2314567890E');
        });

        it('outputs calls', function () {
            let format: Pricker.Output.Format.AbstractFormat = new Format(),
                i: number;

            for (i = 0; i < callTests.length; i++) {
                format.clearBuffer();
                expect(
                    format.printCall(callTests[i][0], callTests[i][1])
                ).toBe(format);
                expect(format.getBuffer()).toBe(callTests[i][2]);
            }
        });

    }

}
