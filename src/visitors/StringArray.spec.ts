/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { rowFromString, Stage } from '../rows';
import { testAbstractVisitorImplementation } from './AbstractVisitor.spec';
import StringArray from './StringArray';

describe('StringArray visitor', () => {

    let visitor: StringArray;

    beforeEach(() => { visitor = new StringArray(); });

    it('has a list of strings that starts empty', () => {
        expect(visitor.strings).toEqual([]);
    });

    it('stores a string when it visits a row', () => {
        visitor.visit(rowFromString('2143', Stage.Minimus));
        visitor.visit(rowFromString('2413', Stage.Minimus));
        expect(visitor.strings).toEqual(['2143', '2413']);
    });

    it('ignores changes to the result', () => {
        const getStrings = visitor.strings;
        getStrings.push('test');  // Mutate the getStrings result
        expect(visitor.strings).not.toEqual(getStrings);
        expect(visitor.strings).toEqual([]);
    });

    testAbstractVisitorImplementation(
        () => new StringArray(),
        (testVisitor) => (testVisitor as StringArray).strings,
    );

});
