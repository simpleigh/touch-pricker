import * as Pricker from '../stedman-pricker'

describe('Touch class', function () {

    testAbstractBlockImplementation(Pricker.Touch);

    testAbstractContainerImplementation(
        Pricker.Touch,
        'getCourse',
        [
            [Pricker.Stage.Triples, 0],
            [Pricker.Stage.Caters, 0],
            [Pricker.Stage.Cinques, 0],
            [Pricker.Stage.Sextuples, 0],
            [Pricker.Stage.Septuples, 0],
        ],
        [0, 100]
    );
});
