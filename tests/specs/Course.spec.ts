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
            expect(course.getEnd()).toEqual(row);
        }
    ));

    it('provides read access to sixes', testStages(function(stage) {
        let row: Pricker.Row = Pricker.rowFromString('231', stage),
            course = new Pricker.Course(row);

        // Last invalid six before course
        expect(function () { course.getSix(0); })
            .toThrowError('Block index out of range');

        // First valid six (start of course)
        expect(course.getSix(1).getInitialRow())
            .toEqual(course.getInitialRow());

        // Last valid six (end of course)
        expect(course.getSix(stage * 2).getEnd())
            .toEqual(course.getEnd());

        // First invalid six after course
        expect(function () { course.getSix(stage * 2 + 1); })
            .toThrowError('Block index out of range');
    }));

    it('allows the number of sixes to be increased', testStages(
        function (stage) {
            let row: Pricker.Row = Pricker.rowFromString('231', stage),
                course = new Pricker.Course(row);

            course.setLength(stage * 2 + 4);
            expect(course.getLength()).toBe(stage * 2 + 4);
            expect(course.getEnd()).toEqual(course.getSix(4).getEnd());
        }
    ));

    it('allows the number of sixes to be decreased', testStages(
        function (stage) {
            let row: Pricker.Row = Pricker.rowFromString('231', stage),
                course = new Pricker.Course(row),
                fourthSixEnd: Pricker.Row = course.getSix(4).getEnd();

            course.setLength(4);
            expect(course.getLength()).toBe(4);
            expect(course.getEnd()).toEqual(fourthSixEnd);
        }
    ));

    it('recalculates when calls are set', function () {
        let row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques),
            course = new Pricker.Course(row);

        course.getSix(1).setCall(Pricker.Call.Bob);
        expect(Pricker.stringFromRow(course.getSix(1).getEnd()))
            .toBe('3426185970E');
        expect(Pricker.stringFromRow(course.getSix(2).getEnd()))
            .toBe('346829105E7');
        expect(Pricker.stringFromRow(course.getEnd()))
            .toBe('23145678E90');

        course.getSix(10).setCall(Pricker.Call.Single);
        course.getSix(13).setCall(Pricker.Call.Single);
        course.getSix(22).setCall(Pricker.Call.Bob);
        expect(Pricker.stringFromRow(course.getEnd()))
            .toBe('2314567890E');
    });

    it('recalculates when calls are toggled', function () {
        let row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques),
            course = new Pricker.Course(row);

        course.getSix(1).toggleCall();
        expect(Pricker.stringFromRow(course.getEnd()))
            .toBe('23145678E90');
    });

    it('avoids recalculating sixes before a call is made', function () {
        let row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques),
            course = new Pricker.Course(row);

        spyOn(course.getSix(6), 'setInitialRow');
        course.getSix(6).setCall(Pricker.Call.Bob);
        expect(course.getSix(6).setInitialRow).not.toHaveBeenCalled();
    });

    it('throws an exception if we try to set an invalid length', function () {
        let row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques),
            course = new Pricker.Course(row);

        expect(function () { course.setLength(1); })
            .toThrowError('Number of sixes out of range');
        expect(function () { course.setLength(61); })
            .toThrowError('Number of sixes out of range');
    });

    it('provides a safe way to set lengths without exceptions', function () {
        let row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques),
            course = new Pricker.Course(row);

        course.safeSetLength(1);
        expect(course.getLength()).toBe(2);
        course.safeSetLength(61);
        expect(course.getLength()).toBe(60);
    });

    testAbstractBlockImplementation(Pricker.Course);

    testAbstractContainerImplementation(Pricker.Course);
});
