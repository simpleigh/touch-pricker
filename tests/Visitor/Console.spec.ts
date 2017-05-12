/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../functions.ts" />
/// <reference path="AbstractVisitor.spec.ts" />

describe('Console visitor', function () {

    const consoleBackup = console;

    beforeEach(function () {
        // Replace window.console in case it doesn't behave as expected (IE8)
        // tslint:disable-next-line:no-object-literal-type-assertion
        console = { } as Console;
        console.log = function () { /* NOOP */ };
        spyOn(console, 'log');
    });

    afterEach(function () {
        console = consoleBackup;
    });

    it('logs to the console when it visits a row', function () {
        const visitor = new Pricker.Visitor.Console();
        visitor.visit(createTestRow());
        expect(console.log).toHaveBeenCalledWith('2314567890E');
    });

    testAbstractVisitorImplementation(
        () => new Pricker.Visitor.Console(),
        function (visitor: Pricker.Visitor.Console): string[] {
            // Use string literal as TypeScript doesn't know about the property
            // tslint:disable-next-line:no-string-literal
            return console.log['calls'].allArgs();
        },
    );

});
