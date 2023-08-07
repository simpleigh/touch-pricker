/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

/**
 * Interface for objects that can receive notifications from children
 *
 * Some classes (e.g. {@link <internal>.AbstractContainer}) can contain blocks.
 * Blocks notify these classes when they are changed.
 */
interface Notifiable {

    /**
     * Receives a notification from a block that has changed
     * @param index  index of changed block in container
     */
    notify: (index: number) => void;

}

export default Notifiable;
