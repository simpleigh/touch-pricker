/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

/* eslint-disable init-declarations */

declare module '*.dot' {
    const template: (context: Record<string, unknown>) => string;
    export default template;
}
