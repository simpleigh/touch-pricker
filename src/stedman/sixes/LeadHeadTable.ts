/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Call, Row, Stage } from '../rows';

/**
 * A table of lead heads indexed by call and stage
 */
type LeadHeadTable = { [call in Call]: { [stage in Stage]?: Row } };

export default LeadHeadTable;
