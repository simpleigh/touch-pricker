/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import BlockOwnership from '../BlockOwnership';
import Course from '../Course';
import RandomAccessContainer from '../RandomAccessContainer';
import Row from '../Row';
import rowFromString from '../rowFromString';
import Stage from '../Stage';
import Start from '../Start';
import * as Templates from '../templates/index';
import * as Visitor from '../Visitor';
import select from './select.dot';
import siril from './siril.dot';
import text from './text.dot';

/**
 * A touch, being a set of courses
 */
@Templates.makePrintable({ select, siril, text })
class Touch
    extends RandomAccessContainer<Course>
    implements Templates.Interface {

    /**
     * Start for this touch
     */
    private _start: Start;

    /**
     * Constructor
     *
     * Extends the AbstractBlock container to set up the start.
     */
    constructor(initialRow: Row, protected _ownership?: BlockOwnership) {
        super(initialRow, _ownership);
        this._start = new Start(initialRow, { 'container': this, 'index': 0 });
    }

    /* AbstractBlock methods **************************************************/

    /**
     * Receives a visitor that will be called to process each row
     */
    public accept(...visitors: Visitor.AbstractVisitor[]): this {
        for (const visitor of visitors) {
            this._start.accept(visitor);
        }

        return super.accept(...visitors);
    }

    /**
     * Estimates the number of rows in the block
     * The estimate doesn't take into account coming round part-way through
     */
    public estimateRows(): number {
        return this._start.estimateRows() + super.estimateRows();
    }

    /* templating *************************************************************/

    public print: Templates.Print;

    /* AbstractContainer methods **********************************************/

    /**
     * Propagates data from a previous block to a current block
     */
    protected propagateCurrentBlock(previous: Course, current: Course): void {
        const sixType = previous.getSix(previous.getLength()).type;
        current.setInitialRow(previous.getLast());
        current.setFirstSixType((sixType + 1) % 2);
    }

    /**
     * Propagates data for the first block within the container
     * Handled as a special case to allow for e.g. Stedman starts
     */
    protected propagateFirstBlock(first: Course): void {
        const sixType = this._start.getSixType();
        first.setInitialRow(this._start.getLast());
        first.setFirstSixType((sixType + 1) % 2);
    }

    /* Touch methods **********************************************************/

    /**
     * Read access to the courses
     */
    public getCourses: () => Course[] = this.getBlocks;

    /**
     * Read access to a course
     */
    public getCourse: (index: number) => Course = this.getBlock;

    /**
     * Inserts a course at the specified index
     */
    public insertCourse: (index: number, course: Course) => this =
        this.insertBlock;

    /**
     * Deletes the course at the specified index
     */
    public deleteCourse: (index: number) => Course = this.deleteBlock;

    /**
     * Read access to the start
     */
    public getStart(): Start {
        return this._start;
    }

    /**
     * Creates a new touch from a string representation
     */
    public static fromString(input: string): Touch {
        const lines: string[] = input.split('\n');

        let i: number,
            line: string,
            course: Course,
            touch: Touch | undefined,
            start: string | undefined;

        // Process each input line, making text substitutions
        for (i = 0; i < lines.length; i += 1) {
            line = lines[i];

            // Drop any content after comment characters "//"
            line = line.replace(/\/\/.*$/, '');

            // Ignore a microsiril comment "/" at the start of a line
            line = line.replace(/^\//, '');

            // Skip this line if it's blank
            if (/^\s*$/.test(line)) {
                continue;
            }

            // Store start definitions for later processing
            if (/start/i.test(line)) {
                start = line;
                continue;
            }

            if (!touch) {
                // Create the touch with a stage based on the first line
                line = line.replace(/\s/g, '');
                if (!Stage[line.length]) {
                    throw new Error('Cannot recognise stage');
                }
                touch = new Touch(rowFromString('123', line.length));
            } else {
                // Create a course for each remaining line
                course = Course.fromString(touch.getLast(), line);
                touch.insertCourse(touch.getLength() + 1, course);
            }
        }

        if (!touch) {
            throw new Error('No input lines');
        }

        if (start) {
            touch.getStart().setFromString(start);
        }

        return touch;
    }
}

export default Touch;
