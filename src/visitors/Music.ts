/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-2. Leigh Simpson. All rights reserved.
 */

import { AbstractBlock, BlockDirectory } from '../blocks';
import { AbstractMatcher } from '../music';
import { Row, stringFromRow } from '../rows';
import AbstractVisitor from './AbstractVisitor';

/**
 * Visitor for music analysis
 *
 * Matches rows using a music matcher ({@link AbstractMatcher}) that can
 * report on the musical content of a touch.
 * This visitor also accumulates a {@link BlockDirectory} referencing
 * each block containing a musical row.
 */
class Music extends AbstractVisitor {
    /**
     * Directory of musical blocks.
     */
    private readonly _directory = new BlockDirectory();

    /**
     * Creates the visitor, providing the matcher that should be used.
     * @param _matcher Matcher to be used.
     */
    constructor(protected _matcher: AbstractMatcher) {
        super();
    }

    /**
     * Reports on musical content of a touch by providing public access
     * to {@link _matcher}.
     */
    get matcher(): AbstractMatcher {
        return this._matcher;
    }

    /**
     * Reports where music is found within a touch by providing public
     * access to {@link _directory}.
     */
    get directory(): Readonly<BlockDirectory> {
        return this._directory;
    }

    /* AbstractVisitor methods ************************************************/

    /**
     * Receives a row for processing.
     */
    protected visitImplementation(row: Row, block?: AbstractBlock): void {
        // Skip visiting rounds: all touches should end in rounds so there's
        // not much point reporting this as musical!
        if (!this.visiting) {
            return;
        }

        const matches = this._matcher.match(stringFromRow(row));
        if (matches && block) {
            this._directory.add(block);
        }
    }
}

export default Music;
