/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('select template for Touch', function () {

    it('renders a touch correctly', function () {
        const text: string = '2314567890E\n'
                + '2314568790E  1 s10 s13 s15 22\n'
                + '2314567890E  1 s10 s13 s15 22\n',
            touch: Pricker.Touch = Pricker.Touch.fromString(text);

        expect(touch.print('select')).toBe(
            ''
                + '<option value="0">'
                + Pricker.stringFromRow(touch.getInitialRow())
                + '</option>'
                + '<option value="1">'
                + touch.getCourse(1).print('text')
                + '</option>'
                + '<option value="2">'
                + touch.getCourse(2).print('text')
                + '</option>',
        );
    });

    it('marks false courses', function () {
        const stage: Pricker.Stage = Pricker.Stage.Cinques,
            initialRow: Pricker.Row = Pricker.rowFromString('231', stage),
            touch: Pricker.Touch = new Pricker.Touch(initialRow);

        touch.setLength(1);
        touch.getCourse(1).setFlag('proof', false);

        expect(touch.print('select')).toBe(
            ''
                + '<option value="0">'
                + Pricker.stringFromRow(touch.getInitialRow())
                + '</option>'
                + '<option value="1" style="color:red">'
                + touch.getCourse(1).print('text')
                + '</option>',
        );
    });

});
