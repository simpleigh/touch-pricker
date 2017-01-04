/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="Abstract.spec.ts" />

describe('Pricker layout', function () {

    testLayoutImplementation(
        Pricker.Output.Layout.Pricker,
        ''
            + '342618507E9     1\n'
            + '3468201759E  s  2\n'
            + '4830672519E  -  3\n'
            + '480735692E1     4\n'
    );

});
