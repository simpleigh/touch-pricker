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
import { AbstractMethod, Erin, Stedman, StedmanJump } from '../methods';
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
        expect(touch.start.rowIndex).toBe(4);
        expect(touch.start.sixType).toBe(SixType.Quick);
    });

    it('allows access to the start for Erin', () => {
        touch = new Touch(testRow, undefined, new Erin());
        expect(touch.start.rowIndex).toBe(6);
        expect(touch.start.sixType).toBe(SixType.Slow);
    });

    it('allows access to the start for Stedman Jump', () => {
        touch = new Touch(testRow, undefined, new StedmanJump());
        expect(touch.start.rowIndex).toBe(6);
        expect(touch.start.sixType).toBe(SixType.Hot);
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

    describe('can create touches from strings:', () => {

        const testImport = (
            input: string,
            output: string,
            method: AbstractMethod = new Stedman(),
        ) => () => {
            const imported = Touch.fromString(input, method);
            expect(imported.print('text')).toBe(output);
        };

        it('a simple touch', testImport(
            '2314567890E\n'
                + '2314567890E  1 s10 s13 22\n',
            '2314567890E\n'
                + '2314567890E  1 s10 s13 22\n',
        ));

        it('a touch with more than one course', testImport(
            '2314567890E\n'
                + '2314568790E  1 s10 s13 s15 22\n'
                + '2314567890E  1 s10 s13 s15 22\n',
            '2314567890E\n'
                + '2314568790E  1 s10 s13 s15 22\n'
                + '2314567890E  1 s10 s13 s15 22\n',
        ));

        it('a touch that comes round at hand', testImport(
            '2314567890E\n'
                + '21436578E90  1 5 7 8 10 11 s13 15 16  (20 sixes)\n'
                + '2143658709E  2 s13 s15\n'
                + '2143658709E  p\n',
            '2314567890E\n'
                + '21436578E90  1 5 7 8 10 11 s13 15 16  (20 sixes)\n'
                + '2143658709E  2 s13 s15\n'
                + '2143658709E  p\n',
        ));

        it('a touch with extra spacing', testImport(
            '\t 2314567890E\t \n'
                + '2314567890E  1 s10 s13 22\n',
            '2314567890E\n'
                + '2314567890E  1 s10 s13 22\n',
        ));

        it('a touch with a blank line', testImport(
            '2314567890E\n'
                + ' \t\n'
                + '2314567890E  1 s10 s13 22\n',
            '2314567890E\n'
                + '2314567890E  1 s10 s13 22\n',
        ));

        it('a touch with microsiril comments', testImport(
            '2314567890E\n'
                + '/2314567890E  1 s10 s13 22\n',
            '2314567890E\n'
                + '2314567890E  1 s10 s13 22\n',
        ));

        it('a touch with a "//" comment line', testImport(
            '2314567890E\n'
                + '// comment\n'
                + '2314567890E  1 s10 s13 22\n',
            '2314567890E\n'
                + '2314567890E  1 s10 s13 22\n',
        ));

        it('a touch with an included "//" comment', testImport(
            '2314567890E\n'
                + '2314567890E  1 s10 s13 22  // turn 78\n',
            '2314567890E\n'
                + '2314567890E  1 s10 s13 22\n',
        ));

        it('a touch with a start', testImport(
            '321547698E0\n'
                + '3765421E098  1 s10 s13 22\n'
                + 'Start from rounds as the third row of a slow six.\n',
            '321547698E0\n'
                + '3765421E098  1 s10 s13 22\n'
                + 'Start from rounds as the third row of a slow six.\n',
        ));

        it('a touch of Erin', testImport(
            '1234567890E\n'
                + '4321567890E  6 7\n'
                + '1234567890E  6 7\n',
            '1234567890E\n'
                + '4321567890E  6 7\n'
                + '1234567890E  6 7\n',
            new Erin(),
        ));

        it('a touch of Stedman Jump', testImport(
            '1234567890E\n'
                + '4321567890E  6 7\n'
                + '1234567890E  6 7\n',
            '1234567890E\n'
                + '4321567890E  6 7\n'
                + '1234567890E  6 7\n',
            new StedmanJump(),
        ));

        it('a touch with no lines', () => {
            expect(() => {
                Touch.fromString('');
            }).toThrowError('No input lines');
        });

        it('a touch with a broken initial row', () => {
            expect(() => {
                Touch.fromString('not');
            }).toThrowError('Cannot recognise stage');
        });

        it('a touch with a broken course', () => {
            expect(() => {
                Touch.fromString(
                    '2314567890E\n'
                        + 'garbage\n',
                );
            }).toThrowError('Cannot import course');
        });

    });

    it('passes the method to all children when creating touches', () => {
        const method = new Stedman();
        touch = Touch.fromString(
            '1234567890E\n'
                + '4321567890E  6 7\n'
                + '1234567890E  6 7\n',
            method,
        );

        expect(touch.start.method).toBe(method);
        expect(touch.getBlock(1).method).toBe(method);
        expect(touch.getBlock(2).method).toBe(method);
    });

});
