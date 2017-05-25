/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-17 Leigh Simpson. All rights reserved.
 */

/// <reference path="../../functions.ts" />

describe('select template for Touch', function () {

    it('renders a touch correctly', function () {
        const touch = Pricker.Touch.fromString(
                '2314567890E\n'
                    + '2314568790E  1 s10 s13 s15 22\n'
                    + '2314567890E  1 s10 s13 s15 22\n',
                );

        expect(touch.print('select')).toBe(
            ''
                + '<option value="0" onclick="pricker.selectCourse(0)">'
                + Pricker.stringFromRow(touch.getInitialRow())
                + '</option>'
                + '<option value="1" onclick="pricker.selectCourse(1)">'
                + touch.getCourse(1).print('text')
                + '</option>'
                + '<option value="2" onclick="pricker.selectCourse(2)">'
                + touch.getCourse(2).print('text')
                + '</option>',
        );
    });

    it('applies a style for unreachable courses', function () {
        const touch = new Pricker.Touch(createTestRow());
        touch.setLength(3);

        expect(touch.print('select', {
            'touchRows': 200,
            'styleUnreached': 'color:gray',
        })).toBe(
            ''
                + '<option value="0" onclick="pricker.selectCourse(0)">'
                + '2314567890E</option>'
                + '<option value="1" onclick="pricker.selectCourse(1)">'
                + '2314567890E  p</option>'
                + '<option value="2" onclick="pricker.selectCourse(2)">'
                + '2314567890E  p</option>'
                + '<option value="3" onclick="pricker.selectCourse(3)"'
                + ' style="color:gray">2314567890E  p</option>',
        );
    });

    it('applies a style for false courses', function () {
        const touch = new Pricker.Touch(createTestRow()),
            falseness = new Pricker.BlockDirectory();

        touch.setLength(2);
        falseness.add(1, 3);

        expect(touch.print('select', {
            'falseness': falseness,
            'styleFalse': 'color:red',
        })).toBe(
            ''
                + '<option value="0" onclick="pricker.selectCourse(0)">'
                + '2314567890E</option>'
                + '<option value="1" onclick="pricker.selectCourse(1)"'
                + ' style="color:red">2314567890E  p</option>'
                + '<option value="2" onclick="pricker.selectCourse(2)">'
                + '2314567890E  p</option>',
        );
    });

});
