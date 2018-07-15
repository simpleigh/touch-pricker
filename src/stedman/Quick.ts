/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Changes } from '../rows';
import * as Templates from '../templates';
import { AbstractVisitor } from '../visitors';
import AbstractSix from './AbstractSix';
import mbd from './AbstractSix/mbd.dot';
import siril from './AbstractSix/siril.dot';
import Call from './Call';
import SixType from './SixType';

/**
 * A quick six
 */
@Templates.makePrintable({ mbd, siril }, { Call, 'type': 'quick' })
class Quick extends AbstractSix {

    /**
     * Type of the six
     */
    public readonly type = SixType.Quick;

    /**
     * Notation (excluding call)
     */
    public readonly notation = ['1', '3', '1', '3', '1'];

    /* AbstractBlock methods **************************************************/

    /**
     * Receives a visitor that will be called to process each row
     */
    public accept(...visitors: AbstractVisitor[]): this {
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
