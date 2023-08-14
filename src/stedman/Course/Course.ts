/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { AbstractCourse, Call } from '../../leads';
import { Row } from '../../rows';
import * as Templates from '../../templates';
import { AbstractMethod, Stedman } from '../methods';
import Parser from '../Parser';
import { AbstractSix } from '../sixes';
import SixType from '../SixType';
import mbd from './mbd.dot';
import siril from './siril.dot';

/**
 * A course, being a set of sixes
 */
@Templates.makePrintable({ mbd, siril }, { Call, leadsWord: 'sixes' })
class Course
    extends AbstractCourse<AbstractSix>
    implements Templates.Interface {
    /**
     * Type of the first six
     */
    private _firstSixType: SixType;

    /**
     * Constructor
     *
     * Extends the AbstractBlock container to set up the method.
     */
    constructor(
        initialRow: Row,
        private readonly _method: AbstractMethod = new Stedman(),
    ) {
        super(initialRow);
        this._firstSixType = this._method.defaultFirstSix;
    }

    /* SerialContainer methods ************************************************/

    /**
     * Returns the default length for this container
     * N.b. this is likely to vary depending on the stage
     */
    protected get defaultLength(): number {
        return this._method.getCourseLength(this.stage);
    }

    /**
     * Creates a new block for the container
     *
     * Used by extend() when creating the container or increasing its
     * length.
     * @param initialRow  initial row for the block
     * @param index       index of block in container
     */
    protected createBlock(initialRow: Row, index: number): AbstractSix {
        return this._method.createSix(initialRow, this, index);
    }

    /* AbstractCourse methods *************************************************/

    /**
     * Clones the course
     */
    public override clone(): this {
        const cloned = new Course(this._initialRow, this._method) as this;

        cloned.setFirstSixType(this.firstSixType);
        Course.copyCalls(this, cloned);

        return cloned;
    }

    /* Course methods *********************************************************/

    /**
     * Read access to the type of the first six
     */
    get firstSixType(): SixType {
        return this._firstSixType;
    }

    /**
     * Write access to the type of the first six
     */
    public setFirstSixType(type: SixType): this {
        this._method.checkSixType(type);

        if (this._firstSixType === type) {
            return this;  // nothing to do
        }

        this._firstSixType = type;

        // Create a new array of sixes with the correct parity
        let initialRow = this._initialRow;
        const newSixes: AbstractSix[] = [];
        for (let index = 1; index <= this.length; index += 1) {
            const block = this.createBlock(initialRow, index);
            block.ownership = { container: this, index };
            block.setCall(
                this.getBlock(index).call,
                false,  // Avoid multiple updates...
            );
            newSixes.push(block);
            initialRow = newSixes[index - 1].getLast();
        }

        this._blocks = newSixes;

        // ... and trigger one at the end
        if (newSixes.length) {
            this.getBlock(1).setCall(this.getBlock(1).call);
        }

        return this;
    }

    /**
     * Provides read access to the method
     */
    get method(): AbstractMethod {
        return this._method;
    }

    /**
     * Creates a new course from a string representation
     */
    public static fromString(
        initialRow: Row,
        input: string,
        method: AbstractMethod = new Stedman(),
        parser: Parser = new Parser(),
    ): Course {
        parser.method = method;
        return parser.parseCourse(initialRow, input);
    }
}

export default Course;
