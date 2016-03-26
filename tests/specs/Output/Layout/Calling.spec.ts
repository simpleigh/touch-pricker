describe('Calling layout', createLayoutTests(
    Pricker.Output.Layout.Calling,
    '480735692E1  s2 3  (4 sixes)\n',
    function () {

        it('only displays the number of sixes when needed', function () {
            let layout = new Pricker.Output.Layout.Calling(),
                format = new Pricker.Output.Format.Text(),
                course = new Pricker.Course(
                    Pricker.rowFromString('231', Pricker.Stage.Cinques)
                );

            course.getSix(1).setCall(Pricker.Call.Bob);
            expect(layout.print(course, format)).toBe('23145678E90  1\n');
        });

        it('displays "p" when a course has no calls', function () {
            let layout = new Pricker.Output.Layout.Calling(),
                format = new Pricker.Output.Format.Text(),
                course = new Pricker.Course(
                    Pricker.rowFromString('231', Pricker.Stage.Cinques)
                );

            expect(layout.print(course, format)).toBe('2314567890E  p\n');
        });

    }
));
