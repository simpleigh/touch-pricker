/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractVisitor.spec.ts" />

describe('StringArray visitor', function () {

    let visitor: Pricker.Visitor.StringArray;

    beforeEach(() => { visitor = new Pricker.Visitor.StringArray(); });

    it('has a list of strings that starts empty', function () {
        expect(visitor.getStrings()).toEqual([ ]);
    });

    it('stores a string when it visits a row', function () {
        visitor.visit(createTestRow('2314567890E'));
        visitor.visit(createTestRow('3241658709E'));
        expect(visitor.getStrings()).toEqual(['2314567890E', '3241658709E']);
    });

    it('ignores changes to the result', function () {
        const getStrings = visitor.getStrings();
        getStrings.push('test');  // Mutate the getStrings result
        expect(visitor.getStrings()).not.toEqual(getStrings);
        expect(visitor.getStrings()).toEqual([ ]);
    });

    testAbstractVisitorImplementation(
        () => new Pricker.Visitor.StringArray(),
        (testVisitor: Pricker.Visitor.StringArray) => testVisitor.getStrings(),
    );

});
