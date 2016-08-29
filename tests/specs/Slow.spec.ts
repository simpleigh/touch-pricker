/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-16 Leigh Simpson. All rights reserved.
 */

/// <reference path="AbstractSix.spec.ts" />

describe('Slow six class', createSixTests(Pricker.Slow, function () {
    let S = Pricker.Stage,
        C = Pricker.Call;

    return [
        ['2314567',         '3426175',         S.Triples,   C.Plain],
        ['231456789',       '342618597',       S.Caters,    C.Plain],
        ['2314567890E',     '342618507E9',     S.Cinques,   C.Plain],
        ['2314567890ETA',   '342618507T9AE',   S.Sextuples, C.Plain],
        ['2314567890ETABC', '342618507T9BECA', S.Septuples, C.Plain],
        ['2314567',         '3425167',         S.Triples,   C.Bob],
        ['231456789',       '342617589',       S.Caters,    C.Bob],
        ['2314567890E',     '3426185970E',     S.Cinques,   C.Bob],
        ['2314567890ETA',   '342618507E9TA',   S.Sextuples, C.Bob],
        ['2314567890ETABC', '342618507T9AEBC', S.Septuples, C.Bob],
        ['2314567',         '3425176',         S.Triples,   C.Single],
        ['231456789',       '342617598',       S.Caters,    C.Single],
        ['2314567890E',     '342618597E0',     S.Cinques,   C.Single],
        ['2314567890ETA',   '342618507E9AT',   S.Sextuples, C.Single],
        ['2314567890ETABC', '342618507T9AECB', S.Septuples, C.Single],
    ];
}));
