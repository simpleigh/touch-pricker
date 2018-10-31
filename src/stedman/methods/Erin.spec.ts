/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Stage } from '../../rows';
import SixType from '../SixType';
import {
    testAbstractMethodImplementation,
} from './AbstractMethod/AbstractMethod.spec';
import Erin from './Erin';

describe('Erin method', () => {
    testAbstractMethodImplementation(
        Erin,
        'Erin',
        [
            [Stage.Triples, 7],
            [Stage.Caters, 9],
            [Stage.Cinques, 11],
            [Stage.Sextuples, 13],
            [Stage.Septuples, 15],
        ],
        [
            [SixType.Slow, SixType.Slow],
        ],
        [6, SixType.Slow],
    );
});
