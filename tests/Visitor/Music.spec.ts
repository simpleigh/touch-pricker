/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractVisitor.spec.ts" />

describe('Music visitor', function () {

    it('allows access to the provided matcher', function () {
        const matcher: Pricker.Music.MatcherInterface =
                new Pricker.Music.MbdScheme(),
            visitor: Pricker.Visitor.Music = new Pricker.Visitor.Music(matcher);

        expect(visitor.getMatcher()).toBe(matcher);
    });

    it('matches rows using the provided matcher', function () {
        const matcher = jasmine.createSpyObj('MatcherInterface', ['match']),
            visitor: Pricker.Visitor.Music = new Pricker.Visitor.Music(matcher),
            row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques);

        visitor.visit(row);
        expect(matcher.match).toHaveBeenCalledWith(row);
    });

    testAbstractVisitorImplementation(
        function (): Pricker.Visitor.Music {
            return new Pricker.Visitor.Music(new Pricker.Music.MbdScheme());
        },
        function (visitor: Pricker.Visitor.Music): number {
            return visitor.getMatcher().getMatches();
        },
    );

});
