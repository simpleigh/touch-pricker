/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('Console visitor', function () {

    it('logs to the console when it visits a row', function () {
        const visitor: Pricker.Visitor.Console =
                new Pricker.Visitor.Console(),
            row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques),
            block: Pricker.AbstractBlock =
                jasmine.createSpyObj('AbstractBlock', ['setFlag']);

        spyOn(console, 'log');

        visitor.visit(row, block);
        expect(console.log).toHaveBeenCalledWith('2314567890E');
    });

    testAbstractVisitorImplementation(
        Pricker.Visitor.Console,
        function (visitor: Pricker.Visitor.Console): string[] {
            // Use string literal as TypeScript doesn't know about the property
            // tslint:disable-next-line:no-string-literal
            return console.log['calls'].allArgs();
        },
        function (): void {
            spyOn(console, 'log').and.callThrough();
        },
    );

});
