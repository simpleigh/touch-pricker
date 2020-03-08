/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { BlockOwnership, RandomAccessContainer } from '../../blocks';
import { Row, rowFromString, Stage } from '../../rows';
import * as Templates from '../../templates';
import { AbstractVisitor } from '../../visitors';
import constructorFromType from '../constructorFromType';
import Course from '../Course';
import { AbstractMethod, Stedman } from '../methods';
import * as sixes from '../sixes';
import Start from '../Start';
import select from './select.dot';
import siril from './siril.dot';
import text from './text.dot';

/**
 * A touch, being a set of courses
 */
@Templates.makePrintable(
    { select, siril, text },
    { constructorFromType, rowFromString, sixes },
)
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
     * Extends the AbstractBlock container to set up the start and method.
     */
    constructor(
        initialRow: Row,
        protected _ownership?: BlockOwnership,
        private _method: AbstractMethod = new Stedman(),
    ) {
        super(initialRow, _ownership);
        this._start = new Start(
            initialRow,
            { container: this, index: 0 },
            this._method,
        );
    }

    /* AbstractBlock methods **************************************************/

    /**
     * Receives a visitor that will be called to process each row
     */
    public accept(...visitors: AbstractVisitor[]): this {
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
        const sixType = previous.getBlock(previous.length).type;
        current.initialRow = previous.getLast();
        current.setFirstSixType(this._method.getNextSixType(sixType));
    }

    /**
     * Propagates data for the first block within the container
     * Handled as a special case to allow for e.g. Stedman starts
     */
    protected propagateFirstBlock(first: Course): void {
        const sixType = this._start.sixType;
        first.initialRow = this._start.getLast();
        first.setFirstSixType(this._method.getNextSixType(sixType));
    }

    /* Touch methods **********************************************************/

    /**
     * Provides read access to the start
     */
    get start(): Start {
        return this._start;
    }

    /**
     * Provides read access to the method
     */
    get method(): AbstractMethod {
        return this._method;
    }

    /**
     * Creates a new touch from a string representation
     */
    public static fromString(
        input: string,
        method: AbstractMethod = new Stedman(),
    ): Touch {
        const lines = input.split('\n');

        let i: number;
        let line: string;
        let course: Course;
        let touch: Touch | undefined;
        let start: string | undefined;

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
                touch = new Touch(
                    rowFromString('123', line.length),
                    undefined,
                    method,
                );
            } else {
                // Create a course for each remaining line
                course = Course.fromString(touch.getLast(), line, method);
                touch.insertBlock(touch.length + 1, course);
            }
        }

        if (!touch) {
            throw new Error('No input lines');
        }

        if (start) {
            touch.start.setFromString(start);
        }

        return touch;
    }
}

export default Touch;
