/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../Course.ts" />
/// <reference path="../Format/Abstract.ts" />
/// <reference path="Abstract.ts" />

namespace Pricker {
    'use strict';

    /**
     * Classes for output
     */
    export namespace Output {

        /**
         * Layouts, e.g. by six-end, calling for each course
         */
        export namespace Layout {

            /**
             * Displays each six-end on a separate line
             */
            export class Pricker implements AbstractLayout {
                /**
                 * Manipulates a format to print out a course
                 */
                print(course: Course, format: Format.AbstractFormat): string {
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

        }

    }

}
