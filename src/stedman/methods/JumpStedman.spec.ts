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
import JumpStedman from './JumpStedman';

describe('Jump Stedman method', () => {
    testAbstractMethodImplementation(
        JumpStedman,
        'Jump Stedman',
        [
            [Stage.Triples, 28],
            [Stage.Caters, 36],
            [Stage.Cinques, 44],
            [Stage.Sextuples, 52],
            [Stage.Septuples, 60],
        ],
        [
            [SixType.JumpDown, SixType.Slow],
            [SixType.Slow, SixType.JumpUp],
            [SixType.JumpUp, SixType.Quick],
            [SixType.Quick, SixType.JumpDown],
        ],
        [SixType.JumpDown, 4, SixType.Quick],
    );
});
