/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-16 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractSix.ts" />

namespace Pricker {
    'use strict';

    /**
     * A quick six
     */
    export class Quick extends AbstractSix {
        /**
         * Transposes the front three bells depending upon the type of six
         */
        protected transposeFrontThree(): AbstractSix {
            this._end[0] = this._initialRow[0];
            this._end[1] = this._initialRow[1];
            this._end[2] = this._initialRow[3];
            return this;
        }
    }
}
