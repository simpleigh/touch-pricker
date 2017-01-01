/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../Course.ts" />
/// <reference path="../Format/Abstract.ts" />

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
             * Interface for layouts
             */
            export interface AbstractLayout {
                /**
                 * Manipulates a format to print out a course
                 */
                print(course: Course, format: Format.AbstractFormat): string;
            }

        }

    }

}
