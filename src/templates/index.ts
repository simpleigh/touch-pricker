/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/**
 * Template functionality.
 *
 * A [[Template]] is a function that takes a [[Context]] and produces a string
 * rendering of that context.
 * Templates are precompiled using the [doT.js](https://olado.github.io/doT/)
 * template precompiler.
 * Each template is associated with a class and expects to render objects of
 * that class, with the instance being passed via the context.
 *
 * A class can be made printable by the [[makePrintable]] decorator using the
 * following steps:
 *
 * 1. Import dependencies:
 *    ```
 *    import * as Templates from './templates';
 *    ```
 *
 * 1. Add `implements Templates.Printable` to the target class.
 *    This enables the compiler to check dependencies have been added correctly.
 *
 * 2. Declare a [[print]] function as follows:
 *    ```
 *    public print: Templates.Print;
 *    ```
 *
 * 3. Import any templates used by the class and pass them to the
 *    [[makePrintable]] decorator:
 *    ```
 *    import text from './text.dot';
 *    @Templates.makePrintable({ text })
 *    class Banana {
 *        // ...
 *
 * [[makePrintable]] also takes an additional parameter allowing extra default
 * context to be included when rendering the template.
 */

export { default as makePrintable } from './makePrintable';
export { Print, Printable as Interface } from './types';
