/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { rounds, rowFromString, Stage } from '../rows';
import { type AbstractMethod, Erin, Stedman, StedmanJump } from './methods';
import Parser from './Parser';

describe('Parser for Stedman', () => {
    let parser: Parser;

    beforeEach(() => {
        parser = new Parser();
    });

    it('defaults to Stedman', () => {
        expect(parser.method).toEqual(new Stedman());
    });

    it('allows the method to be configured', () => {
        const method = new Erin();
        parser.method = method;
        expect(parser.method).toBe(method);
    });

    it('passes the method when creating courses', () => {
        const method = new Stedman();
        parser.method = method;

        // prettier-ignore
        const touch = parser.parseTouch(
            '1234567890E\n' +
                '4321567890E  6 7\n' +
                '1234567890E  6 7\n',
        );

        expect(touch.getBlock(1).method).toBe(method);
        expect(touch.getBlock(2).method).toBe(method);
    });

    it('passes the method when creating touches', () => {
        const method = new Stedman();
        parser.method = method;

        // prettier-ignore
        const touch = parser.parseTouch(
            '1234567890E\n' +
                '4321567890E  6 7\n' +
                '1234567890E  6 7\n',
        );

        expect(touch.start.method).toBe(method);
    });

    describe('can create courses from strings:', () => {
        const testImport = (
            description: string,
            input: string,
            output: string,
            method: AbstractMethod = new Stedman(),
        ) => {
            it(description, () => {
                parser.method = method;
                const testRow = rowFromString('231', Stage.Cinques);
                const imported = parser.parseCourse(testRow, input);
                expect(imported.print('text')).toBe(output);
            });
        };

        testImport(
            'a simple course ending in rounds',
            '2314567890E  1 s10 s13 22',
            '2314567890E  1 s10 s13 22',
        );

        testImport(
            'a course with singles marked after the six number',
            '2314567890E  1 10s 13s 22',
            '2314567890E  1 s10 s13 22',
        );

        testImport(
            'a course with calls separated with "."s',
            '2314567890E  1.s10. s13 .22',
            '2314567890E  1 s10 s13 22',
        );

        testImport(
            'a course with calls separated with ","s',
            '2314567890E  1,s10, s13 ,22',
            '2314567890E  1 s10 s13 22',
        );

        testImport(
            'a more complex course',
            '23145768E90  1 s6 s17 s19',
            '23145768E90  1 s6 s17 s19',
        );

        testImport(
            'a short course',
            '21436578E90  1 5 7 8 10 11 s13 15 16  (20 sixes)',
            '21436578E90  1 5 7 8 10 11 s13 15 16  (20 sixes)',
        );

        testImport(
            'a short course with concise length description',
            '21436578E90  1 5 7 8 10 11 s13 15 16  (20)',
            '21436578E90  1 5 7 8 10 11 s13 15 16  (20 sixes)',
        );

        testImport(
            'a short course with odd length description',
            '21436578E90  1 5 7 8 10 11 s13 15 16  (20-em ù sixen)',
            '21436578E90  1 5 7 8 10 11 s13 15 16  (20 sixes)',
        );

        // prettier-ignore
        testImport(
            'a plain course',
            'p (8)',
            'E7518296430  p  (8 sixes)',
        );

        testImport(
            'a string with extra spacing',
            ' \t\r\n2314567890E  \t\r\n1 s10  \t\r\ns13 22 \t\r\n',
            '2314567890E  1 s10 s13 22',
        );

        testImport(
            'a string with a broken course end',
            'abcde  1 s10 s13 22',
            '2314567890E  1 s10 s13 22',
        );

        testImport(
            'a string with a short course end',
            '231  1 s10 s13 22',
            '2314567890E  1 s10 s13 22',
        );

        testImport(
            'a string without a course end',
            '1 s10 s13 22',
            '2314567890E  1 s10 s13 22',
        );

        testImport(
            'another string without a course end',
            's10 s13 s15 s22',
            '2314568709E  s10 s13 s15 s22',
        );

        testImport(
            'yet another string without a course end',
            '10s s13 s15 s22',
            '2314568709E  s10 s13 s15 s22',
        );

        testImport(
            'a course of Erin',
            '2314567890E  6',
            '1234567890E  6',
            new Erin(),
        );

        testImport(
            'a course of Stedman Jump',
            '2314567890E  1 6 11 12 17 22',
            '3124567890E  1 6 11 12 17 22',
            new StedmanJump(),
        );

        it('a broken course (that raises an error)', () => {
            expect(() => {
                parser.parseCourse(rounds(Stage.Cinques), 'garbage');
            }).toThrowError("Cannot import course from line 'garbage'");
        });
    });

    describe('can create touches from strings:', () => {
        const testImport = (
            description: string,
            input: string,
            output: string,
            method: AbstractMethod = new Stedman(),
        ) => {
            it(description, () => {
                parser.method = method;
                const imported = parser.parseTouch(input);
                expect(imported.print('text')).toBe(output);
            });
        };

        // prettier-ignore
        testImport(
            'a simple touch',
            '2314567890E\n' +
                '2314567890E  1 s10 s13 22\n',
            '2314567890E\n' +
                '2314567890E  1 s10 s13 22\n',
        );

        testImport(
            'a touch with more than one course',
            '2314567890E\n' +
                '2314568790E  1 s10 s13 s15 22\n' +
                '2314567890E  1 s10 s13 s15 22\n',
            '2314567890E\n' +
                '2314568790E  1 s10 s13 s15 22\n' +
                '2314567890E  1 s10 s13 s15 22\n',
        );

        testImport(
            'a touch that comes round at hand',
            '2314567890E\n' +
                '21436578E90  1 5 7 8 10 11 s13 15 16  (20 sixes)\n' +
                '2143658709E  2 s13 s15\n' +
                '2143658709E  p\n',
            '2314567890E\n' +
                '21436578E90  1 5 7 8 10 11 s13 15 16  (20 sixes)\n' +
                '2143658709E  2 s13 s15\n' +
                '2143658709E  p\n',
        );

        // prettier-ignore
        testImport(
            'a touch with extra spacing',
            '\t 2314567890E\t \n' +
                '2314567890E  1 s10 s13 22\n',
            '2314567890E\n' +
                '2314567890E  1 s10 s13 22\n',
        );

        // prettier-ignore
        testImport(
            'a touch with a blank line',
            '2314567890E\n' +
                ' \t\n' +
                '2314567890E  1 s10 s13 22\n',
            '2314567890E\n' +
                '2314567890E  1 s10 s13 22\n',
        );

        // prettier-ignore
        testImport(
            'a touch with microsiril comments',
            '2314567890E\n' +
                '/2314567890E  1 s10 s13 22\n',
            '2314567890E\n' +
                '2314567890E  1 s10 s13 22\n',
        );

        // prettier-ignore
        testImport(
            'a touch with a "//" comment line',
            '2314567890E\n' +
                '// comment\n' +
                '2314567890E  1 s10 s13 22\n',
            '2314567890E\n' +
                '2314567890E  1 s10 s13 22\n',
        );

        // prettier-ignore
        testImport(
            'a touch with an included "//" comment',
            '2314567890E\n' +
                '2314567890E  1 s10 s13 22  // turn 78\n',
            '2314567890E\n' +
                '2314567890E  1 s10 s13 22\n',
        );

        testImport(
            'a touch with a start',
            '321547698E0\n' +
                '3765421E098  1 s10 s13 22\n' +
                'Start from rounds as the third row of a slow six.\n',
            '321547698E0\n' +
                '3765421E098  1 s10 s13 22\n' +
                'Start from rounds as the third row of a slow six.\n',
        );

        // prettier-ignore
        testImport(
            'a touch of Erin',
            '1234567890E\n' +
                '4321567890E  6 7\n' +
                '1234567890E  6 7\n',
            '1234567890E\n' +
                '4321567890E  6 7\n' +
                '1234567890E  6 7\n',
            new Erin(),
        );

        // prettier-ignore
        testImport(
            'a touch of Stedman Jump',
            '1234567890E\n' +
                '4321567890E  6 7\n' +
                '1234567890E  6 7\n',
            '1234567890E\n' +
                '4321567890E  6 7\n' +
                '1234567890E  6 7\n',
            new StedmanJump(),
        );

        it('a touch with no lines', () => {
            expect(() => {
                parser.parseTouch('');
            }).toThrowError('No input lines');
        });

        it('a touch with a broken initial row', () => {
            expect(() => {
                parser.parseTouch('not');
            }).toThrowError("Cannot recognise stage from line 'not'");
        });

        it('a touch with a broken course', () => {
            expect(() => {
                parser.parseTouch('2314567890E\ngarbage\n');
            }).toThrowError("Cannot import course from line 'garbage'");
        });
    });
});
