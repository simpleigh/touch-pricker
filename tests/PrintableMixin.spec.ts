/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/**
 * Tests that an object correctly implements PrintableMixin
 * @param createFn  create the object under test
 */
function testPrintableMixinImplementation(
    createFn: () => Pricker.PrintableMixin,
) {

    describe('implements PrintableMixin and', () => {

        let object: Pricker.PrintableMixin,
            testTemplateSpy: jasmine.Spy;

        beforeEach(() => {
            object = createFn();
            testTemplateSpy = jasmine.createSpy('test');
            Pricker.Templates[object.templatePath + '.test'] = testTemplateSpy;
        });

        afterEach(() => {
            delete Pricker.Templates[object.templatePath + '.test'];
        });

        it('defines its template path', () => {
            expect(typeof object.templatePath).toBe('string');
            expect(object.templatePath.length).toBeGreaterThan(0);
        });

        it('calls the correct template', () => {
            object.print('test');
            expect(testTemplateSpy).toHaveBeenCalled();
        });

        it('passes itself to templates', () => {
            let context: any;
            object.print('test');
            context = testTemplateSpy.calls.mostRecent().args[0];
            expect(context.object).toBe(object);
        });

        it('passes additional context to templates', () => {
            let context: any;
            object.print('test', {'test': 'extra'});
            context = testTemplateSpy.calls.mostRecent().args[0];
            expect(context.test).toBe('extra');
        });

        it('leaves the passed context unchanged', () => {
            const context: Pricker.TemplateContext = { };
            object.print('test', context);
            expect(context).toEqual({ });
        });

    });

}
