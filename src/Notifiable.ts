/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

namespace Pricker {

    /**
     * Interface for objects that can receive notifications from children
     *
     * Some classes (e.g. [[AbstractContainer]]) can contain blocks.
     * Blocks notify these classes when they are changed.
     */
    export interface Notifiable {

        /**
         * Receives a notification from a block that has changed
         * @param index  index of changed block in container
         */
        notify(index: number): void;

    }

}
