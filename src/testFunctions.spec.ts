/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { Row, rowFromString, Stage } from './rows';

/**
 * Helper functions for testing
 */

/**
 * Creates a row with sensible defaults
 */
export const createTestRow = (
    input: string = '231',
    stage: Stage = Stage.Cinques,
): Row => rowFromString(input, stage);
