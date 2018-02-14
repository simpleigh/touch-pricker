/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../AbstractSix/siril.spec.ts" />

describe('siril template for Quick six', () => {

    testSirilAbstractSixTemplate(
        Pricker.Quick,
        'quick',
        ['1', '3', '1', '3'],
    );

});
