/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Stage } from '../../rows';
import SixType from '../SixType';
import {
    testAbstractStrategyImplementation,
} from './AbstractStrategy/AbstractStrategy.spec';
import Stedman from './Stedman';

describe('Stedman strategy', () => {
    testAbstractStrategyImplementation(
        () => new Stedman(),
        'Stedman',
        [
            [Stage.Triples, 14],
            [Stage.Caters, 18],
            [Stage.Cinques, 22],
            [Stage.Sextuples, 26],
            [Stage.Septuples, 30],
        ],
        [
            [SixType.Slow, SixType.Quick],
            [SixType.Quick, SixType.Slow],
        ],
        [4, SixType.Quick],
    );
});
