/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import { BlockOwnership } from '../blocks';
import { Row } from '../rows';
import { AbstractSix, Cold, Hot, Quick, Slow } from './sixes';
import SixType from './SixType';
import SixTypeMap from './SixTypeMap';

type SixConstructor = new(
    initialRow: Row,
    _ownership?: BlockOwnership,
) => AbstractSix;

/**
 * Looks up the six constructor for a six type
 */
const constructorFromType = (type: SixType): SixConstructor => {
    const constructors: SixTypeMap<SixConstructor> = {
        [SixType.Slow]: Slow,
        [SixType.Quick]: Quick,
        [SixType.Cold]: Cold,
        [SixType.Hot]: Hot,
    };
    const constructor = constructors[type];

    if (!constructor) {
        throw new Error(`Cannot find six constructor for ${type}`);
    }

    return constructor;
};

export default constructorFromType;
