function createFormatTests(
    Format,
    methodTests: [string, string][],
    callTests: [Pricker.Call, number, string][]
) {

    return function () {

        it('starts with an empty buffer', function () {
            let format: Pricker.Output.Format.AbstractFormat = new Format();
            expect(format.getBuffer()).toEqual('');
        });

        it('allows arbitrary text to be written to the buffer', function () {
            let format: Pricker.Output.Format.AbstractFormat = new Format(),
                testString: string = 'arbitrary test string';

            format.print(testString);
            expect(format.getBuffer()).toEqual(testString);
        });

        it('stores more text to the buffer', function () {
            let format: Pricker.Output.Format.AbstractFormat = new Format();

            format.print('string1').print('string2');
            expect(format.getBuffer()).toEqual('string1string2');
        });

        it('allows the buffer to be cleared', function () {
            let format: Pricker.Output.Format.AbstractFormat = new Format();

            format.print('arbitrary test string').clearBuffer();
            expect(format.getBuffer()).toEqual('');
        });

        it('outputs text in response to method calls', function () {
            let format: Pricker.Output.Format.AbstractFormat = new Format(),
                i: number;

            for (i = 0; i < methodTests.length; i++) {
                format.clearBuffer();
                format[methodTests[i][0]]();
                expect(format.getBuffer()).toEqual(methodTests[i][1]);
            }
        });

        it('outputs rows', function () {
            let format: Pricker.Output.Format.AbstractFormat = new Format();

            format.printRow(Pricker.rowFromString('231', Pricker.Stage.Caters));
            expect(format.getBuffer()).toEqual('231456789');
        });

        it('outputs calls', function () {
            let format: Pricker.Output.Format.AbstractFormat = new Format(),
                i: number;

            for (i = 0; i < callTests.length; i++) {
                format
                    .clearBuffer()
                    .printCall(callTests[i][0], callTests[i][1]);
                expect(format.getBuffer()).toEqual(callTests[i][2]);
            }
        });

    }

}
