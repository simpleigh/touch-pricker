/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { Stage } from '../../rows';
import SixType from '../SixType';
import testAbstractMethodImplementation from './AbstractMethod/testAbstractMethodImplementation';
import Stedman from './Stedman';

describe('Stedman method', () => {
    testAbstractMethodImplementation(
        Stedman,
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
        [SixType.Slow, SixType.Quick, 4],
    );
});
