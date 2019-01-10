/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import { createTestRow } from '../testFunctions.spec';
import { testAbstractVisitorImplementation } from './AbstractVisitor.spec';
import StringArray from './StringArray';

describe('StringArray visitor', () => {

    let visitor: StringArray;

    beforeEach(() => { visitor = new StringArray(); });

    it('has a list of strings that starts empty', () => {
        expect(visitor.strings).toEqual([ ]);
    });

    it('stores a string when it visits a row', () => {
        visitor.visit(createTestRow('2314567890E'));
        visitor.visit(createTestRow('3241658709E'));
        expect(visitor.strings).toEqual(['2314567890E', '3241658709E']);
    });

    it('ignores changes to the result', () => {
        const getStrings = visitor.strings;
        getStrings.push('test');  // Mutate the getStrings result
        expect(visitor.strings).not.toEqual(getStrings);
        expect(visitor.strings).toEqual([ ]);
    });

    testAbstractVisitorImplementation(
        () => new StringArray(),
        (testVisitor) => (testVisitor as StringArray).strings,
    );

});
