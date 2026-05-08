/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-26 Leigh Simpson. All rights reserved.
 */

declare module '*.dot' {
    const template: (context: Record<string, unknown>) => string;
    export default template;
}
