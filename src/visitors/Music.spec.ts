/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Course, Touch } from '../blocks/testBlocks.spec';
import { AbstractMatcher, MbdScheme } from '../music';
import { rounds, rowFromString, Stage } from '../rows';
import { testAbstractVisitorImplementation } from './AbstractVisitor.spec';
import Music from './Music';

describe('Music visitor', () => {

    const testRow = rowFromString('2143', Stage.Minimus);

    const createTestCourse = (): Course => {
        const course = new Course(testRow);
        course.resetLength();
        return course;
    };

    let matcher: jasmine.SpyObj<AbstractMatcher>;

    let visitor: Music;

    let touch: Touch;

    beforeAll(() => {
        touch = new Touch(testRow);
        touch.insertBlock(1, createTestCourse());
        touch.insertBlock(2, createTestCourse());
    });

    beforeEach(() => {
        matcher = jasmine.createSpyObj('AbstractMatcher', ['match']);
        visitor = new Music(matcher);
    });

    it('allows access to the provided matcher', () => {
        expect(visitor.matcher).toBe(matcher);
    });

    it('matches rows using the provided matcher', () => {
        visitor.visit(testRow);
        expect(matcher.match).toHaveBeenCalledWith('2143');
    });

    it('avoids matching rounds', () => {
        visitor.visit(rounds(Stage.Minimus));
        expect(matcher.match).not.toHaveBeenCalled();
    });

    it('builds up an directory that starts out empty', () => {
        expect(visitor.directory.empty).toBe(true);
    });

    it('adds matched blocks to the directory', () => {
        matcher.match.and.returnValue(true);

        visitor.visit(testRow, touch.getBlock(1).getBlock(3));
        expect(visitor.directory.contains(touch.getBlock(1).getBlock(3)))
            .toBe(true);
    });

    it('does not add unmatched blocks to the directory', () => {
        matcher.match.and.returnValue(false);

        visitor.visit(testRow, touch.getBlock(1).getBlock(3));
        expect(visitor.directory.contains(touch.getBlock(1).getBlock(3)))
            .toBe(false);
    });

    testAbstractVisitorImplementation(
        () => new Music(new MbdScheme(Stage.Cinques)),
        (testVisitor) => (testVisitor as Music).matcher.matchCount,
    );

});
