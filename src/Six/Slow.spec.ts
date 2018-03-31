import Call from '../Call';
import Stage from '../Stage';
import { createSixTests } from './Abstract.spec';
import Slow from './Slow';

describe('Slow six class', createSixTests(Slow, [
    ['2314567',         '3426175',         Stage.Triples,   Call.Plain],
    ['231456789',       '342618597',       Stage.Caters,    Call.Plain],
    ['2314567890E',     '342618507E9',     Stage.Cinques,   Call.Plain],
    ['2314567890ETA',   '342618507T9AE',   Stage.Sextuples, Call.Plain],
    ['2314567890ETABC', '342618507T9BECA', Stage.Septuples, Call.Plain],
    ['2314567',         '3425167',         Stage.Triples,   Call.Bob],
    ['231456789',       '342617589',       Stage.Caters,    Call.Bob],
    ['2314567890E',     '3426185970E',     Stage.Cinques,   Call.Bob],
    ['2314567890ETA',   '342618507E9TA',   Stage.Sextuples, Call.Bob],
    ['2314567890ETABC', '342618507T9AEBC', Stage.Septuples, Call.Bob],
    ['2314567',         '3425176',         Stage.Triples,   Call.Single],
    ['231456789',       '342617598',       Stage.Caters,    Call.Single],
    ['2314567890E',     '342618597E0',     Stage.Cinques,   Call.Single],
    ['2314567890ETA',   '342618507E9AT',   Stage.Sextuples, Call.Single],
    ['2314567890ETABC', '342618507T9AECB', Stage.Septuples, Call.Single],
]));
