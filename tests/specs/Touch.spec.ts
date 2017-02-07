/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractContainer.spec.ts" />

describe('Touch class', function () {

    it('generates the correct rows when visited', function () {
        const stage: Pricker.Stage = Pricker.Stage.Cinques,
            initialRow: Pricker.Row = Pricker.rowFromString('231', stage),
            touch: Pricker.Touch = new Pricker.Touch(initialRow);

        let visitor: Pricker.Visitor.StringArray,
            strings: string[] = [
                '213547698E0',
                '2314567890E'
            ];

        visitor = new Pricker.Visitor.StringArray();
        touch.setLength(1);
        touch.getCourse(1).accept(visitor);
        strings = strings.concat(visitor.getStrings());

        visitor = new Pricker.Visitor.StringArray();
        touch.accept(visitor);

        expect(visitor.getStrings()).toEqual(strings);
    });

    testAbstractContainerImplementation(
        Pricker.Touch,
        'getCourse',
        [
            [Pricker.Stage.Triples, 0],
            [Pricker.Stage.Caters, 0],
            [Pricker.Stage.Cinques, 0],
            [Pricker.Stage.Sextuples, 0],
            [Pricker.Stage.Septuples, 0],
        ],
        [0, 100]
    );
});
