/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015 Leigh Simpson. All rights reserved.
 */


import { Call } from '../../stedman';
import { AbstractFormat } from './Abstract';


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
