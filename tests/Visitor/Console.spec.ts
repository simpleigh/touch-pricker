/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../functions.ts" />
/// <reference path="AbstractVisitor.spec.ts" />

describe('Console visitor', () => {

    const consoleBackup = console;

    beforeEach(() => {
        // Replace window.console in case it doesn't behave as expected (IE8)
        // tslint:disable-next-line:no-object-literal-type-assertion
        console = { } as Console;
        console.log = () => { /* NOOP */ };
        spyOn(console, 'log');
    });

    afterEach(() => {
        console = consoleBackup;
    });

    it('logs to the console when it visits a row', () => {
        const visitor = new Pricker.Visitor.Console();
        visitor.visit(createTestRow());
        expect(console.log).toHaveBeenCalledWith('2314567890E');
    });

    testAbstractVisitorImplementation(
        () => new Pricker.Visitor.Console(),
        (visitor: Pricker.Visitor.Console): string[] => {
            // Use string literal as TypeScript doesn't know about the property
            // tslint:disable-next-line:no-string-literal
            return console.log['calls'].allArgs();
        },
    );

});
