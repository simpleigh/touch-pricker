/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

/* eslint-disable jsdoc/check-indentation */

/**
 * Template functionality.
 *
 * A {@link Template} is a function that takes a {@link Context} and produces a
 * string rendering of that context.
 * Templates are precompiled using the [doT.js](https://olado.github.io/doT/)
 * template precompiler.
 * Each template is associated with a class and expects to render objects of
 * that class, with the instance being passed via the context.
 *
 * A class can be made printable by the {@link makePrintable} decorator using
 * the following steps:
 *
 * 1. Import dependencies:
 *     ```
 *     import * as Templates from './templates';
 *     ```
 *
 * 2. Add `implements Templates.Printable` to the target class.
 *     This makes the compiler check dependencies have been added correctly.
 *
 * 3. Declare a {@link print} function as follows:
 *     ```
 *     public print: Templates.Print;
 *     ```
 *
 * 4. Import any templates used by the class and pass them to the
 *     {@link makePrintable} decorator:
 *     ```
 *     import text from './text.dot';
 *     @Templates.makePrintable({ text })
 *     class Banana {
 *         // ...
 *     ```
 *
 * {@link makePrintable} also takes an additional parameter allowing extra
 * default context to be included when rendering the template.
 */

export { default as makePrintable } from './makePrintable';
export type { Print, Printable as Interface } from './types';
