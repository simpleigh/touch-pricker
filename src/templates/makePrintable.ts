/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/*
eslint-disable
@typescript-eslint/explicit-module-boundary-types,
@typescript-eslint/no-explicit-any,
@typescript-eslint/no-unsafe-assignment,
@typescript-eslint/no-unsafe-member-access,
@typescript-eslint/unbound-method,
*/

import AbstractPrintable from './AbstractPrintable';
import type { Context, Templates } from './types';

/**
 * Decorator that makes a class printable.
 * Takes an object containing all the templates for a class and binds it to that
 * class, filling in the implementation of `print`.
 */
const makePrintable =
    (templates: Templates, extraContext: Context = {}) =>
    (cls: any): void => {
        if (!cls.prototype.print) {
            cls.prototype.print = AbstractPrintable.prototype.print;
            cls.prototype.templates = {};
            cls.prototype.extraContent = {};
        }

        cls.prototype.templates = {
            ...cls.prototype.templates,
            ...templates,
        };

        cls.prototype.extraContext = {
            ...cls.prototype.extraContext,
            ...extraContext,
        };
    };

export default makePrintable;
