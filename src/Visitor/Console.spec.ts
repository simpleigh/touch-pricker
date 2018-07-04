/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { createTestRow } from '../testFunctions.spec';
import { testAbstractVisitorImplementation } from './AbstractVisitor.spec';
import ConsoleVisitor from './Console';

describe('Console visitor', () => {

    const consoleBackup = console;

    // Simple record of state (count of calls)
    let state: number;

    beforeEach(() => {
        state = 0;

        // Replace window.console in case it doesn't behave as expected (IE8)
        // tslint:disable-next-line:no-object-literal-type-assertion
        console = { } as Console;
        console.log = () => { state = state + 1; };
        spyOn(console, 'log');
    });

    afterEach(() => {
        console = consoleBackup;
    });

    it('logs to the console when it visits a row', () => {
        const visitor = new ConsoleVisitor();
        visitor.visit(createTestRow());
        expect(console.log).toHaveBeenCalledWith('2314567890E');
    });

    testAbstractVisitorImplementation(
        () => new ConsoleVisitor(),
        (visitor) => state,
    );

});
