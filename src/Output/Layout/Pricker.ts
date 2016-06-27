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
 * Displays each six-end on a separate line
 */
export class Pricker implements AbstractLayout {
    /**
     * Manipulates a format to print out a course
     */
    print(course: Course, format: AbstractFormat): string {
        let index: number;
        format.clearBuffer();

        for (index = 1; index <= course.getLength(); index++) {
            format
                .startLine()
                .printRow(course.getSix(index).getEnd())
                .newColumn()
                .printCall(course.getSix(index).getCall(), index)
                .newColumn()
                .print(index.toString())
                .endLine();
        }
        return format.getBuffer();
    }
}
