/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

/**
 * Template context.
 * Object with data to be printed by the template.
 */
export interface Context {
    [index: string]: any;
}

/**
 * Renders the object with a template.
 * Takes the name of the template and a [[Context]], adding the object instance
 * to the context before executing the template.
 */
export type Print = (name: string, context?: Context) => string;

/**
 * Interface implemented by objects that can be printed.
 */
export interface Printable {
    print: Print;
}

/**
 * A template function.
 * Takes a [[Context]] and produces a string rendering of that context.
 * Templates are precompiled using the [doT.js](https://olado.github.io/doT/)
 * template precompiler.
 */
export type Template = (context: Context) => string;

/**
 * Collection of templates used by a particular class.
 * A class may have multiple different templates.
 * The [[makePrintable]] decorator stores these on the class' prototype within
 * the `templates` property.
 */
export interface Templates {
    [name: string]: Template;
}
