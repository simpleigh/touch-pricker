/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="TemplateContext.ts" />

namespace Pricker {
    'use strict';

    /**
     * Mixin that provides print functionality via templates
     *
     * 1. modify target class to add "implements PrintableMixin"
     * 2. Paste a definitions for the print function:
     *      public print: (t: string, c?: TemplateContext) => string;
     * 3. Define a value for templatePath
     * 4. call PrintableMixin.maxePrintable with the target class
     */
    export abstract class PrintableMixin {

        /**
         * Renders the object with a template
         */
        public print(
            templateName: string,
            context: TemplateContext = { },
        ): string {
            templateName = this.templatePath + '.' + templateName;
            context.object = this;
            return Templates[templateName](context);
        }

        /**
         * Path for this class' templates
         */
        public abstract readonly templatePath: string;

        /**
         * Binds print functionality to a class
         */
        public static makePrintable(cls: any) {
            cls.prototype.print = PrintableMixin.prototype.print;
        }

    }

}
