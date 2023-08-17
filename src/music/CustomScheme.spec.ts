/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { Stage } from '../rows';
import testAbstractSchemeImplementation from './AbstractScheme/testAbstractSchemeImplementation';
import CustomScheme from './CustomScheme';
import Pattern from './Pattern';

describe('Custom music scheme', () => {
    testAbstractSchemeImplementation(
        (stage: Stage = Stage.Cinques) => {
            const scheme = new CustomScheme(stage);
            scheme.addMatcher(new Pattern('2314567890E'));
            return scheme;
        },
        [[Stage.Cinques, '2314567890E', 1, '1 2314567890E\n']],
    );
});
