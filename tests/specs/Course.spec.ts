describe('Course class', function () {

    function testStages(testFunction) {
        let stages: Pricker.Stage[] = [
            Pricker.Stage.Triples,
            Pricker.Stage.Caters,
            Pricker.Stage.Cinques,
            Pricker.Stage.Sextuples,
            Pricker.Stage.Septuples,
        ];

        return function () {
            let i: number;
            for (i = 0; i < stages.length; i += 1) {
                testFunction(stages[i]);
            }
        };
    }

    it('starts out as a plain course of the right length', testStages(
        function (stage) {
            let row: Pricker.Row = Pricker.rowFromString('231', stage),
                course = new Pricker.Course(row);

            expect(course.getLength()).toBe(stage * 2);
            expect(course.getCourseEnd()).toEqual(row);
        }
    ));

    it('updates when the previous course end changes', testStages(
        function (stage) {
            let row: Pricker.Row = Pricker.rowFromString('231', stage),
                newRow: Pricker.Row = Pricker.rowFromString('', stage),
                course = new Pricker.Course(row);

            expect(course.getPreviousCourseEnd()).toEqual(row);
            expect(course.getCourseEnd()).toEqual(row);
            course.setPreviousCourseEnd(newRow);
            expect(course.getPreviousCourseEnd()).toEqual(newRow);
            expect(course.getCourseEnd()).toEqual(newRow);
        }
    ));

    it('provides read access to sixes', testStages(function(stage) {
        let row: Pricker.Row = Pricker.rowFromString('231', stage),
            course = new Pricker.Course(row);

        expect(course.getSix(1).getPreviousSixEnd())
            .toEqual(course.getPreviousCourseEnd());
        expect(course.getSix(stage * 2).getSixEnd())
            .toEqual(course.getCourseEnd());
    }));

    it('allows the number of sixes to be increased', testStages(
        function (stage) {
            let row: Pricker.Row = Pricker.rowFromString('231', stage),
                course = new Pricker.Course(row);

            course.setLength(stage * 2 + 4);
            expect(course.getLength()).toBe(stage * 2 + 4);
            expect(course.getCourseEnd()).toEqual(course.getSix(4).getSixEnd());
        }
    ));

    it('allows the number of sixes to be decreased', testStages(
        function (stage) {
            let row: Pricker.Row = Pricker.rowFromString('231', stage),
                course = new Pricker.Course(row),
                fourthSixEnd: Pricker.Row = course.getSix(4).getSixEnd();

            course.setLength(4);
            expect(course.getLength()).toBe(4);
            expect(course.getCourseEnd()).toEqual(fourthSixEnd);
        }
    ));

    it('allows direct access to toggle calls', function () {
        let row: Pricker.Row = Pricker.rowFromString(
                '231',
                Pricker.Stage.Cinques
            ),
            course = new Pricker.Course(row);

        expect(course.getSix(1).getCall()).toBe(Pricker.Call.Plain);
        expect(course.toggleCall(1)).toBe(Pricker.Call.Bob);
        expect(course.getSix(1).getCall()).toBe(Pricker.Call.Bob);
        expect(Pricker.stringFromRow(course.getCourseEnd()))
            .toBe('23145678E90');
    });

    it('allows direct access to set calls', function () {
        let row: Pricker.Row = Pricker.rowFromString(
                '231',
                Pricker.Stage.Cinques
            ),
            course = new Pricker.Course(row);

        course.setCall(4, Pricker.Call.Bob);
        expect(course.getSix(4).getCall()).toBe(Pricker.Call.Bob);
    });

    it('recalculates when calls are set', function () {
        let row: Pricker.Row = Pricker.rowFromString(
                '231',
                Pricker.Stage.Cinques
            ),
            course = new Pricker.Course(row);

        course.setCall(1, Pricker.Call.Bob);
        expect(Pricker.stringFromRow(course.getSix(1).getSixEnd()))
            .toBe('3426185970E');
        expect(Pricker.stringFromRow(course.getSix(2).getSixEnd()))
            .toBe('346829105E7');
        expect(Pricker.stringFromRow(course.getCourseEnd()))
            .toBe('23145678E90');

        course.setCall(10, Pricker.Call.Single);
        course.setCall(13, Pricker.Call.Single);
        course.setCall(22, Pricker.Call.Bob);
        expect(Pricker.stringFromRow(course.getCourseEnd()))
            .toBe('2314567890E');
    });

    it('avoids recalculating sixes before a call is made', function () {
        let row: Pricker.Row = Pricker.rowFromString(
                '231',
                Pricker.Stage.Cinques
            ),
            course = new Pricker.Course(row);

        spyOn(course.getSix(5), 'setPreviousSixEnd');
        course.setCall(6, Pricker.Call.Bob);
        expect(course.getSix(5).setPreviousSixEnd).not.toHaveBeenCalled();
    });

    it('throws an exception if we try to set an invalid length', function () {
        let row: Pricker.Row = Pricker.rowFromString(
                '231',
                Pricker.Stage.Cinques
            ),
            course = new Pricker.Course(row);

        expect(function () { course.setLength(1); })
            .toThrowError('Number of sixes out of range');
        expect(function () { course.setLength(61); })
            .toThrowError('Number of sixes out of range');
    });

    it('provides a safe way to set lengths without exceptions', function () {
        let row: Pricker.Row = Pricker.rowFromString(
                '231',
                Pricker.Stage.Cinques
            ),
            course = new Pricker.Course(row);

        course.safeSetLength(1);
        expect(course.getLength()).toBe(2);
        course.safeSetLength(61);
        expect(course.getLength()).toBe(60);
    });

    it('throws an exception when we try and manipulate invalid sixes',
        function () {
            let row: Pricker.Row = Pricker.rowFromString(
                    '231',
                    Pricker.Stage.Cinques
                ),
                course = new Pricker.Course(row);

            expect(function () { course.getSix(0); })
                .toThrowError('Six number out of range');
            expect(function () { course.getSix(23); })
                .toThrowError('Six number out of range');
            expect(function () { course.setCall(0, Pricker.Call.Bob); })
                .toThrowError('Six number out of range');
            expect(function () { course.setCall(23, Pricker.Call.Bob); })
                .toThrowError('Six number out of range');
        }
    );

});
