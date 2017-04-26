/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/* tslint:disable:max-line-length */

/// <reference path="AbstractScheme.spec.ts" />

describe('Mbd music scheme', function () {

    const S = Pricker.Stage;

    testAbstractSchemeImplementation(
        function () {
            return new Pricker.Music.MbdScheme(Pricker.Stage.Cinques);
        },
        'MBD scheme',
        [
            [S.Cinques, '2314567890E', 1, '1 567890E\n'],
            [S.Cinques, '231456789E0', 1, '1 56789E0\n'],
            [S.Cinques, '2314657890E', 1, '1 657890E\n'],
            [S.Cinques, '2134567890E', 2, '1 567890E\n1 near misses (21)\n'],
            [S.Cinques, '1234657890E', 3, '1 657890E\n1 near misses (65)\n1 front LB4 (1 1234)\n'],
            [S.Cinques, '23145679E80', 1, '1 80T\n'],
            [S.Cinques, '2314579E680', 1, '1 80T (1 680T)\n'],
            [S.Cinques, '231456E9780', 1, '1 80T (1 E9780T)\n'],
            [S.Cinques, '13579E24680', 1, '1 80T (1 680T, Queens)\n'],
            [S.Cinques, 'E9753124680', 1, '1 80T (1 680T, Reverse Queens)\n'],
            [S.Cinques, '531246E9780', 1, '1 80T (1 E9780T, Double Whittingtons)\n'],
            [S.Cinques, '12345E09876', 2, '1 front LB5 (1 12345)\n1 front LB4 (1 1234)\n'],
            [S.Cinques, '4321E098765', 1, '1 front LB4 (1 4321)\n'],
            [S.Cinques, '67890E12345', 2, '1 back LB5 (1 12345)\n1 back LB4 (1 2345)\n'],
            [S.Cinques, '567890E1234', 1, '1 back LB4 (1 1234)\n'],
        ],
    );

});
