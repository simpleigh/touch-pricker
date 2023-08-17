/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { Row } from '../rows';
import { AbstractSix, Cold, Four, Eight, Hot, Quick, Slow } from './sixes';
import SixType from './SixType';

type SixConstructor = new (initialRow: Row) => AbstractSix;

/**
 * Looks up the six constructor for a six type
 */
const constructorFromType = (type: SixType): SixConstructor => {
    const constructors: Partial<Record<SixType, SixConstructor>> = {
        [SixType.Slow]: Slow,
        [SixType.Quick]: Quick,
        [SixType.Cold]: Cold,
        [SixType.Hot]: Hot,
        [SixType.Four]: Four,
        [SixType.Eight]: Eight,
    };
    const constructor = constructors[type];

    if (!constructor) {
        throw new Error(`Cannot find six constructor for '${type}'`);
    }

    return constructor;
};

export default constructorFromType;
