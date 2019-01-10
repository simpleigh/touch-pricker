/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

// tslint:disable:max-classes-per-file

import * as Templates from '.';
import AbstractPrintable from './AbstractPrintable';
import { Context, Templates as TemplateProperty } from './types';

describe('makePrintable decorator', () => {
    it('binds the print function to the class', () => {
        @Templates.makePrintable({ })
        class Test implements Templates.Interface {
            public print: Templates.Print;
        }

        expect(Test.prototype.print).toBe(AbstractPrintable.prototype.print);

        const test = new Test();
        expect(test.print).toBeDefined();
        expect(typeof test.print).toBe('function');
    });

    it('binds the templates to the class', () => {
        const templates = { };

        @Templates.makePrintable(templates)
        class Test implements Templates.Interface {
            public print: Templates.Print;
            public templates: TemplateProperty;
        }

        expect(Test.prototype.templates).toBe(templates);
    });

    it('binds extra context to the class', () => {
        const extraContext = { };

        @Templates.makePrintable({ }, extraContext)
        class Test implements Templates.Interface {
            public print: Templates.Print;
            public extraContext: Context;
        }

        expect(Test.prototype.extraContext).toBe(extraContext);
    });
});
