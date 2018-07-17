/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-18 Leigh Simpson. All rights reserved.
 */

import { BlockDirectory } from '../blocks';
import { MatcherInterface } from '../music';
import { Row, stringFromRow } from '../rows';
import { AbstractSix } from '../stedman';
import AbstractVisitor from './AbstractVisitor';

/**
 * Visitor for music analysis
 *
 * Matches rows using a music matcher ([[MatcherInterface]]) that can
 * report on the musical content of a touch.
 * This visitor also accumulates a [[BlockDirectory]] referencing
 * each block containing a musical row.
 */
class Music extends AbstractVisitor {

    /**
     * Directory of musical blocks.
     */
    private _directory: BlockDirectory = new BlockDirectory();

    /**
     * Creates the visitor, providing the matcher that should be used.
     * @param _matcher Matcher to be used.
     */
    constructor(protected _matcher: MatcherInterface) {
        super();
    }

    /**
     * Reports on musical content of a touch by providing public access
     * to [[_matcher]].
     */
    public getMatcher(): MatcherInterface {
        return this._matcher;
    }

    /**
     * Reports where music is found within a touch by providing public
     * access to [[_directory]].
     */
    public getDirectory(): BlockDirectory {
        return this._directory;
    }

    /* AbstractVisitor methods ************************************************/

    /**
     * Receives a row for processing.
     */
    protected visitImplementation(row: Row, six?: AbstractSix): void {
        const matches = this._matcher.match(stringFromRow(row));
        if (matches && six) {
            this._directory.add(six);
        }
    }

}

export default Music;
