/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../functions.ts" />
/// <reference path="AbstractVisitor.spec.ts" />

describe('Music visitor', function () {

    it('allows access to the provided matcher', function () {
        const matcher = new Pricker.Music.MbdScheme(Pricker.Stage.Cinques),
            visitor: Pricker.Visitor.Music = new Pricker.Visitor.Music(matcher);
        expect(visitor.getMatcher()).toBe(matcher);
    });

    it('matches rows using the provided matcher', function () {
        const matcher = jasmine.createSpyObj('MatcherInterface', ['match']),
            visitor = new Pricker.Visitor.Music(matcher),
            row: Pricker.Row = createTestRow();

        visitor.visit(row);
        expect(matcher.match).toHaveBeenCalledWith(row);
    });

    testAbstractVisitorImplementation(
        () => new Pricker.Visitor.Music(
            new Pricker.Music.MbdScheme(Pricker.Stage.Cinques),
        ),
        (visitor: Pricker.Visitor.Music) =>
            visitor.getMatcher().getMatchCount(),
    );

});
