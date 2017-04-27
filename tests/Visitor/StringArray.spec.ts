/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractVisitor.spec.ts" />

describe('StringArray visitor', function () {

    it('has a list of strings that starts empty', function () {
        const visitor: Pricker.Visitor.StringArray =
                new Pricker.Visitor.StringArray();

        expect(visitor.getStrings()).toEqual([ ]);
    });

    it('stores a string when it visits a row', function () {
        const visitor: Pricker.Visitor.StringArray =
                new Pricker.Visitor.StringArray(),
            row1: Pricker.Row =
                Pricker.rowFromString('2314567890E', Pricker.Stage.Cinques),
            row2: Pricker.Row =
                Pricker.rowFromString('3241658709E', Pricker.Stage.Cinques);

        visitor.visit(row1);
        visitor.visit(row2);

        expect(visitor.getStrings()).toEqual(['2314567890E', '3241658709E']);
    });

    it('ignores changes to the result', function () {
        const visitor: Pricker.Visitor.StringArray =
                new Pricker.Visitor.StringArray(),
            getStrings: string[] = visitor.getStrings();

        getStrings.push('test');  // Mutate the getStrings result

        expect(visitor.getStrings()).not.toEqual(getStrings);
        expect(visitor.getStrings()).toEqual([ ]);
    });

    testAbstractVisitorImplementation(
        function (): Pricker.Visitor.StringArray {
            return new Pricker.Visitor.StringArray();
        },
        function (visitor: Pricker.Visitor.StringArray): string[] {
            return visitor.getStrings();
        },
    );

});
