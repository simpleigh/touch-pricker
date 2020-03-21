/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { rounds, Stage } from '../rows';
import constructorFromType from './constructorFromType';
import SixType from './SixType';

describe('constructorFromType function', () => {

    const testRow = rounds(Stage.Cinques);

    const testCreation = (type: SixType) => {
        it(`can create ${type} sixes`, () => {
            const six = new (constructorFromType(type))(testRow);
            expect(six.type).toBe(type);
        });
    };

    testCreation(SixType.Slow);
    testCreation(SixType.Quick);
    testCreation(SixType.Cold);
    testCreation(SixType.Hot);

    it('throws for invalid six types', () => {
        expect(() => constructorFromType(SixType.Invalid)).toThrow();
    });

});
