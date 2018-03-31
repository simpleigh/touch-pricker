import Call from '../Call';
import Stage from '../Stage';
import { createSixTests } from './Abstract.spec';
import Quick from './Quick';

describe('Quick six class', createSixTests(Quick, [
    ['3426175',         '3467251',         Stage.Triples,   Call.Plain],
    ['342618597',       '346829175',       Stage.Caters,    Call.Plain],
    ['342618507E9',     '3468201E597',     Stage.Cinques,   Call.Plain],
    ['342618507T9AE',   '3468201T5A7E9',   Stage.Sextuples, Call.Plain],
    ['342618507T9BECA', '3468201T5B7C9AE', Stage.Septuples, Call.Plain],
    ['3426175',         '3461275',         Stage.Triples,   Call.Bob],
    ['342618597',       '346825197',       Stage.Caters,    Call.Bob],
    ['342618507E9',     '346820175E9',     Stage.Cinques,   Call.Bob],
    ['342618507T9AE',   '3468201T597AE',   Stage.Sextuples, Call.Bob],
    ['342618507T9BECA', '3468201T5B7E9CA', Stage.Septuples, Call.Bob],
    ['3426175',         '3461257',         Stage.Triples,   Call.Single],
    ['342618597',       '346825179',       Stage.Caters,    Call.Single],
    ['342618507E9',     '3468201759E',     Stage.Cinques,   Call.Single],
    ['342618507T9AE',   '3468201T597EA',   Stage.Sextuples, Call.Single],
    ['342618507T9BECA', '3468201T5B7E9AC', Stage.Septuples, Call.Single],
]));
