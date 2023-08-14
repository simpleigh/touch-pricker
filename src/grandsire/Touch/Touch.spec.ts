/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import testRandomAccessContainerImplementation from
    '../../blocks/testRandomAccessContainerImplementation';
import { Call } from '../../leads';
import { rounds, Stage } from '../../rows';
import { StringArray } from '../../visitors';
import Course from '../Course';
import Lead from '../Lead';
import Parser from '../Parser';
import Touch from '.';

describe('Grandsire Touch class', () => {
    testRandomAccessContainerImplementation(
        Stage.Doubles,
        (initialRow) => {
            const testTouch = Touch.fromString(
                ''
                    + '12345\n'
                    + '13425  s2 3 s4  (4 leads)\n'
                    + '14235  s2 3 s4  (4 leads)\n'
                    + '12345  s2 3 s4  (4 leads)\n'
            );

            testTouch.initialRow = initialRow;

            return testTouch;
        },
        120,
        3,
        Course.fromString(rounds(Stage.Doubles), '13425  s2 3 s4  (4 leads)'),
    );

    it('generates the correct rows when visited', () => {
        const testRow = rounds(Stage.Doubles);
        const touch = new Touch(testRow);
        const course1 = new Course(testRow);
        const course2 = new Course(testRow);
        course1.setLength(2);
        course2.setLength(1);
        touch.insertBlock(1, course1);
        touch.insertBlock(2, course2);

        const blockVisitor = new StringArray();
        touch.getBlock(1).accept(blockVisitor);
        touch.getBlock(2).accept(blockVisitor);

        const touchVisitor = new StringArray();
        touch.accept(touchVisitor);

        expect(touchVisitor.strings).toEqual(blockVisitor.strings);
    });

    it('provides access to place notations by call', () => {
        for (let stage = 5; stage <= 15; stage += 2) {
            const lead = new Lead(rounds(stage));
            const touch = new Touch(rounds(stage));

            expect(touch.callNotations[Call.Plain]).toEqual(lead.notation);

            lead.setCall(Call.Bob);
            expect(touch.callNotations[Call.Bob]).toEqual(lead.notation);

            lead.setCall(Call.Single);
            expect(touch.callNotations[Call.Single]).toEqual(lead.notation);
        }
    });

    it('passes strings to a parser for loading', () => {
        const parser = new Parser();
        jest.spyOn(parser, 'parseTouch');

        Touch.fromString('test', parser);

        expect(parser.parseTouch).toHaveBeenCalled();
        expect(parser.parseTouch).toHaveBeenCalledWith('test');
    });

    it('returns the parsed result', () => {
        const touch = new Touch(rounds(Stage.Doubles));
        const parser = new Parser();
        jest.spyOn(parser, 'parseTouch').mockReturnValue(touch);

        const result = Touch.fromString('test', parser);

        expect(result).toBe(touch);
    });
});
