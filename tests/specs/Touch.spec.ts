/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-16 Leigh Simpson. All rights reserved.
 */

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
