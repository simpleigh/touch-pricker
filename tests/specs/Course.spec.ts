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

    it('provides read access to the sixes', testStages(function(stage) {
        let row: Pricker.Row = Pricker.rowFromString('231', stage),
            course = new Pricker.Course(row),
            sixes: Pricker.Six.AbstractSix[] = course.getSixes();

        expect(sixes.length).toBe(stage * 2);
        expect(sixes[0].getPreviousSixEnd())
            .toEqual(course.getPreviousCourseEnd());
        expect(sixes[sixes.length - 1].getSixEnd())
            .toEqual(course.getCourseEnd());
    }));

    it('provides read access to sixes', testStages(function(stage) {
        let row: Pricker.Row = Pricker.rowFromString('231', stage),
            course = new Pricker.Course(row);

        expect(course.getSix(1).getPreviousSixEnd())
            .toEqual(course.getPreviousCourseEnd());
        expect(course.getSix(stage * 2).getSixEnd())
            .toEqual(course.getCourseEnd());
    }));

    it('allows direct read access to six ends', function () {
        let row: Pricker.Row = Pricker.rowFromString(
                '231',
                Pricker.Stage.Cinques
            ),
            course = new Pricker.Course(row);

        expect(course.getSixEnd(4)).toEqual(course.getSixes()[3].getSixEnd());
    });

    it('allows the number of sixes to be increased', testStages(
        function (stage) {
            let row: Pricker.Row = Pricker.rowFromString('231', stage),
                course = new Pricker.Course(row);

            course.setLength(stage * 2 + 4);
            expect(course.getLength()).toBe(stage * 2 + 4);
            expect(course.getCourseEnd()).toEqual(course.getSixEnd(4));
        }
    ));

    it('allows the number of sixes to be decreased', testStages(
        function (stage) {
            let row: Pricker.Row = Pricker.rowFromString('231', stage),
                course = new Pricker.Course(row),
                fourthSixEnd: Pricker.Row = course.getSixEnd(4);

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

        expect(course.getCall(1)).toBe(Pricker.Call.Plain);
        expect(course.toggleCall(1)).toBe(Pricker.Call.Bob);
        expect(course.getCall(1)).toBe(Pricker.Call.Bob);
        expect(Pricker.stringFromRow(course.getCourseEnd()))
            .toBe('23145678E90');
    });

    it('allows direct access to calls', function () {
        let row: Pricker.Row = Pricker.rowFromString(
                '231',
                Pricker.Stage.Cinques
            ),
            course = new Pricker.Course(row);

        course.setCall(4, Pricker.Call.Bob);
        expect(course.getCall(4)).toBe(Pricker.Call.Bob);
        expect(course.getSixes()[3].getCall()).toBe(Pricker.Call.Bob);
    });

    it('recalculates when calls are set', function () {
        let row: Pricker.Row = Pricker.rowFromString(
                '231',
                Pricker.Stage.Cinques
            ),
            course = new Pricker.Course(row);

        course.setCall(1, Pricker.Call.Bob);
        expect(Pricker.stringFromRow(course.getSixEnd(1))).toBe('3426185970E');
        expect(Pricker.stringFromRow(course.getSixEnd(2))).toBe('346829105E7');
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

        spyOn(course.getSixes()[4], 'setPreviousSixEnd');
        course.setCall(6, Pricker.Call.Bob);
        expect(course.getSixes()[4].setPreviousSixEnd).not.toHaveBeenCalled();
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
            expect(function () { course.getSixEnd(0); })
                .toThrowError('Six number out of range');
            expect(function () { course.getSixEnd(23); })
                .toThrowError('Six number out of range');
            expect(function () { course.getCall(0); })
                .toThrowError('Six number out of range');
            expect(function () { course.getCall(23); })
                .toThrowError('Six number out of range');
            expect(function () { course.setCall(0, Pricker.Call.Bob); })
                .toThrowError('Six number out of range');
            expect(function () { course.setCall(23, Pricker.Call.Bob); })
                .toThrowError('Six number out of range');
        }
    );

});
