/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../dist/touch-pricker.d.ts" />

/**
 * Helper functions for testing
 */

/**
 * Creates a row with sensible defaults
 */
function createTestRow(
    input: string = '231',
    stage: Pricker.Stage = Pricker.Stage.Cinques,
): Pricker.Row {
    return Pricker.rowFromString(input, stage);
}
