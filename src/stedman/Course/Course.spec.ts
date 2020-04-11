/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import Course from '.';
import {
    testSerialContainerImplementation,
} from '../../blocks/SerialContainer.spec';
import { rounds, rowFromString, Stage, stringFromRow } from '../../rows';
import { Call } from '../../shared';
import { StringArray } from '../../visitors';
import { AbstractMethod, Erin, Stedman, StedmanJump } from '../methods';
import SixType from '../SixType';
import Touch from '../Touch';

describe('Stedman Course class', () => {

    testSerialContainerImplementation(
        Stage.Cinques,
        (initialRow, _ownership) => new Course(initialRow, _ownership),
        132,
        22,
        [
            [Stage.Triples,    84, 14],
            [Stage.Caters,    108, 18],
            [Stage.Cinques,   132, 22],
            [Stage.Sextuples, 156, 26],
            [Stage.Septuples, 180, 30],
        ],
    );

    const testRow = rowFromString('231', Stage.Cinques);

    let course: Course;

    beforeEach(() => {
        course = new Course(testRow);
        course.resetLength();
    });

    it('starts out with a slow six by default for Erin', () => {
        course = new Course(testRow, undefined, new Erin());
        course.resetLength();
        expect(course.firstSixType).toBe(SixType.Slow);
        expect(course.getBlock(1).type).toBe(SixType.Slow);
    });

    it('starts out with a slow six by default for Stedman', () => {
        course = new Course(testRow, undefined, new Stedman());
        course.resetLength();
        expect(course.firstSixType).toBe(SixType.Slow);
        expect(course.getBlock(1).type).toBe(SixType.Slow);
    });

    it('starts out with a cold six by default for Stedman Jump', () => {
        course = new Course(testRow, undefined, new StedmanJump());
        course.resetLength();
        expect(course.firstSixType).toBe(SixType.Cold);
        expect(course.getBlock(1).type).toBe(SixType.Cold);
    });

    it('sets the first six for the chosen method', () => {
        // tslint:disable-next-line
        const method = { defaultFirstSix: SixType.Cold } as AbstractMethod;
        course = new Course(testRow, undefined, method);
        expect(course.firstSixType).toBe(SixType.Cold);
    });

    it('has the right default length for Erin', () => {
        course = new Course(testRow, undefined, new Erin());
        course.resetLength();
        expect(course.length).toBe(11);
    });

    it('has the right default length for Stedman', () => {
        course = new Course(testRow, undefined, new Stedman());
        course.resetLength();
        expect(course.length).toBe(22);
    });

    it('has the right default length for Stedman Jump', () => {
        course = new Course(testRow, undefined, new StedmanJump());
        course.resetLength();
        expect(course.length).toBe(22);
    });

    it('calculates the default length for the chosen method', () => {
        const method = new Stedman();
        spyOn(method, 'getCourseLength').and.returnValue(18);

        course = new Course(testRow, undefined, method);
        course.resetLength();

        expect(method.getCourseLength).toHaveBeenCalled();
        expect(course.length).toBe(18);
    });

    it('always uses slow sixes for Erin', () => {
        course = new Course(testRow, undefined, new Erin());
        course.resetLength();
        for (let index = 1; index <= course.length; index += 1) {
            expect(course.getBlock(index).type).toBe(SixType.Slow);
        }
    });

    it('alternates six types for Stedman', () => {
        course = new Course(testRow, undefined, new Stedman());
        course.resetLength();
        for (let index = 1; index <= course.length; index += 1) {
            if (index % 2) {
                expect(course.getBlock(index).type).toBe(SixType.Slow);
            } else {
                expect(course.getBlock(index).type).toBe(SixType.Quick);
            }
        }
    });

    it('alternates six types for Stedman Jump', () => {
        course = new Course(testRow, undefined, new StedmanJump());
        course.resetLength();
        for (let index = 1; index <= course.length; index += 1) {
            if (index % 2) {
                expect(course.getBlock(index).type).toBe(SixType.Cold);
            } else {
                expect(course.getBlock(index).type).toBe(SixType.Hot);
            }
        }
    });

    it('requests new sixes for the chosen method', () => {
        const method = new Stedman();
        spyOn(method, 'createSix').and.callThrough();
        course = new Course(testRow, undefined, method);

        course.setLength(1);
        expect(method.createSix).toHaveBeenCalled();
        expect(method.createSix).toHaveBeenCalledWith(testRow, course, 1);

        const lastRow = course.getLast();
        course.setLength(2);
        expect(method.createSix).toHaveBeenCalledTimes(2);
        expect(method.createSix).toHaveBeenCalledWith(lastRow, course, 2);
    });

    it('can change the parity of its sixes for Stedman', () => {
        course.setFirstSixType(SixType.Quick);
        expect(course.firstSixType).toBe(SixType.Quick);
        for (let index = 1; index <= 22; index += 1) {
            if (index % 2) {
                expect(course.getBlock(index).type).toBe(SixType.Quick);
            } else {
                expect(course.getBlock(index).type).toBe(SixType.Slow);
            }
        }
    });

    it('copes when changing the parity if its length is zero', () => {
        course.setLength(0);
        expect(() => course.setFirstSixType(SixType.Quick)).not.toThrow();
    });

    it('throws an exception if the six type is invalid', () => {
        expect(() => course.setFirstSixType(SixType.Invalid)).toThrow();
    });

    it('checks the six type is valid for the chosen method', () => {
        const method = new Stedman();
        spyOn(method, 'checkSixType');
        course = new Course(testRow, undefined, method);

        course.setFirstSixType(SixType.Slow);

        expect(method.checkSixType).toHaveBeenCalled();
        expect(method.checkSixType).toHaveBeenCalledWith(SixType.Slow);
    });

    it('calculates sixes correctly for Erin', () => {
        course = Course.fromString(
            rounds(Stage.Cinques),
            '1234567890E 6',
            new Erin(),
        );
        const expectedSixEnds = [
            '',  // blank entry so indices line up
            '241638507E9',
            '4628103E597',
            '68402E19375',
            '806E4927153',
            '0E896745231',
            'E9078562431',
            '97E50283614',
            '7592E301846',
            '527391E4068',
            '23517496E80',
            '3124567890E',
        ];

        for (let index = 1; index <= 11; index += 1) {
            expect(stringFromRow(course.getBlock(index).getLast()))
                .toBe(expectedSixEnds[index]);
        }
    });

    it('calculates sixes correctly for Stedman', () => {
        course = Course.fromString(
            testRow,
            '2314567890E 1 s10 s13 22',
            new Stedman(),
        );
        const expectedSixEnds = [
            '',  // blank entry so indices line up
            '3426185970E',
            '346829105E7',
            '4839602E175',
            '48903E67251',
            '804E9735612',
            '80E74591326',
            '0785E142963',
            '075182E6439',
            '71025683E94',
            '7126035E849',
            '16732E04598',
            '163E7429085',
            '6E143970258',
            '6E491035782',
            'E9604518327',
            'E9056842173',
            '95E80267431',
            '9582E703614',
            '529783E1046',
            '52739184E60',
            '2351749680E',
            '2314567890E',
        ];

        for (let index = 1; index <= 22; index += 1) {
            expect(stringFromRow(course.getBlock(index).getLast()))
                .toBe(expectedSixEnds[index]);
        }
    });

    it('calculates sixes correctly for Stedman Jump', () => {
        course = Course.fromString(
            rounds(Stage.Cinques),
            '1234567890E 1 6 11 12 17 22',
            new StedmanJump(),
        );
        const expectedSixEnds = [
            '',  // blank entry so indices line up
            '4216385970E',
            '462819305E7',
            '8649201E375',
            '89604E27153',
            '098E6745231',
            '0E978562431',
            '7E059283614',
            '75E20391846',
            '2573E104968',
            '235174E6089',
            '13245670E89',
            '1436205E789',
            '64103E28597',
            '604E1839275',
            'E0684917352',
            'E8096745123',
            '98E70561423',
            '9785E102634',
            '579182E3046',
            '51729384E60',
            '2153749680E',
            '2314567890E',
        ];

        for (let index = 1; index <= 22; index += 1) {
            expect(stringFromRow(course.getBlock(index).getLast()))
                .toBe(expectedSixEnds[index]);
        }
    });

    it('recalculates when the parity is changed', () => {
        course.setLength(2);
        course.setFirstSixType(SixType.Quick);
        expect(stringFromRow(course.getBlock(1).getLast()))
            .toBe('234618507E9');
        expect(stringFromRow(course.getBlock(2).getLast()))
            .toBe('3628401E597');
    });

    it('maintains the parity when adding sixes to the course', () => {
        course.setLength(2);
        course.setFirstSixType(SixType.Quick);

        course.setLength(4);
        expect(stringFromRow(course.getBlock(3).getLast()))
            .toBe('36802E49175');
        expect(stringFromRow(course.getBlock(4).getLast()))
            .toBe('603E8927451');
    });

    it('maintains calls correctly when the parity is changed', () => {
        course.setLength(4);
        course.getBlock(2).setCall(Call.Single);
        course.getBlock(3).setCall(Call.Bob);

        course.setFirstSixType(SixType.Quick);
        expect(course.getBlock(2).call).toBe(Call.Single);
        expect(course.getBlock(3).call).toBe(Call.Bob);

        expect(stringFromRow(course.getBlock(1).getLast()))
            .toBe('234618507E9');
        expect(stringFromRow(course.getBlock(2).getLast()))
            .toBe('3628401759E');
        expect(stringFromRow(course.getBlock(3).getLast()))
            .toBe('3680274519E');
        expect(stringFromRow(course.getBlock(4).getLast()))
            .toBe('603785294E1');
    });

    it('can be reset to a plain course', () => {
        course.getBlock(5).toggleCall();
        course.resetCalls();
        expect(course.getBlock(5).call).toBe(Call.Plain);
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
        course.getBlock(5).toggleCall();
        expect(course.isPlain()).toBe(false);
    });

    it('can be cloned', () => {
        course.setLength(20);
        course.setFirstSixType(SixType.Quick);
        course.getBlock(5).toggleCall();

        const cloned = course.clone();
        expect(cloned.length).toBe(course.length);
        expect(cloned.firstSixType).toBe(course.firstSixType);
        expect(cloned.getLast()).toEqual(course.getLast());
    });

    it('creates the cloned course without any owner', () => {
        course.ownership = { container: new Touch(testRow), index: 10 };
        expect(course.clone().ownership).toBeUndefined();
    });

    it('ignores changes to the cloned course', () => {
        const lengthBackup = course.length;
        const getLastBackup = course.getLast();
        const cloned = course.clone();

        cloned.setLength(20);
        cloned.getBlock(5).toggleCall();

        expect(cloned.length).not.toBe(course.length);
        expect(cloned.getLast()).not.toEqual(course.getLast());

        expect(course.length).toBe(lengthBackup);
        expect(course.getLast()).toEqual(getLastBackup);
    });

    it('passes the method to the cloned course', () => {
        const method = new Stedman();
        spyOn(method, 'getCourseLength').and.callThrough();
        course = new Course(testRow, undefined, method);
        expect(method.getCourseLength).not.toHaveBeenCalled();

        const cloned = course.clone();
        cloned.resetLength();
        expect(method.getCourseLength).toHaveBeenCalled();
    });

    it('copes when cloning a course if the length is zero', () => {
        course.setLength(0);
        expect(() => course.clone()).not.toThrow();
    });

    it('provides read access to the method', () => {
        const method = new Stedman();
        course = new Course(testRow, undefined, method);
        expect(course.method).toBe(method);
    });

    it('generates the correct rows when visited', () => {
        let strings: string[] = [ ];

        for (let index = 1; index <= course.length; index += 1) {
            const blockVisitor = new StringArray();
            course.getBlock(index).accept(blockVisitor);
            strings = strings.concat(blockVisitor.strings);
        }

        const courseVisitor = new StringArray();
        course.accept(courseVisitor);

        expect(courseVisitor.strings).toEqual(strings);
    });

    it('passes strings to a parser for loading', () => {
        const parser = jasmine.createSpyObj('Parser', ['parseCourse']);

        Course.fromString(testRow, 'test', undefined, parser);

        expect(parser.parseCourse).toHaveBeenCalled();
        expect(parser.parseCourse).toHaveBeenCalledWith(testRow, 'test');
    });

    it('returns the parsed result', () => {
        const parser = jasmine.createSpyObj('Parser', ['parseCourse']);
        parser.parseCourse.and.returnValue(course);

        const result = Course.fromString(testRow, 'test', undefined, parser);

        expect(result).toBe(course);
    });

    it('configures the parser with the correct method', () => {
        const method = new Erin();
        const parser = jasmine.createSpyObj('Parser', ['parseCourse']);

        Course.fromString(testRow, 'test', method, parser);

        expect(parser.method).toBe(method);
    });

});
