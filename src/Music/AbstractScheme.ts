/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../Stage.ts" />
/// <reference path="MatcherInterface.ts" />

namespace Pricker {
    'use strict';

    /**
     * Music classes to analyse rows
     */
    export namespace Music {

        /**
         * Abstract music matching scheme
         */
        export abstract class AbstractScheme {

            /**
             * Constructor
             */
            constructor(protected _stage: Stage) {
                // NOOP
            }

            /**
             * Get matchers for this scheme/stage
             */
            public abstract getMatchers(): MatcherInterface[];

        }

    }

}
