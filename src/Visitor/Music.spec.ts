/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import Course from '../Course';
import MbdScheme from '../Music/MbdScheme';
import { Stage } from '../rows';
import { createTestRow } from '../testFunctions.spec';
import Touch from '../Touch';
import { testAbstractVisitorImplementation } from './AbstractVisitor.spec';
import Music from './Music';

describe('Music visitor', () => {

    const testRow = createTestRow();

    let matcher: any;

    let visitor: Music;

    let touch: Touch;

    beforeAll(() => {
        touch = new Touch(testRow);
        touch.insertBlock(1, new Course(testRow));
        touch.insertBlock(2, new Course(testRow));
    });

    beforeEach(() => {
        matcher = jasmine.createSpyObj('MatcherInterface', ['match']);
        visitor = new Music(matcher);
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
        expect(visitor.getDirectory().contains(touch.getCourse(1).getSix(3)))
            .toBe(true);
    });

    it('does not add unmatched blocks to the directory', () => {
        matcher.match.and.returnValue(false);

        visitor.visit(testRow, touch.getCourse(1).getSix(3));
        expect(visitor.getDirectory().contains(touch.getCourse(1).getSix(3)))
            .toBe(false);
    });

    testAbstractVisitorImplementation(
        () => new Music(new MbdScheme(Stage.Cinques)),
        (testVisitor) => (testVisitor as Music).getMatcher().getMatchCount(),
    );

});
