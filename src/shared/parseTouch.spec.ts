/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { rounds, Stage } from '../rows';
import parseTouch from './parseTouch';

describe('parseTouch function', () => {

    const touchFixture = 'TOUCH';
    const touchFactory = jasmine.createSpy().and.returnValue(touchFixture);
    const lineParser = jasmine.createSpy();

    beforeEach(() => {
        touchFactory.calls.reset();
        lineParser.calls.reset();
    });

    /**
     * Helper to call the `parseTouch` function
     * @param lines - array of lines to parse
     */
    const testParse = (lines: string[]) =>
        parseTouch(touchFactory, lines.join('\n'), lineParser);

    it('throws if no lines are available', () => {
        expect(() => testParse([])).toThrowError('No input lines');
    });

    it('calls the touchFactory to create a touch on the correct stage', () => {
        testParse(['1234']);

        expect(touchFactory).toHaveBeenCalled();
        expect(touchFactory).toHaveBeenCalledTimes(1);
        expect(touchFactory).toHaveBeenCalledWith(rounds(Stage.Minimus));
    });

    it('throws if the stage cannot be recognised', () => {
        expect(() => testParse(['1'])).toThrowError('Cannot recognise stage');
    });

    it('calls the lineParser with any additional lines', () => {
        testParse(['1234', 'line1', 'line2']);

        expect(lineParser).toHaveBeenCalled();
        expect(lineParser).toHaveBeenCalledTimes(2);
        expect(lineParser).toHaveBeenCalledWith(touchFixture, 'line1');
        expect(lineParser).toHaveBeenCalledWith(touchFixture, 'line2');
    });

    it('ignores lines that are comments', () => {
        testParse(['1234', '// comment']);

        expect(lineParser).not.toHaveBeenCalled();
    });

    it('strips content after comments', () => {
        testParse(['1234', 'line1// comment']);

        expect(lineParser).toHaveBeenCalled();
        expect(lineParser).toHaveBeenCalledTimes(1);
        expect(lineParser).toHaveBeenCalledWith(touchFixture, 'line1');
    });

    it('removes a MicroSIRIL comment character', () => {
        testParse(['1234', '/line1']);

        expect(lineParser).toHaveBeenCalled();
        expect(lineParser).toHaveBeenCalledTimes(1);
        expect(lineParser).toHaveBeenCalledWith(touchFixture, 'line1');
    });

    it('ignores blank lines', () => {
        testParse(['1234', '']);

        expect(lineParser).not.toHaveBeenCalled();
    });

    it('returns the parsed touch', () => {
        expect(testParse(['1234'])).toBe(touchFixture);
    });

});
