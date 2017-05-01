/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../AbstractSix/gsiril.spec.ts" />

describe('gsiril template for Quick six', function () {

    testGsirilAbstractSixTemplate(
        Pricker.Quick,
        'quick',
        ['1', '3', '1', '3'],
    );

});