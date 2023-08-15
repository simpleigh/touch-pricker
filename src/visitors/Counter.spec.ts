/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { rowFromString, Stage } from '../rows';
import testAbstractVisitorImplementation from './testAbstractVisitorImplementation';
import Counter from './Counter';

describe('Counter visitor', () => {
    it('has a count that starts from zero', () => {
        const visitor = new Counter();
        expect(visitor.count).toBe(0);
    });

    it('increments the count when it visits a row', () => {
        const visitor = new Counter();
        for (let i = 1; i < 5; i += 1) {
            visitor.visit(rowFromString('2143', Stage.Minimus));
            expect(visitor.count).toBe(i);
        }
    });

    testAbstractVisitorImplementation(
        () => new Counter(),
        (visitor) => (visitor as Counter).count,
    );
});
