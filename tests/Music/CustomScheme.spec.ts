/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractScheme.spec.ts" />

describe('Custom music scheme', () => {

    testAbstractSchemeImplementation(
        (stage: Pricker.Stage = Pricker.Stage.Cinques) => {
            const scheme = new Pricker.Music.CustomScheme(stage);
            scheme.addMatcher(new Pricker.Music.Pattern('2314567890E'));
            return scheme;
        },
        'Custom scheme',
        [
            [Pricker.Stage.Cinques, '2314567890E', 1, '1 2314567890E\n'],
        ],
    );

});
