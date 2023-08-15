/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import Touch from '.';

describe('siril template for Grandsire Touch', () => {
    const composition =
        '123456789\n' +
        '143926587  1 s2 s4  (4 leads)\n' +
        '145329876  s1 s2 4 s5  (5 leads)\n' +
        '132547698  s2 s3 s4  (5 leads)';

    let touch: Touch;

    let output: string;

    beforeEach(() => {
        touch = Touch.fromString(composition);
        output = touch.print('siril', { touchRows: 251 });
    });

    it('renders', () => {
        expect(output.length).toBeGreaterThanOrEqual(1);
    });

    const testCases: [string, string][] = [
        ['renders the number of bells', '9 bells\n'],
        [
            'renders a symbol for a plain lead',
            'plain = +3.1.9.1.9.1.9.1.9.1.9.1.9.1.9.1.9.1\n',
        ],
        [
            'renders a symbol for a bob lead',
            'bob = +3.1.9.1.9.1.9.1.9.1.9.1.9.1.9.1.3.1\n',
        ],
        [
            'renders a symbol for a single lead',
            'single = +3.1.9.1.9.1.9.1.9.1.9.1.9.1.9.1.3.123\n',
        ],
        ['renders the first course', 'course1 = bob, single, plain, single, '],
        [
            'renders the second course',
            'course2 = single, single, plain, bob, single, ',
        ],
        [
            'renders the third course',
            'course3 = plain, single, single, single, +3.1.9.1.9.1.9.1.9.1.9.1.9.1.9.1.9, ',
        ],
        [
            'renders a symbol for the touch',
            'touch = course1, course2, course3\n',
        ],
        ['proves the touch', 'prove touch\n'],
    ];

    for (const [description, expected] of testCases) {
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

    it('avoids rendering extra courses after the touch comes round', () => {
        output = touch.print('siril', { touchRows: 162 });
        expect(output).toContain('touch = course1, course2\n');
        expect(output).not.toContain('course3');
    });
});
