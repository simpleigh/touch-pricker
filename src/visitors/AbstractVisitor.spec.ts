/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { createTestRow } from '../testFunctions.spec';
import AbstractVisitor from './AbstractVisitor';

/**
 * Tests that a visitor behaves as an AbstractVisitor
 * @param createFn   fn to create visitor under test
 * @param getState   fn that returns the visitor's state
 */
export const testAbstractVisitorImplementation = (
    // tslint:disable-next-line:variable-name
    createFn: () => AbstractVisitor,
    getState: (visitor: AbstractVisitor) => any,
) => {

    describe('is derived from AbstractVisitor and', () => {

        let visitor: AbstractVisitor;

        beforeEach(() => { visitor = createFn(); });

        it('returns this when processing a row', () => {
            expect(visitor.visit(createTestRow())).toBe(visitor);
        });

        it('starts out processing rows', () => {
            expect(visitor.isVisiting()).toBe(true);
        });

        it('stops processing rows after rounds is reached', () => {
            visitor.visit(createTestRow());
            visitor.visit(createTestRow('123'));
            expect(visitor.isVisiting()).toBe(false);
        });

        it('stops changing its state when not processing', () => {
            let result: any;

            visitor.visit(createTestRow());
            visitor.visit(createTestRow('123'));
            result = getState(visitor);

            visitor.visit(createTestRow());
            expect(getState(visitor)).toEqual(result);
        });

    });

};
