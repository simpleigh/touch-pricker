/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { RandomAccessContainer } from '../../blocks';
import { rounds, type Row } from '../../rows';
import * as Templates from '../../templates';
import type { AbstractVisitor } from '../../visitors';
import constructorFromType from '../constructorFromType';
import type Course from '../Course';
import { type AbstractMethod, Stedman } from '../methods';
import Parser from '../Parser';
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
    implements Templates.Interface
{
    /**
     * Start for this touch
     */
    private readonly _start: Start;

    /**
     * Constructor
     *
     * Extends the AbstractBlock container to set up the start and method.
     */
    constructor(
        initialRow: Row,
        private readonly _method: AbstractMethod = new Stedman(),
    ) {
        super(initialRow);

        this._start = new Start(initialRow, this._method);
        this.start.ownership = { container: this, index: 0 };
    }

    /* AbstractBlock methods **************************************************/

    /**
     * Read access to the initial row
     */
    override get initialRow(): Row {
        return this._initialRow.slice();
    }

    /**
     * Write access to the initial row
     * Override in order to pass the initial row down to the start.
     */
    override set initialRow(initialRow: Row) {
        this._initialRow = initialRow.slice();
        this._start.initialRow = initialRow.slice();
        this.calculate();
    }

    /**
     * Number of rows in the block
     * This doesn't take into account coming round part-way through
     */
    override get rows(): number {
        return (
            this._start.rows +
            this._blocks.reduce((total, block) => total + block.rows, 0)
        );
    }

    /**
     * Receives a visitor that will be called to process each row
     */
    public override accept(...visitors: AbstractVisitor[]): this {
        for (const visitor of visitors) {
            this._start.accept(visitor);
        }

        return super.accept(...visitors);
    }

    /* templating *************************************************************/

    public print: Templates.Print;

    /* AbstractContainer methods **********************************************/

    /**
     * Propagates data between blocks within the container
     * @param index  where to start when recalculating
     */
    protected override propagateBlocks(index: number = 0): void {
        // Handle first block
        if (!index && this.length) {
            const [first] = this._blocks;

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
        parser: Parser = new Parser(),
    ): Touch {
        parser.method = method;
        return parser.parseTouch(input);
    }
}

export default Touch;
