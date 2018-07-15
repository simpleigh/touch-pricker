/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import AbstractSix from './AbstractSix';
import mbd from './AbstractSix/mbd.dot';
import siril from './AbstractSix/siril.dot';
import * as Changes from './Changes';
import SixType from './SixType';
import * as Templates from './templates';
import * as Visitor from './Visitor';

/**
 * A quick six
 */
@Templates.makePrintable({ mbd, siril })
class Quick extends AbstractSix {

    /**
     * Type of the six
     */
    public readonly type = SixType.Quick;

    /**
     * Notation (excluding call)
     */
    public static readonly notation = ['1', '3', '1', '3', '1'];
    public readonly notation = Quick.notation;

    /* AbstractBlock methods **************************************************/

    /**
     * Receives a visitor that will be called to process each row
     */
    public accept(...visitors: Visitor.AbstractVisitor[]): this {
        const row = this.getInitialRow();

        for (const visitor of visitors) {
            Changes.permuteCall(row, this._call);
            visitor.visit(row, this);

            Changes.permute1(row);
            visitor.visit(row, this);

            Changes.permute3(row);
            visitor.visit(row, this);

            Changes.permute1(row);
            visitor.visit(row, this);

            Changes.permute3(row);
            visitor.visit(row, this);

            visitor.visit(this._end, this);
        }

        return this;
    }

    /* AbstractSix methods ****************************************************/

    /**
     * Transposes the front three bells depending upon the type of six
     */
    protected applySixTransposition(): void {
        Changes.permute3(this._end);
    }

}

export default Quick;
