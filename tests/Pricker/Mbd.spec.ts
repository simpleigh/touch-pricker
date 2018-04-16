/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../dist/touch-pricker.d.ts" />
/// <reference path="AbstractPricker.spec.ts" />

describe('Mbd Pricker class', () => {

    testAbstractPrickerImplementation(
        Pricker.Pricker.Mbd,
    );

});
