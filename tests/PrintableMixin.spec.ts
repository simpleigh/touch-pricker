/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/**
 * Tests that an object correctly implements PrintableMixin
 * @param createFn  create the object under test
 */
function testPrintableMixinImplementation(
    createFn: () => Pricker.PrintableMixin,
) {

    describe('implements PrintableMixin and', function () {

        let object: Pricker.PrintableMixin,
            testTemplateSpy: jasmine.Spy;

        beforeEach(function () {
            object = createFn();
            testTemplateSpy = jasmine.createSpy('test');
            Pricker.Templates[object.templatePath + '.test'] = testTemplateSpy;
        });

        afterEach(function () {
            delete Pricker.Templates[object.templatePath + '.test'];
        });

        it('defines its template path', function () {
            expect(typeof object.templatePath).toBe('string');
            expect(object.templatePath.length).toBeGreaterThan(0);
        });

        it('calls the correct template', function () {
            object.print('test');
            expect(testTemplateSpy).toHaveBeenCalled();
        });

        it('passes itself to templates', function () {
            let context: any;
            object.print('test');
            context = testTemplateSpy.calls.mostRecent().args[0];
            expect(context.object).toBe(object);
        });

        it('passes additional context to templates', function () {
            let context: any;
            object.print('test', {'test': 'extra'});
            context = testTemplateSpy.calls.mostRecent().args[0];
            expect(context.test).toBe('extra');
        });

        it('leaves the passed context unchanged', function () {
            const context: Pricker.TemplateContext = { };
            object.print('test', context);
            expect(context).toEqual({ });
        });

    });

}
