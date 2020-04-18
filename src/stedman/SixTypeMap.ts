/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import SixType from './SixType';

/**
 * Type of objects allowing values to be looked up for each SixType
 */
type SixTypeMap<Value> = Partial<Record<SixType, Value>>;

export default SixTypeMap;
