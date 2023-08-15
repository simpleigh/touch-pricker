/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { rowFromString, Stage } from '../rows';
import testAbstractVisitorImplementation from './testAbstractVisitorImplementation';
import ConsoleVisitor from './Console';

describe('Console visitor', () => {
    // Simple record of state (count of calls)
    let state: number;

    beforeEach(() => {
        state = 0;

        jest.spyOn(window.console, 'log');
        (window.console.log as jest.Mock).mockImplementation(() => null);
    });

    it('logs to the console when it visits a row', () => {
        const visitor = new ConsoleVisitor();
        visitor.visit(rowFromString('2143', Stage.Minimus));
        // eslint-disable-next-line no-console
        expect(console.log).toHaveBeenCalledWith('2143');
    });

    testAbstractVisitorImplementation(
        () => new ConsoleVisitor(),
        (visitor) => state,
    );
});
