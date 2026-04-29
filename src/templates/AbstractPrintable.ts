/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { stringFromRow } from '../rows';
import type { Context, Printable, Templates } from './types';

/**
 * Internal implementation of print functionality.
 */
abstract class AbstractPrintable implements Printable {
    /**
     * Renders the object with a template.
     * Takes the name of the template and a {@link Context}, adding the object
     * instance to the context before executing the template.
     */
    public print(name: string, context: Context = {}): string {
        return this.templates[name]({
            ...this.extraContext,
            ...context,
            object: this,
            stringFromRow,
        });
    }

    /**
     * Collection of templates used by a particular class.
     */
    public abstract readonly templates: Templates;

    /**
     * Extra context provided at compile time.
     */
    public abstract readonly extraContext: Context;
}

export default AbstractPrintable;
