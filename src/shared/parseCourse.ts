/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { AbstractBlock, SerialContainer } from '../blocks';
import Call from './Call';

/**
 * Type of block that supports `setCall`
 */
interface Lead extends AbstractBlock {
    setCall: (call: Call) => Lead;
}

/**
 * Parses calling for courses with bobs and singles at numbered locations
 * e.g. Stedman or Grandsire
 * @param course  course to manipulate (will be changed in-place)
 * @param input   input string to parse
 */
const parseCourse = (course: SerialContainer<Lead>, input: string): void => {
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

    let calls: string[];
    let i: number;
    let call: string;

    if (!matches) {
        throw new Error('Cannot import course');
    }

    // Second group matches length of course
    if (matches[2]) {
        course.setLength(parseInt(matches[2]));
    } else {
        course.resetLength();
    }

    // If this is a plain course then our job is done
    if (matches[1] === 'p') {
        return;
    }

    // Otherwise split up the calling and process
    calls = matches[1].split(new RegExp(separator));
    for (i = 0; i < calls.length; i += 1) {
        call = calls[i];
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
};

export default parseCourse;
