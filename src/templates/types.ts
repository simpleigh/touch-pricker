/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/**
 * Template context.
 * Object with data to be printed by the template.
 */
export type Context = Record<string, unknown>;

/**
 * Renders the object with a template.
 * Takes the name of the template and a {@link Context}, adding the object
 * instance to the context before executing the template.
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
 * Takes a {@link Context} and produces a string rendering of that context.
 * Templates are precompiled using the [doT.js](https://olado.github.io/doT/)
 * template precompiler.
 */
export type Template = (context: Context) => string;

/**
 * Collection of templates used by a particular class.
 * A class may have multiple different templates.
 * The {@link makePrintable} decorator stores these on the class' prototype
 * within the `templates` property.
 */
export type Templates = Record<string, Template>;
