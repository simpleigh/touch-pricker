/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import AbstractPricker from '../../AbstractPricker';
import { Notifiable } from '../../blocks';
import { rowFromString, Stage } from '../../rows';
import * as Templates from '../../templates';
import Touch from '../Touch';
import css from './css.dot';
import html from './html.dot';

@Templates.makePrintable({ css, html })
class Pricker extends AbstractPricker implements Notifiable {

    /**
     * The touch itself
     */
    private _touch: Touch;

    /* Notifiable methods *****************************************************/

    /**
     * Receives a notification from a block that has changed
     * @param index  index of changed block in container
     */
    public notify(index: number): void {
        this.redraw();
    }

    /* Pricker methods ********************************************************/

    public onLoad(): void {
        this.reboot();
    }

    private reboot(): void {
        this._touch = new Touch(
            rowFromString('', Stage.Maximus),
            { container: this, index: 0 },
        );
        this._touch.resetLength();

        this.redraw();
    }

    private redraw(): void {
        this.getEl<HTMLDivElement>('leadheads').innerHTML =
            this._touch.print('html');

        this.resize();
    }

    public onMethod(index: number): void {
        const id = `method${index}`;
        const value = this.getEl<HTMLSelectElement>(id).value;
        this._touch.getBlock(index).method = value;
    }
}

export default Pricker;
