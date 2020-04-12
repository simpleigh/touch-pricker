/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Stage } from '../../rows';
import SixType from '../SixType';
import {
    testAbstractMethodImplementation,
} from './AbstractMethod/AbstractMethod.spec';
import Carter from './Carter';

describe('Carter method', () => {
    testAbstractMethodImplementation(
        Carter,
        'Carter',
        [
            [Stage.Triples, 14],
            [Stage.Caters, 18],
            [Stage.Cinques, 22],
            [Stage.Sextuples, 26],
            [Stage.Septuples, 30],
        ],
        [
            [SixType.Four, SixType.Eight],
            [SixType.Eight, SixType.Four],
        ],
        [SixType.Four, SixType.Eight, 8],
    );
});
