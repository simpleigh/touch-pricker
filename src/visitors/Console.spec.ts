/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import { createTestRow } from '../testFunctions.spec';
import { testAbstractVisitorImplementation } from './AbstractVisitor.spec';
import ConsoleVisitor from './Console';

describe('Console visitor', () => {

    // Simple record of state (count of calls)
    let state: number;

    beforeEach(() => {
        state = 0;
        spyOn(window.console, 'log');
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
