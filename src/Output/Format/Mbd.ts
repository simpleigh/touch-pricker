/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015 Leigh Simpson. All rights reserved.
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
             * Format matching MBD's course pricker
             */
            export class Mbd extends AbstractFormat {
                /**
                 * Ends a line of output
                 */
                public endLine(): this {
                    return this.print('<br />\n');
                }

                /**
                 * Introduces a space between columns of output
                 */
                public newColumn(): this {
                    return this.print('&nbsp;&nbsp;');
                }

                /**
                 * Renders a call, storing to the internal buffer
                 */
                public printCall(call: Call, index: number): this {
                    return this.print(''
                        + '<span class="'
                        + (index % 2 ? 'oddCall' : 'evenCall')
                        + '" onclick="c('
                        + index
                        + ')">&nbsp;'
                        + (call === Call.Plain ? '&nbsp;' : '')
                        + (call === Call.Bob ? '-' : '')
                        + (call === Call.Single ? 's' : '')
                        + '&nbsp;</span>'
                    );
                }
            }

        }

    }

}