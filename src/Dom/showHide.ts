/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

namespace Pricker {

    /**
     * DOM helper utilities
     */
    export namespace Dom {

        /**
         * Hides a block element
         */
        export function hide(element: HTMLElement): void {
            element.style.display = 'none';
            element.style.visibility = 'hidden';
        }

        /**
         * Shows a block element
         */
        export function show(element: HTMLElement): void {
            element.style.display = 'block';
            element.style.visibility = 'visible';
        }

    }

}
