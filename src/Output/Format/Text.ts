/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="Abstract.ts" />
/// <reference path="../../Call.ts" />

namespace Pricker {
    'use strict';

    /**
     * Classes for output
     */
    export namespace Output {

        /**
         * Formats, e.g. HTML, plain text
         */
        export namespace Format {

            /**
             * Plain text
             */
            export class Text extends AbstractFormat {
                /**
                 * Ends a line of output
                 */
                public endLine(): this {
                    return this.print('\n');
                }

                /**
                 * Introduces a space between columns of output
                 */
                public newColumn(): this {
                    return this.print('  ');
                }

                /**
                 * Renders a call, storing to the internal buffer
                 */
                public printCall(call: Call, index: number): this {
                    if (call === Call.Plain) {
                        return this.print(' ');
                    } else if (call === Call.Bob) {
                        return this.print('-');
                    } else {
                        return this.print('s');
                    }
                }
            }

        }

    }

}
