/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { BlockOwnership } from '../blocks';
import {
    testSerialContainerImplementation,
} from '../blocks/SerialContainer.spec';
import { rounds, Row, Stage } from '../rows';
import AbstractLead from './AbstractLead';
import AbstractCourse from './AbstractCourse';
import Call from './Call';

/**
 * Test that a course behaves as an AbstractCourse
 * @param testStage        stage to use when testing this container
 * @param factory          creates an instance of the object under test
 * @param expectedRows     number of rows expected in this container
 * @param expectedLength   number of blocks expected in this container
 * @param lengthTestCases  expected lengths and rows for each stage
 */
export const testAbstractCourseImplementation = (
    testStage: Stage,
    factory: (initialRow: Row, _ownership?: BlockOwnership) =>
        AbstractCourse<AbstractLead>,
    expectedRows: number,
    expectedLength: number,
    lengthTestCases: [Stage, number, number][],
) => {

    testSerialContainerImplementation(
        testStage,
        factory,
        expectedRows,
        expectedLength,
        lengthTestCases,
    );

    let course: AbstractCourse<AbstractLead>;

    beforeEach(() => {
        course = factory(rounds(testStage));
        course.resetLength();
    });

    it('can be reset to a plain course', () => {
        course.getBlock(2).toggleCall();
        course.resetCalls();
        expect(course.getBlock(2).call).toBe(Call.Plain);
    });

    it('returns this when resetting the calls', () => {
        expect(course.resetCalls()).toBe(course);
    });

    it('copes when resetting a course if the length is zero', () => {
        course.setLength(0);
        expect(() => course.resetCalls()).not.toThrow();
    });

    it('only calls notify once when resetting the calls', () => {
        const container = jasmine.createSpyObj('Notifiable', ['notify']);
        course.ownership = { container, index: 1 };
        course.resetCalls();
        expect(container.notify).toHaveBeenCalledTimes(1);
    });

    it('starts out as a plain course', () => {
        expect(course.isPlain()).toBe(true);
    });

    it('knows when it is not a plain course', () => {
        course.getBlock(2).toggleCall();
        expect(course.isPlain()).toBe(false);
    });


};
