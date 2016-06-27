/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015 Leigh Simpson. All rights reserved.
 */


import { Call } from '../../stedman';
import { Course } from '../../containers';
import { AbstractFormat } from '../Format/Abstract';
import { AbstractLayout } from './Abstract';


/**
 * Lists the calling for a course on a single line
 */
export class Calling implements AbstractLayout {

    /**
     * Manipulates a format to print out a course
     */
    print(course: Course, format: AbstractFormat): string {
        let index: number,
            calls: string[] = [],
            bells: number = course.getEnd().length;

        format
            .clearBuffer()
            .startLine()
            .printRow(course.getEnd())
            .newColumn();

        // e.g. '1 5 7 8 10 11 s13 15 16'
        for (index = 1; index <= course.getLength(); index++) {
            if (course.getSix(index).getCall() !== Call.Plain) {
                if (course.getSix(index).getCall() === Call.Bob) {
                    calls.push(index.toString());
                } else {
                    calls.push('s' + index.toString());
                }
            }
        }
        if (calls.length) {
            format.print(calls.join(' '));
        } else {
            format.print('p');
        }

        // e.g. '(20 sixes)'
        if (course.getLength() !== (bells * 2)) {
            format
                .newColumn()
                .print('(')
                .print(course.getLength().toString())
                .print(' sixes)');
        }

        return format
            .endLine()
            .getBuffer();
    }
}
