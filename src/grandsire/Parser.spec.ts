/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { rounds, Stage } from '../rows';
import Parser from './Parser';

describe('Parser for Grandsire', () => {
    let parser: Parser;

    beforeEach(() => {
        parser = new Parser();
    });

    describe('can create courses from strings:', () => {
        const testImport = (
            description: string,
            input: string,
            output: string,
        ) => {
            it(description, () => {
                const imported = parser.parseCourse(
                    rounds(Stage.Caters),
                    input,
                );
                expect(imported.print('text')).toBe(output);
            });
        };

        testImport(
            'a plain course',
            '123456789  p',
            '123456789  p',
        );

        testImport(
            'a bob course',
            '123456789  1 2 3 4  (4 leads)',
            '123456789  1 2 3 4  (4 leads)',
        );

        testImport(
            'a singled course',
            '123456789  s1 s2 s3 s4 s5 s6 s7 s8  (8 leads)',
            '123456789  s1 s2 s3 s4 s5 s6 s7 s8  (8 leads)',
        );

        testImport(
            'a more complex course ending in rounds',
            '123456789  2 s4 5 7 s9 10  (10 leads)',
            '123456789  2 s4 5 7 s9 10  (10 leads)',
        );

        testImport(
            'a course with singles marked after the six number',
            '123456789  2 4s 5 7 9s 10  (10 leads)',
            '123456789  2 s4 5 7 s9 10  (10 leads)',
        );

        testImport(
            'a course with calls separated with "."s',
            '123456789  2.s4. 5 .7 . s9 10  (10 leads)',
            '123456789  2 s4 5 7 s9 10  (10 leads)',
        );

        testImport(
            'a course with calls separated with ","s',
            '123456789  2,s4, 5 ,7 , s9 10  (10 leads)',
            '123456789  2 s4 5 7 s9 10  (10 leads)',
        );

        testImport(
            'a short course',
            '135624789  2 3 s5  (5 leads)',
            '135624789  2 3 s5  (5 leads)',
        );

        testImport(
            'a short course with concise length description',
            '135624789  2 3 s5  (5)',
            '135624789  2 3 s5  (5 leads)',
        );

        testImport(
            'a short course with odd length description',
            '135624789  2 3 s5  (5-em ù leaden)',
            '135624789  2 3 s5  (5 leads)',
        );

        testImport(
            'a short plain course',
            'p (3)',
            '129785634  p  (3 leads)',
        );

        testImport(
            'a string with extra spacing',
            ' \t\r123456789  \t\r\n2 s4  \t\r\n5 7 s9 10 \t\r\n (10 leads)  \n',
            '123456789  2 s4 5 7 s9 10  (10 leads)',
        );

        testImport(
            'a string with a broken course end',
            'abcde  2 s4 5 7 s9 10 (10 leads)',
            '123456789  2 s4 5 7 s9 10  (10 leads)',
        );

        testImport(
            'a string with a short course end',
            '123  2 s4 5 7 s9 10 (10 leads)',
            '123456789  2 s4 5 7 s9 10  (10 leads)',
        );

        testImport(
            'a string without a course end',
            '2 s4 5 7 s9 10 (10 leads)',
            '123456789  2 s4 5 7 s9 10  (10 leads)',
        );

        testImport(
            'another string without a course end',
            's10  (10 leads)',
            '198267453  s10  (10 leads)',
        );

        testImport(
            'yet another string without a course end',
            '10s  (10 leads)',
            '198267453  s10  (10 leads)',
        );

        it('a broken course (that raises an error)', () => {
            expect(() => {
                parser.parseCourse(rounds(Stage.Caters), 'garbage');
            }).toThrowError("Cannot import course from line 'garbage'");
        });
    });

    describe('can create touches from strings:', () => {
        const testImport = (
            description: string,
            input: string,
            output: string,
        ) => {
            it(description, () => {
                const imported = parser.parseTouch(input);
                expect(imported.print('text')).toBe(output);
            });
        };

        testImport(
            'a simple touch',
            '123456789\n' +
                '123456789  1 2 3 4  (4 leads)\n',
            '123456789\n' +
                '123456789  1 2 3 4  (4 leads)\n',
        );

        testImport(
            'a touch with more than one course',
            '123456789\n' +
                '132654789  1 2 s3 s4  (4 leads)\n' +
                '126458379  s2 3 4  (4 leads)\n' +
                '123456789  s1 s2 3 s5  (5 leads)\n',
            '123456789\n' +
                '132654789  1 2 s3 s4  (4 leads)\n' +
                '126458379  s2 3 4  (4 leads)\n' +
                '123456789  s1 s2 3 s5  (5 leads)\n',
        );

        testImport(
            'a touch that comes round at hand',
            '123456789\n' +
                '143926587  1 s2 s4  (4 leads)\n' +
                '145329876  s1 s2 4 s5  (5 leads)\n' +
                '132547698  s2 s3 s4  (5 leads)\n',
            '123456789\n' +
                '143926587  1 s2 s4  (4 leads)\n' +
                '145329876  s1 s2 4 s5  (5 leads)\n' +
                '132547698  s2 s3 s4  (5 leads)\n',
        );

        testImport(
            'a touch with extra spacing',
            '\t 123456789\t \n' +
                '123456789  1 2 3 4  (4 leads)\n',
            '123456789\n' +
                '123456789  1 2 3 4  (4 leads)\n',
        );

        testImport(
            'a touch with a blank line',
            '123456789\n' +
                ' \t\n' +
                '123456789  1 2 3 4  (4 leads)\n',
            '123456789\n' +
                '123456789  1 2 3 4  (4 leads)\n',
        );

        testImport(
            'a touch with microsiril comments',
            '123456789\n' +
                '/123456789  1 2 3 4  (4 leads)\n',
            '123456789\n' +
                '123456789  1 2 3 4  (4 leads)\n',
        );

        testImport(
            'a touch with a "//" comment line',
            '123456789\n' +
                '// comment \n' +
                '123456789  1 2 3 4  (4 leads)\n',
            '123456789\n' +
                '123456789  1 2 3 4  (4 leads)\n',
        );

        testImport(
            'a touch with an included "//" comment',
            '123456789\n' +
                '123456789  1 2 3 4  (4 leads)  // bob course\n',
            '123456789\n' +
                '123456789  1 2 3 4  (4 leads)\n',
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
                parser.parseTouch('123456789\ngarbage\n');
            }).toThrowError("Cannot import course from line 'garbage'");
        });
    });
});
