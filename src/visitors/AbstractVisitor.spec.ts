/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import AbstractVisitor from './AbstractVisitor';
import { rounds, rowFromString, Stage } from '../rows';

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

        const testRow = rowFromString('2143', Stage.Minimus);

        let visitor: AbstractVisitor;

        beforeEach(() => { visitor = createFn(); });

        it('returns this when processing a row', () => {
            expect(visitor.visit(testRow)).toBe(visitor);
        });

        it('starts out processing rows', () => {
            expect(visitor.visiting).toBe(true);
        });

        it('stops processing rows after rounds is reached', () => {
            visitor.visit(testRow);
            visitor.visit(rounds(Stage.Minimus));
            expect(visitor.visiting).toBe(false);
        });

        it('stops changing its state when not processing', () => {
            let result: any;

            visitor.visit(testRow);
            visitor.visit(rounds(Stage.Minimus));
            result = getState(visitor);

            visitor.visit(testRow);
            expect(getState(visitor)).toEqual(result);
        });

    });

};
