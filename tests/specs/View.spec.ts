/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('View class', function () {

    /**
     * Maintain an external reference to this
     *
     * Using this reference to access spy properties and methods avoids
     * TypeScript compiler errors when directly accessing Pricker.Templates.
     */
    let testTemplateSpy;

    /**
     * Creates a mock template
     */
    beforeAll(function () {
        testTemplateSpy = jasmine.createSpy('test');
        Pricker.Templates.test = testTemplateSpy;
    });

    /**
     * Cleans up the stub template
     */
    afterAll(function () {
        delete Pricker.Templates.test;
    });

    /**
     * Tests the view with a plain course
     */
    function testPlain(): any {
        const view: Pricker.View = new Pricker.View('test'),
            course: Pricker.Course = new Pricker.Course(
                Pricker.rowFromString('231', Pricker.Stage.Cinques),
            );

        view.print(course);
        return testTemplateSpy.calls.mostRecent().args[0];
    }

    /**
     * Tests the view with a more interesting course
     */
    function testNonPlain(): any {
        const view: Pricker.View = new Pricker.View('test'),
            course: Pricker.Course = new Pricker.Course(
                Pricker.rowFromString('231', Pricker.Stage.Cinques),
            );

        course.setLength(4);
        course.getSix(2).setCall(Pricker.Call.Single);
        course.getSix(3).setCall(Pricker.Call.Bob);

        view.print(course);
        return testTemplateSpy.calls.mostRecent().args[0];
    }

    it('loads the correct template', function () {
        testPlain();
        expect(testTemplateSpy).toHaveBeenCalled();
    });

    it('passes the course end', function () {
        const data: any = testNonPlain();
        expect(data.courseEnd).toEqual('480735692E1');
    });

    it('passes the initial row', function () {
        const data: any = testNonPlain();
        expect(data.initialRow).toEqual('2314567890E')
    });

    it('identifies plain courses', function () {
        const data: any = testPlain();
        expect(data.isPlainCourse).toBe(true);
    });

    it('identifies non-plain courses', function () {
        const data: any = testNonPlain();
        expect(data.isPlainCourse).toBe(false);
    });

    it('passes an array of sixes', function () {
        const data: any = testPlain();
        expect(data.sixes instanceof Array).toBe(true);
        expect(data.sixes.length).toBe(22);
    });

    it('passes the correct indices', function () {
        const data: any = testPlain();
        expect(data.sixes[0].index).toBe(1);
        expect(data.sixes[1].index).toBe(2);
        expect(data.sixes[20].index).toBe(21);
        expect(data.sixes[21].index).toBe(22);
    });

    it('passes the correct calls', function () {
        const data: any = testNonPlain();
        expect(data.sixes[0].call).toBe(Pricker.Call.Plain);
        expect(data.sixes[1].call).toBe(Pricker.Call.Single);
        expect(data.sixes[2].call).toBe(Pricker.Call.Bob);
        expect(data.sixes[3].call).toBe(Pricker.Call.Plain);
    });

    it('passes the correct six ends', function () {
        const data: any = testPlain();
        expect(data.sixes[0].end).toBe('342618507E9');
        expect(data.sixes[1].end).toBe('3468201E597');
        expect(data.sixes[20].end).toBe('23517496E80');
        expect(data.sixes[21].end).toBe('2314567890E');
    });

});
