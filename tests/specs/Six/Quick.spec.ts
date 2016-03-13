describe('Quick six class', createSixTests(Pricker.Six.Quick, function () {
    let S = Pricker.Stage,
        C = Pricker.Call;

    return [
        ['3426175',         '3467251',         S.Triples,   C.Plain],
        ['342618597',       '346829175',       S.Caters,    C.Plain],
        ['342618507E9',     '3468201E597',     S.Cinques,   C.Plain],
        ['342618507T9AE',   '3468201T5A7E9',   S.Sextuples, C.Plain],
        ['342618507T9BECA', '3468201T5B7C9AE', S.Septuples, C.Plain],
        ['3426175',         '3461275',         S.Triples,   C.Bob],
        ['342618597',       '346825197',       S.Caters,    C.Bob],
        ['342618507E9',     '346820175E9',     S.Cinques,   C.Bob],
        ['342618507T9AE',   '3468201T597AE',   S.Sextuples, C.Bob],
        ['342618507T9BECA', '3468201T5B7E9CA', S.Septuples, C.Bob],
        ['3426175',         '3461257',         S.Triples,   C.Single],
        ['342618597',       '346825179',       S.Caters,    C.Single],
        ['342618507E9',     '3468201759E',     S.Cinques,   C.Single],
        ['342618507T9AE',   '3468201T597EA',   S.Sextuples, C.Single],
        ['342618507T9BECA', '3468201T5B7E9AC', S.Septuples, C.Single],
    ];
}));
