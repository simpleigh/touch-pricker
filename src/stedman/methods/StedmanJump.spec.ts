/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import { Stage } from '../../rows';
import SixType from '../SixType';
import {
    testAbstractMethodImplementation,
} from './AbstractMethod/AbstractMethod.spec';
import StedmanJump from './StedmanJump';

describe('Stedman Jump method', () => {
    testAbstractMethodImplementation(
        StedmanJump,
        'Stedman Jump',
        [
            [Stage.Triples, 14],
            [Stage.Caters, 18],
            [Stage.Cinques, 22],
            [Stage.Sextuples, 26],
            [Stage.Septuples, 30],
        ],
        [
            [SixType.Cold, SixType.Hot],
            [SixType.Hot, SixType.Cold],
        ],
        [SixType.Cold, 6, SixType.Hot],
    );
});
