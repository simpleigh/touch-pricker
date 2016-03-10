describe('Course class', function () {

    function testStages(testFunction) {
        var stages = [
            Pricker.Stage.Triples,
            Pricker.Stage.Caters,
            Pricker.Stage.Cinques,
            Pricker.Stage.Sextuples,
            Pricker.Stage.Septuples,
        ];

        return function () {
            var i;
            for (i = 0; i < stages.length; i += 1) {
                testFunction(stages[i]);
            }
        };
    }

    it('starts out as a plain course of the right length', testStages(
        function (stage) {
            var row = Pricker.rowFromString('231', stage),
                course = new Pricker.Course(row);

            expect(course.getLength()).toBe(stage * 2);
            expect(course.getCourseEnd()).toEqual(row);
        }
    ));

    it('updates when the previous course end changes', testStages(
        function (stage) {
            var row = Pricker.rowFromString('231', stage),
                newRow = Pricker.rowFromString('', stage),
                course = new Pricker.Course(row);

            expect(course.getPreviousCourseEnd()).toEqual(row);
            expect(course.getCourseEnd()).toEqual(row);
            course.setPreviousCourseEnd(newRow);
            expect(course.getPreviousCourseEnd()).toEqual(newRow);
            expect(course.getCourseEnd()).toEqual(newRow);
        }
    ));

    it('provides read access to the sixes', testStages(function(stage) {
        var row = Pricker.rowFromString('231', stage),
            course = new Pricker.Course(row),
            sixes = course.getSixes();

        expect(sixes.length).toBe(stage * 2);
        expect(sixes[0].getPreviousSixEnd())
            .toEqual(course.getPreviousCourseEnd());
        expect(sixes[sixes.length - 1].getSixEnd())
            .toEqual(course.getCourseEnd());
    }));

    it('allows direct read access to six ends', function () {
        var row = Pricker.rowFromString('231', Pricker.Stage.Cinques),
            course = new Pricker.Course(row);

        expect(course.getSixEnd(4)).toEqual(course.getSixes()[3].getSixEnd());
    });

    it('allows the number of sixes to be increased', testStages(
        function (stage) {
            var row = Pricker.rowFromString('231', stage),
                course = new Pricker.Course(row);

            course.setLength(stage * 2 + 4);
            expect(course.getLength()).toBe(stage * 2 + 4);
            expect(course.getCourseEnd()).toEqual(course.getSixEnd(4));
        }
    ));

    it('allows the number of sixes to be decreased', testStages(
        function (stage) {
            var row  = Pricker.rowFromString('231', stage),
                course = new Pricker.Course(row),
                fourthSixEnd = course.getSixEnd(4);

            course.setLength(4);
            expect(course.getLength()).toBe(4);
            expect(course.getCourseEnd()).toEqual(fourthSixEnd);
        }
    ));

    it('allows direct access to toggle calls', function () {
        var row = Pricker.rowFromString('231', Pricker.Stage.Cinques),
            course = new Pricker.Course(row);

        expect(course.getCall(1)).toBe(Pricker.Call.Plain);
        expect(course.toggleCall(1)).toBe(Pricker.Call.Bob);
        expect(course.getCall(1)).toBe(Pricker.Call.Bob);
        expect(Pricker.stringFromRow(course.getCourseEnd()))
            .toBe('23145678E90');
    });

    it('allows direct access to calls', function () {
        var row = Pricker.rowFromString('231', Pricker.Stage.Cinques),
            course = new Pricker.Course(row);

        course.setCall(4, Pricker.Call.Bob);
        expect(course.getCall(4)).toBe(Pricker.Call.Bob);
        expect(course.getSixes()[3].getCall()).toBe(Pricker.Call.Bob);
    });

    it('recalculates when calls are set', function () {
        var row = Pricker.rowFromString('231', Pricker.Stage.Cinques),
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
        var row = Pricker.rowFromString('231', Pricker.Stage.Cinques),
            course = new Pricker.Course(row);

        spyOn(course.getSixes()[4], 'setPreviousSixEnd');
        course.setCall(6, Pricker.Call.Bob);
        expect(course.getSixes()[4].setPreviousSixEnd).not.toHaveBeenCalled();
    });

    it('throws an exception when we try and manipulate invalid sixes',
        function () {
            var row = Pricker.rowFromString('231', Pricker.Stage.Cinques),
                course = new Pricker.Course(row);

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
