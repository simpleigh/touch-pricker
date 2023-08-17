/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { Row, Stage } from '../rows';
import Call from './Call';

/**
 * A table of lead heads indexed by call and stage
 */
type LeadHeadTable = Record<Call, Partial<Record<Stage, Row>>>;

export default LeadHeadTable;
