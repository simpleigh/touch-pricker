/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="Abstract.spec.ts" />

describe('Text format', function () {

    testFormatImplementation(
        Pricker.Output.Format.Text,
        [
            ['startLine', ''],
            ['endLine', '\n'],
            ['newColumn', '  '],
        ],
        [
            [Pricker.Call.Plain, 0, ' '],
            [Pricker.Call.Bob, 0, '-'],
            [Pricker.Call.Single, 0, 's'],
        ]
    );

});
