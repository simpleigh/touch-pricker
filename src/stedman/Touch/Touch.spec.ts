/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import {
    testRandomAccessContainerImplementation,
} from '../../blocks/RandomAccessContainer.spec';
import { rounds, rowFromString, Stage } from '../../rows';
import { StringArray } from '../../visitors';
import Course from '../Course';
import { Erin, Stedman, StedmanJump } from '../methods';
import SixType from '../SixType';
import Touch from '.';

describe('Stedman Touch class', () => {

    const testRow = rounds(Stage.Cinques);

    testRandomAccessContainerImplementation(
        Stage.Cinques,
        (initialRow, _ownership) => {
            const testTouch = Touch.fromString(
                ''
                    + '1234567890E\n'
                    + '21345678E90  1 s7\n'
                    + '12345687E90  s7 s13 s15 s22\n'
                    + '1234567890E  12 14 s16 17 18 19  (20 sixes)\n'
                    + 'Start from rounds as the last row of a quick six.\n'
            );

            // remove the start so the touch becomes a true round block
            testTouch.start.rowIndex = 6;

            testTouch.initialRow = initialRow;
            if (_ownership) {
                testTouch.ownership = _ownership;
            }

            return testTouch;
        },
        384,
        3,
        Course.fromString(
            rounds(Stage.Cinques),
            '2314567890E 1 s10 s13 22',
        ),
    );

    const otherRow = rowFromString('4321', Stage.Cinques);

    let touch: Touch;

    beforeEach(() => {
        touch = new Touch(testRow);
    });

    it('allows access to the start for Stedman', () => {
        touch = new Touch(testRow, undefined, new Stedman());
        expect(touch.start.sixType).toBe(SixType.Quick);
        expect(touch.start.rowIndex).toBe(4);
    });

    it('allows access to the start for Erin', () => {
        touch = new Touch(testRow, undefined, new Erin());
        expect(touch.start.sixType).toBe(SixType.Slow);
        expect(touch.start.rowIndex).toBe(6);
    });

    it('allows access to the start for Stedman Jump', () => {
        touch = new Touch(testRow, undefined, new StedmanJump());
        expect(touch.start.sixType).toBe(SixType.Hot);
        expect(touch.start.rowIndex).toBe(6);
    });

    it('passes the initial row to the start', () => {
        touch = new Touch(otherRow);
        expect(touch.start.initialRow).toEqual(otherRow);
    });

    it('configures itself as the owner of the start', () => {
        expect(touch.start.container).toBe(touch);
    });

    it('passes the method to the start', () => {
        const method = new Stedman();
        touch = new Touch(testRow, undefined, method);
        expect(touch.start.method).toBe(method);
    });

    it('includes the start when visiting rows', () => {
        const startVisitor = new StringArray();
        const touchVisitor = new StringArray();

        touch.start.accept(startVisitor);
        touch.accept(touchVisitor);

        expect(touchVisitor.strings).toEqual(startVisitor.strings);
    });

    it('generates the correct rows when visited', () => {
        const course1 = new Course(testRow);
        const course2 = new Course(testRow);
        course1.setLength(11);
        course2.setLength(11);
        touch.insertBlock(1, course1);
        touch.insertBlock(2, course2);

        const blockVisitor = new StringArray();
        touch.start.accept(blockVisitor);
        touch.getBlock(1).accept(blockVisitor);
        touch.getBlock(2).accept(blockVisitor);

        const touchVisitor = new StringArray();
        touch.accept(touchVisitor);

        expect(touchVisitor.strings).toEqual(blockVisitor.strings);
    });

    it('includes the start in the estimate of rows', () => {
        expect(touch.estimateRows()).toBe(touch.start.estimateRows());
    });

    it('propagates the initialRow for the first block', () => {
        const course = new Course(otherRow);
        course.setLength(11);
        touch.insertBlock(1, course);

        expect(touch.getBlock(1).initialRow).toEqual(touch.start.getLast());
    });

    it('propagates the initialRow for a second block', () => {
        const course1 = new Course(testRow);
        const course2 = new Course(testRow);
        course1.setLength(11);
        course2.setLength(11);
        touch.insertBlock(1, course1);
        touch.insertBlock(2, course2);

        expect(touch.getBlock(2).initialRow)
            .toEqual(touch.getBlock(1).getLast());
    });

    it('propagates the six type for the first block in Stedman', () => {
        const course = new Course(otherRow);
        course.setLength(11);
        touch.insertBlock(1, course);

        expect(touch.getBlock(1).firstSixType).toBe(SixType.Slow);

        touch.start.sixType = SixType.Slow;
        expect(touch.getBlock(1).firstSixType).toBe(SixType.Quick);
    });

    it('propagates the six type for a second block in Stedman', () => {
        const course1 = new Course(testRow);
        const course2 = new Course(testRow);
        course1.setLength(11);
        course2.setLength(11);
        touch.insertBlock(1, course1);
        touch.insertBlock(2, course2);

        expect(touch.getBlock(2).firstSixType).toBe(SixType.Quick);

        touch.getBlock(1).setLength(12);
        expect(touch.getBlock(2).firstSixType).toBe(SixType.Slow);
    });

    it('uses the chosen method to propagate the first block six type', () => {
        const method = new Stedman();
        const spy = spyOn(method, 'getNextSixType');
        spy.and.returnValue(SixType.Quick); // should be slow
        touch = new Touch(testRow, undefined, method);

        const course = new Course(testRow);
        course.setLength(11);
        touch.insertBlock(1, course);

        expect(touch.getBlock(1).firstSixType).toBe(SixType.Quick);
    });

    it('uses the chosen method to propagate the second block six type', () => {
        const method = new Stedman();
        const spy = spyOn(method, 'getNextSixType');
        spy.and.returnValue(SixType.Slow); // should be quick
        touch = new Touch(testRow, undefined, method);

        const course1 = new Course(testRow);
        const course2 = new Course(testRow);
        course1.setLength(11);
        course2.setLength(11);
        touch.insertBlock(1, course1);
        touch.insertBlock(2, course2);

        expect(touch.getBlock(2).firstSixType).toBe(SixType.Slow);
    });

    it('provides read access to the method', () => {
        const method = new Stedman();
        touch = new Touch(testRow, undefined, method);
        expect(touch.method).toBe(method);
    });

    it('passes strings to a parser for loading', () => {
        const parser = jasmine.createSpyObj('Parser', ['parseTouch']);

        Touch.fromString('test', undefined, parser);

        expect(parser.parseTouch).toHaveBeenCalled();
        expect(parser.parseTouch).toHaveBeenCalledWith('test');
    });

    it('returns the parsed result', () => {
        const parser = jasmine.createSpyObj('Parser', ['parseTouch']);
        parser.parseTouch.and.returnValue(touch);

        const result = Touch.fromString('test', undefined, parser);

        expect(result).toBe(touch);
    });

    it('configures the parser with the correct method', () => {
        const method = new Erin();
        const parser = jasmine.createSpyObj('Parser', ['parseTouch']);

        Touch.fromString('test', method, parser);

        expect(parser.method).toBe(method);
    });

});
