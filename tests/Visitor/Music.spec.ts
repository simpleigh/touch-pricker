/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../functions.ts" />
/// <reference path="AbstractVisitor.spec.ts" />

describe('Music visitor', function () {

    it('allows access to the provided matcher', function () {
        const matcher = new Pricker.Music.MbdScheme(Pricker.Stage.Cinques),
            visitor = new Pricker.Visitor.Music(matcher);
        expect(visitor.getMatcher()).toBe(matcher);
    });

    it('matches rows using the provided matcher', function () {
        const matcher = jasmine.createSpyObj('MatcherInterface', ['match']),
            visitor = new Pricker.Visitor.Music(matcher);
        visitor.visit(createTestRow());
        expect(matcher.match).toHaveBeenCalledWith('2314567890E');
    });

    it('builds up an directory that starts out empty', function () {
        const matcher = new Pricker.Music.MbdScheme(Pricker.Stage.Cinques),
            visitor = new Pricker.Visitor.Music(matcher);
        expect(visitor.getDirectory().isEmpty()).toBe(true);
    });

    it('adds matched blocks to the directory', function () {
        const matcher = jasmine.createSpyObj('MatcherInterface', ['match']),
            visitor = new Pricker.Visitor.Music(matcher),
            touch = new Pricker.Touch(createTestRow());

        matcher.match.and.returnValue(true);
        touch.setLength(2);

        visitor.visit(createTestRow(), touch.getCourse(1).getSix(3));
        expect(
            visitor.getDirectory().contains(touch.getCourse(1).getSix(3)),
        ).toBe(true);
    });

    it('does not add unmatched blocks to the directory', function () {
        const matcher = jasmine.createSpyObj('MatcherInterface', ['match']),
            visitor = new Pricker.Visitor.Music(matcher),
            touch = new Pricker.Touch(createTestRow());

        matcher.match.and.returnValue(false);
        touch.setLength(2);

        visitor.visit(createTestRow(), touch.getCourse(1).getSix(3));
        expect(
            visitor.getDirectory().contains(touch.getCourse(1).getSix(3)),
        ).toBe(false);
    });

    testAbstractVisitorImplementation(
        () => new Pricker.Visitor.Music(
            new Pricker.Music.MbdScheme(Pricker.Stage.Cinques),
        ),
        (visitor: Pricker.Visitor.Music) =>
            visitor.getMatcher().getMatchCount(),
    );

});
