/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { rounds, Row, rowFromString, Stage } from '../rows';
import { Course, Touch } from './testBlocks';
import AbstractParser from './AbstractParser';

class TestParser extends AbstractParser<Touch> {
    public readonly touch: Touch = new Touch(rounds(Stage.Minimus));

    public readonly createTouchSpy = jest.fn().mockReturnValue(this.touch);

    public readonly parseLineSpy = jest.fn();

    protected createTouch(initialRow: Row): Touch {
        return this.createTouchSpy(initialRow);
    }

    protected parseLine(initialRow: Row, input: string): Course | undefined {
        return this.parseLineSpy(initialRow, input);
    }
}

describe('AbstractParser class', () => {
    let parser: TestParser;

    beforeEach(() => {
        parser = new TestParser();
    });

    const testRow = rounds(Stage.Minimus);

    /**
     * Helper to call the `parseTouch` function
     * @param lines  array of lines to parse
     */
    const testParse = (lines: string[]) => parser.parseTouch(lines.join('\n'));

    it('throws if no lines are available', () => {
        expect(() => testParse([])).toThrowError('No input lines');
    });

    it('calls `createTouch` to create a touch on the correct stage', () => {
        testParse(['1234']);

        expect(parser.createTouchSpy).toHaveBeenCalled();
        expect(parser.createTouchSpy).toHaveBeenCalledTimes(1);
        expect(parser.createTouchSpy).toHaveBeenCalledWith(testRow);
    });

    it('throws if the stage cannot be recognised', () => {
        expect(() => testParse(['1'])).toThrowError(
            "Cannot recognise stage from line '1'",
        );
    });

    it('calls `parseLine` to process additional lines', () => {
        testParse(['1234', 'line1', 'line2']);

        expect(parser.parseLineSpy).toHaveBeenCalled();
        expect(parser.parseLineSpy).toHaveBeenCalledTimes(2);
        expect(parser.parseLineSpy).toHaveBeenCalledWith(testRow, 'line1');
        expect(parser.parseLineSpy).toHaveBeenCalledWith(testRow, 'line2');
    });

    it('passes the last touch row when processing lines', () => {
        const row1 = rowFromString('2143', Stage.Minimus);
        const row2 = rowFromString('2413', Stage.Minimus);
        jest.spyOn(parser.touch, 'getLast')
            .mockReturnValueOnce(row1)
            .mockReturnValueOnce(row2);

        testParse(['1234', 'line1', 'line2']);

        expect(parser.parseLineSpy).toHaveBeenCalledWith(row1, 'line1');
        expect(parser.parseLineSpy).toHaveBeenCalledWith(row2, 'line2');
    });

    it('inserts created courses into the touch', () => {
        const course = new Course(testRow);
        parser.parseLineSpy.mockReturnValue(course);

        testParse(['1234', 'line1']);

        expect(parser.touch.length).toBe(1);
        expect(parser.touch.getBlock(1)).toBe(course);
    });

    it('ignores lines that are comments', () => {
        testParse(['1234', '// comment']);
        expect(parser.parseLineSpy).not.toHaveBeenCalled();
    });

    it('strips content after comments', () => {
        testParse(['1234', 'line1// comment']);

        expect(parser.parseLineSpy).toHaveBeenCalled();
        expect(parser.parseLineSpy).toHaveBeenCalledTimes(1);
        expect(parser.parseLineSpy).toHaveBeenCalledWith(testRow, 'line1');
    });

    it('removes a MicroSIRIL comment character', () => {
        testParse(['1234', '/line1']);

        expect(parser.parseLineSpy).toHaveBeenCalled();
        expect(parser.parseLineSpy).toHaveBeenCalledTimes(1);
        expect(parser.parseLineSpy).toHaveBeenCalledWith(testRow, 'line1');
    });

    it('ignores blank lines', () => {
        testParse(['1234', '']);

        expect(parser.parseLineSpy).not.toHaveBeenCalled();
    });

    it('returns the parsed touch', () => {
        expect(testParse(['1234'])).toBe(parser.touch);
    });
});
