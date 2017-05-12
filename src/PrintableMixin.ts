/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="TemplateContext.ts" />

namespace Pricker {
    'use strict';

    /**
     * Mixin that provides print functionality via templates
     *
     * A `Template` is a function that takes a [[TemplateContext]] and produces
     * a string rendering of that context.
     * Templates are precompiled using the
     * [doT.js](https://olado.github.io/doT/) template precompiler and then
     * stored in [[Templates]].
     * Each template is associated with a class and expects to render objects of
     * that class, with the instance being passed via the context.
     *
     * This mixin makes it easy to make a class printable using the following
     * steps:
     *
     * 1. Add `implements PrintableMixin` to the target class.
     *    This enables the compiler to check all dependencies have been added.
     *
     * 2. Declare a [[print]] function as follows:
     *    ```
     *    public print: (t: string, c?: TemplateContext) => string;
     *    ```
     *
     * 3. Define a [[templatePath]].
     *    If a class' templates live under `src/_templates/Apple/Banana` then
     *    the `templatePath` would be defined as:
     *    ```
     *    public readonly templatePath: string = 'Apple.Banana';
     *    ```
     *
     * 4. Call [[PrintableMixin.makePrintable]] to bind the implementation of
     *    [[print]].
     *    For our `Banana` class this would be done as follows:
     *    ```
     *    Pricker.PrintableMixin.makePrintable(Banana);
     *    ```
     *
     * 5. (Optionally) check that everything has worked by extending the new
     *    class' spec. Reference the [[PrintableMixin]] spec:
     *    ```
     *    /// <reference path="PrintableMixin.spec.ts" />
     *    ```
     *    ... and then call the test function:
     *    ```
     *    describe('Banana class', function () {
     *        testPrintableMixinImplementation(() => new Banana());
     *    });
     *    ```
     *    The test function takes a single parameter which is a function that
     *    creates the class to be tested.
     */
    export abstract class PrintableMixin {

        /**
         * Renders the object with a template.
         * Takes the name of the template and a [[TemplateContext]], adding the
         * object instance to the context before executing the template.
         * Uses the [[templatePath]] to find a template with the provided
         * template name.
         * A template at `src/_templates/Class/template.dot` would be found
         * using the `templateName` of `'template.dot'` assuming a
         * [[templatePath]] of `'Class'`.
         */
        public print(
            templateName: string,
            context: TemplateContext = { },
        ): string {
            templateName = this.templatePath + '.' + templateName;
            return Templates[templateName]({...context, 'object': this});
        }

        /**
         * Path for the class' templates.
         * If a class' templates live under `src/_templates/Apple/Banana` then
         * the `templatePath` would be defined as:
         * ```
         * public readonly templatePath: string = 'Apple.Banana';
         * ```
         */
        public abstract readonly templatePath: string;

        /**
         * Binds print functionality to a class.
         * Takes a constructor and fills in the [[print]] implementation.
         */
        public static makePrintable(cls: any) {
            cls.prototype.print = PrintableMixin.prototype.print;
        }

    }

}
