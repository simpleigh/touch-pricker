/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Row } from '../rows';
import { Call } from '../shared';
import AbstractBlock from './AbstractBlock';
import AbstractParser from './AbstractParser';
import SerialContainer from './SerialContainer';
import RandomAccessContainer from './RandomAccessContainer';

/**
 * A block that supports `setCall`
 */
interface Lead extends AbstractBlock {
    setCall: (call: Call) => Lead;
}

/**
 * A parser that supports rows of courses with numbered calls
 *
 * Each line of the input should represent a _course_.
 * The course will be parsed into [[SerialContainer]] that contains individual
 * _leads_ ([[AbstractBlock]] instances).
 * The first line of the input should be rounds (this is used to determine the
 * stage).
 *
 * E.g. the classic extent of Cambridge Surprise Minor:
 *
 * ```
 * 123456
 * 145236  3 5
 * 134256  3
 * 125346  3 5
 * 142356  3
 * 135426  3 5
 * 123456  3
 * ```
 *
 * Calls are bobs (default) or singles (marked with an `s`).
 * Leads should support a `.setCall()` method in order to support this.
 * A particular course may be a different length and this is marked in
 * parentheses at the end of the line.
 */
abstract class LeadBasedParser<
    Course extends SerialContainer<Lead>,
    Touch extends RandomAccessContainer<Course>,
>
    extends AbstractParser<Touch> {

    /* AbstractParser methods *************************************************/

    /**
     * Parses a line of the input
     */
    protected parseLine(initialRow: Row, input: string): Course | undefined {
        return this.parseCourse(initialRow, input);
    }

    /* LeadBasedParser methods ************************************************/

    /**
     * Creates a new course from a string representation
     */
    public parseCourse(initialRow: Row, input: string): Course {
        const courseEnd = '[0-9a-et]{3,15}';
        const separator = '[\\s.,]+';
        const lead = '(?:\\d{1,2}|\\d{1,2}s|s\\d{1,2})'; // 5 or 5s or s5
        const leads = `${lead}(?:${separator}${lead})*`;
        const numLeads = '\\((\\d{1,2})[^\\d\\)]*\\)'; // (5 <anything>)
        const line = ''
            + '^\\s*'
            + `(?:${courseEnd}\\s+)?`
            + `(${leads}|p)`  // group 1
            + `(?:\\s+${numLeads})?`  // group 2 in here
            + '\\s*$';
        const matches = new RegExp(line, 'i').exec(input);

        if (!matches) {
            throw new Error('Cannot import course');
        }

        const course = this.createCourse(initialRow);

        // Second group matches length of course
        if (matches[2]) {
            course.setLength(parseInt(matches[2]));
        } else {
            course.resetLength();
        }

        // If this is a plain course then our job is done
        if (matches[1] === 'p') {
            return course;
        }

        // Otherwise split up the calling and process
        const calls = matches[1].split(new RegExp(separator));
        for (let call of calls) {
            if (call.charAt(0) === 's') {
                call = call.slice(1);
                course.getBlock(parseInt(call)).setCall(Call.Single);
            } else if (call.slice(-1) === 's') {
                call = call.slice(0, -1);
                course.getBlock(parseInt(call)).setCall(Call.Single);
            } else {
                course.getBlock(parseInt(call)).setCall(Call.Bob);
            }
        }

        return course;

    }

    /**
     * Creates an instance of the course being parsed
     * @param initialRow  rounds for the parsed stage
     */
    protected abstract createCourse(initialRow: Row): Course;

}

export default LeadBasedParser;
