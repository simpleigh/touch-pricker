/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import AbstractPrintable from './AbstractPrintable';
import { Templates } from './types';

/**
 * Decorator that makes a class printable.
 * Takes an object containing all the templates for a class and binds it to that
 * class, filling in the implementation of `print`.
 */
const makePrintable = (templates: Templates) => (cls: any) => {
    cls.prototype.print = AbstractPrintable.prototype.print;
    cls.prototype.templates = templates;
};

export default makePrintable;
