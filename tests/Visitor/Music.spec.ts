/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="../functions.ts" />
/// <reference path="AbstractVisitor.spec.ts" />

describe('Music visitor', () => {

    const testRow = createTestRow();

    let matcher: any;

    let visitor: Pricker.Visitor.Music;

    let touch: Pricker.Touch;

    beforeAll(() => {
        touch = new Pricker.Touch(testRow);
        touch.insertBlock(1, new Pricker.Course(testRow));
        touch.insertBlock(2, new Pricker.Course(testRow));
    });

    beforeEach(() => {
        matcher = jasmine.createSpyObj('MatcherInterface', ['match']);
        visitor = new Pricker.Visitor.Music(matcher);
    });

    it('allows access to the provided matcher', () => {
        expect(visitor.getMatcher()).toBe(matcher);
    });

    it('matches rows using the provided matcher', () => {
        visitor.visit(testRow);
        expect(matcher.match).toHaveBeenCalledWith('2314567890E');
    });

    it('builds up an directory that starts out empty', () => {
        expect(visitor.getDirectory().isEmpty()).toBe(true);
    });

    it('adds matched blocks to the directory', () => {
        matcher.match.and.returnValue(true);

        visitor.visit(testRow, touch.getCourse(1).getSix(3));
        expect(
            visitor.getDirectory().contains(touch.getCourse(1).getSix(3)),
        ).toBe(true);
    });

    it('does not add unmatched blocks to the directory', () => {
        matcher.match.and.returnValue(false);

        visitor.visit(testRow, touch.getCourse(1).getSix(3));
        expect(
            visitor.getDirectory().contains(touch.getCourse(1).getSix(3)),
        ).toBe(false);
    });

    testAbstractVisitorImplementation(
        () => new Pricker.Visitor.Music(
            new Pricker.Music.MbdScheme(Pricker.Stage.Cinques),
        ),
        (testVisitor: Pricker.Visitor.Music) =>
            testVisitor.getMatcher().getMatchCount(),
    );

});
