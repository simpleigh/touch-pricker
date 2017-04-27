/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractVisitor.spec.ts" />

describe('Console visitor', function () {

    it('logs to the console when it visits a row', function () {
        const visitor: Pricker.Visitor.Console =
                new Pricker.Visitor.Console(),
            row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques);

        spyOn(console, 'log');

        visitor.visit(row);
        expect(console.log).toHaveBeenCalledWith('2314567890E');
    });

    testAbstractVisitorImplementation(
        function (): Pricker.Visitor.Console {
            return new Pricker.Visitor.Console();
        },
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
