/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import AbstractPrintable from './AbstractPrintable';
import { Context, Templates } from './types';

/**
 * Decorator that makes a class printable.
 * Takes an object containing all the templates for a class and binds it to that
 * class, filling in the implementation of `print`.
 */
const makePrintable = (
    templates: Templates,
    extraContext: Context = { },
) => (cls: any) => {
    if (!cls.prototype.print) {
        cls.prototype.print = AbstractPrintable.prototype.print;
        cls.prototype.templates = { };
        cls.prototype.extraContent = { };
    }

    cls.prototype.templates = {
        ...cls.prototype.templates,
        ...templates,
    }

    cls.prototype.extraContext = {
        ...cls.prototype.extraContext,
        ...extraContext,
    }
};

export default makePrintable;
