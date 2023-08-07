/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

/*
eslint-disable
@typescript-eslint/lines-between-class-members,
max-classes-per-file,
padded-blocks,
*/

import AbstractPrintable from './AbstractPrintable';
import { Context, Templates as TemplateProperty } from './types';
import * as Templates from '.';

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
        const templates = { template: () => 'template output' };

        @Templates.makePrintable(templates)
        class Test implements Templates.Interface {
            public print: Templates.Print;
            public templates: TemplateProperty;
        }

        expect(Test.prototype.templates).toEqual(templates);
    });

    it('binds extra context to the class', () => {
        const extraContext = { context: 'context value' };

        @Templates.makePrintable({ }, extraContext)
        class Test implements Templates.Interface {
            public print: Templates.Print;
            public extraContext: Context;
        }

        expect(Test.prototype.extraContext).toEqual(extraContext);
    });

    it('merges multiple applications together', () => {
        const template1 = () => 'template 1 outut';
        const template2 = () => 'template 2 outut';
        const context1 = 'context 1 value';
        const context2 = 'context 2 value';

        @Templates.makePrintable({ template1 }, { context1 })
        @Templates.makePrintable({ template2 }, { context2 })
        class Test implements Templates.Interface {
            public print: Templates.Print;
            public templates: TemplateProperty;
            public extraContext: Context;
        }

        expect(Test.prototype.templates).toEqual({ template1, template2 });
        expect(Test.prototype.extraContext).toEqual({ context1, context2 });
    });

});
