/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import Touch from '.';
import { BlockDirectory } from '../../blocks';
import { stringFromRow } from '../../rows';

describe('select template for Touch', () => {

    it('renders a touch correctly', () => {
        const touch = Touch.fromString(
            '2314567890E\n'
                + '2314568790E  1 s10 s13 s15 22\n'
                + '2314567890E  1 s10 s13 s15 22\n',
        );

        expect(touch.print('select')).toRenderAs(`
            <div>
                ${stringFromRow(touch.start.getLast())}
            </div>
            <div class="" onmousedown="pricker.onSelectCourse(1); return false" ontouchstart="pricker.onSelectCourse(1); return false">
                ${touch.getBlock(1).print('text')}
            </div>
            <div class="" onmousedown="pricker.onSelectCourse(2); return false" ontouchstart="pricker.onSelectCourse(2); return false">
                ${touch.getBlock(2).print('text')}
            </div>
        `);
    });

    it('adds a class when a course is selected', () => {
        const touch = Touch.fromString(
            '2314567890E\n'
                + '2314568790E  1 s10 s13 s15 22\n'
                + '2314567890E  1 s10 s13 s15 22\n',
        );

        expect(touch.print('select', { selectedIndex: 2 })).toRenderAs(`
            <div>
                ${stringFromRow(touch.start.getLast())}
            </div>
            <div class="" onmousedown="pricker.onSelectCourse(1); return false" ontouchstart="pricker.onSelectCourse(1); return false">
                ${touch.getBlock(1).print('text')}
            </div>
            <div class="selected" onmousedown="pricker.onSelectCourse(2); return false" ontouchstart="pricker.onSelectCourse(2); return false">
                ${touch.getBlock(2).print('text')}
            </div>
        `);
    });

    it('applies a style for unreachable courses', () => {
        const touch = Touch.fromString('2314567890E\np\np\np');  // 3 courses

        expect(touch.print('select', {
            touchRows: 266, // Two courses plus a standard start
        })).toRenderAs(`
            <div>2314567890E</div>
            <div class="" onmousedown="pricker.onSelectCourse(1); return false" ontouchstart="pricker.onSelectCourse(1); return false">
                2314567890E  p
            </div>
            <div class="" onmousedown="pricker.onSelectCourse(2); return false" ontouchstart="pricker.onSelectCourse(2); return false">
                2314567890E  p
            </div>
            <div class="unreached" onmousedown="pricker.onSelectCourse(3); return false" ontouchstart="pricker.onSelectCourse(3); return false">
                2314567890E  p
            </div>
        `);
    });

    it('applies a style for false courses', () => {
        const touch = Touch.fromString('2314567890E\np\np');  // 2 courses
        const falseness = new BlockDirectory();
        falseness.add(1, 3);

        expect(touch.print('select', { falseness })).toRenderAs(`
            <div>2314567890E</div>
            <div class="false" onmousedown="pricker.onSelectCourse(1); return false" ontouchstart="pricker.onSelectCourse(1); return false">
                2314567890E  p
            </div>
            <div class="" onmousedown="pricker.onSelectCourse(2); return false" ontouchstart="pricker.onSelectCourse(2); return false">
                2314567890E  p
            </div>
        `);
    });

});
