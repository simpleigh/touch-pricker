/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-19 Leigh Simpson. All rights reserved.
 */

import Touch from '.';
import { StedmanJump } from '../methods';

describe('siril template for Touch', () => {

    const composition = ''
        + '1234567890E\n'
        + '2314568790E  1 s10 s13 s15 22\n'
        + '2314567890E  1 s10 s13 s15 22';

    let touch: Touch;

    let output: string;

    beforeEach(() => {
        touch = Touch.fromString(composition);
        output = touch.print('siril', { touchRows: 264 });
    });

    it('renders', () => {
        expect(output.length).toBeGreaterThanOrEqual(1);
    });

    const testCases: Array<[string, string]> = [
        ['renders the number of bells', '11 bells\n'],
        ['renders a symbol for a slow six', 'slow = +3.1.3.1.3\n'],
        ['renders a symbol for a quick six', 'quick = +1.3.1.3.1\n'],
        ['renders a symbol for a plain sixend', 'plain = +E\n'],
        ['renders a symbol for a bobbed sixend', 'bob = +9\n'],
        ['renders a symbol for a singled sixend', 'single = +90E\n'],
        ['renders a symbol for the start', 'strt = +3.1\n'],
        ['renders the first course', 'course1 = bob, slow, plain, quick, '],
        ['renders the second course', 'course2 = bob, slow, plain, quick, '],
        ['stops when the second course comes round', 'slow, bob, +1.3.1'],
        ['renders a symbol for the touch', 'touch = strt, course1, course2\n'],
        ['proves the touch', 'prove touch\n'],
    ];

    for (const testCase of testCases) {
        const description = testCase[0];
        const expected = testCase[1];

        it(description, () => {
            expect(output).toContain(expected);
        });
    }

    it('renders the composition as a comment', () => {
        const expected = composition
            .split('\n')
            .map((line) => `// ${line}`)
            .join('\n');
        expect(output).toContain(expected);
    });

    it('renders hot and cold sixes for Stedman Jump', () => {
        const method = new StedmanJump();
        touch = Touch.fromString(composition, method);
        output = touch.print('siril');

        expect(output).toContain("cold = '231547698E0', '231547698E0', ");
        expect(output).toContain("hot = '312547698E0', '312547698E0', ");
        expect(output).not.toContain('slow');
        expect(output).not.toContain('quick');
    });

    it('avoids rendering extra courses after the touch comes round', () => {
        output = touch.print('siril', { touchRows: 132 });
        expect(output).toContain('touch = strt, course1\n');
        expect(output).not.toContain('course2');
    });

});
