/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { BlockOwnership, RandomAccessContainer } from '../../blocks';
import { rounds, Row } from '../../rows';
import { parseTouch } from '../../shared';
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
    { constructorFromType, rounds, sixes },
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
     * Read access to the initial row
     */
    get initialRow(): Row {
        return this._initialRow.slice();
    }

    /**
     * Write access to the initial row
     * Override in order to pass the initial row down to the start.
     */
    set initialRow(initialRow: Row) {
        this._initialRow = initialRow.slice();
        this._start.initialRow = initialRow.slice();
        this.calculate();
    }

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
     * Propagates data between blocks within the container
     * @param index  where to start when recalculating
     */
    protected propagateBlocks(index: number = 0): void {
        // Handle first block
        if (!index && this.length) {
            const first = this._blocks[0];

            const sixType = this._start.sixType;
            first.initialRow = this._start.getLast();
            first.setFirstSixType(this._method.getNextSixType(sixType));

            index = 1;
        }

        for (; index < this.length; index += 1) {
            const previous = this._blocks[index - 1];
            const current = this._blocks[index];

            const sixType = previous.getBlock(previous.length).type;
            current.initialRow = previous.getLast();
            current.setFirstSixType(this._method.getNextSixType(sixType));
        }
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
        let start: string | undefined;

        const parsedTouch = parseTouch(
            (row: Row) => new Touch(row, undefined, method),
            input,
            (touch: Touch, line: string) => {
                // Store start definitions for later processing
                if (/start/i.test(line)) {
                    start = line;
                    return;
                }

                // Create a course for each line
                const course = Course.fromString(touch.getLast(), line, method);
                touch.insertBlock(touch.length + 1, course);
            },
        );

        if (start) {
            parsedTouch.start.setFromString(start);
        }

        return parsedTouch;
    }
}

export default Touch;
