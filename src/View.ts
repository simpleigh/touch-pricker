/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="Call.ts" />
/// <reference path="Course.ts" />
/// <reference path="stringFromRow.ts" />
/// <reference path="Templates.ts" />

namespace Pricker {
    'use strict';

    /**
     * A view of a course
     */
    export class View {
        /**
         * Template in use
         */
        protected _template: (data: any) => string;

        /**
         * Constructor
         * @param {string}  template - name of template
         */
        constructor(template: string) {
            this._template = Templates[template];
        }

        /**
         * Prints out a course
         *
         * Provides the template with a dictionary like this:
         * {
         *   courseEnd: '2314567890E',
         *   isPlainCourse: true,
         *   sixes: [
         *     {
         *       index: 1,
         *       call: Pricker.Call.Plain,
         *       end: '342618507E9',
         *     }
         *   ]
         * }
         */
        public print(course: Course): string {
            const data: any = { };
            let index: number;

            data.courseEnd = stringFromRow(course.getEnd());
            data.isPlainCourse = true;

            data.sixes = [ ];
            for (index = 1; index <= course.getLength(); index++) {
                data.sixes.push({
                    'index': index,
                    'call': course.getSix(index).getCall(),
                    'end': stringFromRow(course.getSix(index).getEnd()),
                });

                if (course.getSix(index).getCall() !== Call.Plain) {
                    data.isPlainCourse = false;
                }
            }

            return this._template(data);
        }
    }
}
