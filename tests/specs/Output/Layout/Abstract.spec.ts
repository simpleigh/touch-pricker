function createLayoutTests(Layout, expected: string) {

    return function () {

        it('calls clearBuffer when printing', function () {
            let layout: Pricker.Output.Layout.ILayout = new Layout(),
                format = new Pricker.Output.Format.Text(),
                course = new Pricker.Course(
                    Pricker.rowFromString('231', Pricker.Stage.Cinques)
                );

            spyOn(format, 'clearBuffer').and.callThrough();
            layout.print(course, format);
            expect(format.clearBuffer).toHaveBeenCalled();
        });

        it('renders a course correctly', function () {
            let layout: Pricker.Output.Layout.ILayout = new Layout(),
                format = new Pricker.Output.Format.Text(),
                course = new Pricker.Course(
                    Pricker.rowFromString('231', Pricker.Stage.Cinques)
                );

            course.setLength(4);
            course.setCall(2, Pricker.Call.Single);
            course.setCall(3, Pricker.Call.Bob);

            expect(layout.print(course, format)).toEqual(expected);
        });

    };

};
