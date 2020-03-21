/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import {
    testRandomAccessContainerImplementation,
} from '../../blocks/RandomAccessContainer.spec';
import { rounds, Stage } from '../../rows';
import { StringArray } from '../../visitors';
import Call from '../Call';
import Course from '../Course';
import Touch from '.';

describe('Touch class', () => {

    const createTestCourse = () => {
        const testCourse = new Course(rounds(Stage.Doubles));
        testCourse.setLength(4);
        testCourse.getBlock(2).call = Call.Bob;
        testCourse.getBlock(4).call = Call.Single;
        return testCourse;
    };

    it('generates the correct rows when visited', () => {
        const touch = new Touch(rounds(Stage.Doubles));
        const course1 = createTestCourse();
        const course2 = createTestCourse();
        touch.insertBlock(1, course1);
        touch.insertBlock(2, course2);

        const blockVisitor = new StringArray();
        touch.getBlock(1).accept(blockVisitor);
        touch.getBlock(2).accept(blockVisitor);

        const touchVisitor = new StringArray();
        touch.accept(touchVisitor);

        expect(touchVisitor.strings).toEqual(blockVisitor.strings);
    });

    testRandomAccessContainerImplementation(
        (initialRow, _ownership) => new Touch(initialRow, _ownership),
        [
            createTestCourse(),
            createTestCourse(),
            createTestCourse(),
        ],
        (container) => rounds(Stage.Cinques),
        0,
    );

});
