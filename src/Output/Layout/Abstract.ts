/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015 Leigh Simpson. All rights reserved.
 */


import { Course } from '../../containers';
import { AbstractFormat } from '../Format/Abstract';


/**
 * Interface for layouts
 */
export interface AbstractLayout {
    /**
     * Manipulates a format to print out a course
     */
    print(course: Course, format: AbstractFormat): string;
}
