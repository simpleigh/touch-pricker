/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { createTestRow } from '../testFunctions.spec';
import { testAbstractVisitorImplementation } from './AbstractVisitor.spec';
import Counter from './Counter';

describe('Counter visitor', () => {

    it('has a count that starts from zero', () => {
        const visitor = new Counter();
        expect(visitor.count).toBe(0);
    });

    it('increments the count when it visits a row', () => {
        const visitor = new Counter();
        for (let i = 1; i < 5; i += 1) {
            visitor.visit(createTestRow());
            expect(visitor.count).toBe(i);
        }
    });

    testAbstractVisitorImplementation(
        () => new Counter(),
        (visitor) => (visitor as Counter).count,
    );

});
