/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import toBePrintable from './toBePrintable';
import toHaveTemplate from './toHaveTemplate';
import toRenderAs from './toRenderAs';

const matchers = {
    toBePrintable,
    toHaveTemplate,
    toRenderAs,
};

export default matchers;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toBePrintable: () => R;
            toHaveTemplate: (expected: string) => R;
            toRenderAs: (expected: string) => R;
        }
    }
}
