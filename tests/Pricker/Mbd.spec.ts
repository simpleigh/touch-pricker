/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../dist/stedman-pricker.d.ts" />
/// <reference path="AbstractPricker.spec.ts" />

describe('Mbd Pricker class', function () {

    testAbstractPrickerImplementation(
        Pricker.Pricker.Mbd,
    );

});
