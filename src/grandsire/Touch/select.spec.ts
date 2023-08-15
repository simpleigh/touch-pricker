/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { BlockDirectory } from '../../blocks';
import { stringFromRow } from '../../rows';
import Touch from '.';

describe('select template for Grandsire Touch', () => {
    it('renders a touch correctly', () => {
        const touch = Touch.fromString(
            '123456789\n' +
                '132654789  1 2 s3 s4  (4 leads)\n' +
                '126458379  s2 3 4  (4 leads)\n' +
                '123456789  s1 s2 3 s5  (5 leads)\n',
        );

        expect(touch.print('select')).toRenderAs(`
            <div class="" onclick="pricker.onSelectCourse(0)" onmousedown="return false">
                ${stringFromRow(touch.initialRow)}
            </div>
            <div class="" onclick="pricker.onSelectCourse(1)" onmousedown="return false">
                ${touch.getBlock(1).print('text')}
            </div>
            <div class="" onclick="pricker.onSelectCourse(2)" onmousedown="return false">
                ${touch.getBlock(2).print('text')}
            </div>
            <div class="" onclick="pricker.onSelectCourse(3)" onmousedown="return false">
                ${touch.getBlock(3).print('text')}
            </div>
        `);
    });

    it('adds a class when a course is selected', () => {
        const touch = Touch.fromString(
            '123456789\n' +
                '132654789  1 2 s3 s4  (4 leads)\n' +
                '126458379  s2 3 4  (4 leads)\n' +
                '123456789  s1 s2 3 s5  (5 leads)\n',
        );

        expect(touch.print('select', { selectedIndex: 2 })).toRenderAs(`
            <div class="" onclick="pricker.onSelectCourse(0)" onmousedown="return false">
                ${stringFromRow(touch.initialRow)}
            </div>
            <div class="" onclick="pricker.onSelectCourse(1)" onmousedown="return false">
                ${touch.getBlock(1).print('text')}
            </div>
            <div class="selected" onclick="pricker.onSelectCourse(2)" onmousedown="return false">
                ${touch.getBlock(2).print('text')}
            </div>
            <div class="" onclick="pricker.onSelectCourse(3)" onmousedown="return false">
                ${touch.getBlock(3).print('text')}
            </div>
        `);
    });

    it('can select the end of the start', () => {
        const touch = Touch.fromString(
            '123456789\n' +
                '132654789  1 2 s3 s4  (4 leads)\n' +
                '126458379  s2 3 4  (4 leads)\n' +
                '123456789  s1 s2 3 s5  (5 leads)\n',
        );

        expect(touch.print('select', { selectedIndex: 0 })).toRenderAs(`
            <div class="selected" onclick="pricker.onSelectCourse(0)" onmousedown="return false">
                ${stringFromRow(touch.initialRow)}
            </div>
            <div class="" onclick="pricker.onSelectCourse(1)" onmousedown="return false">
                ${touch.getBlock(1).print('text')}
            </div>
            <div class="" onclick="pricker.onSelectCourse(2)" onmousedown="return false">
                ${touch.getBlock(2).print('text')}
            </div>
            <div class="" onclick="pricker.onSelectCourse(3)" onmousedown="return false">
                ${touch.getBlock(3).print('text')}
            </div>
        `);
    });

    it('applies a style for unreachable courses', () => {
        const touch = Touch.fromString('123456789\np\np\np'); // 3 courses

        expect(
            touch.print('select', {
                touchRows: 252, // Two courses
            }),
        ).toRenderAs(`
            <div class="" onclick="pricker.onSelectCourse(0)" onmousedown="return false">
                123456789
            </div>
            <div class="" onclick="pricker.onSelectCourse(1)" onmousedown="return false">
                123456789  p
            </div>
            <div class="" onclick="pricker.onSelectCourse(2)" onmousedown="return false">
                123456789  p
            </div>
            <div class="unreached" onclick="pricker.onSelectCourse(3)" onmousedown="return false">
                123456789  p
            </div>
        `);
    });

    it('applies a style for false courses', () => {
        const touch = Touch.fromString('123456789\np\np'); // 2 courses
        const falseness = new BlockDirectory();
        falseness.add(1, 3);

        expect(touch.print('select', { falseness })).toRenderAs(`
            <div class="" onclick="pricker.onSelectCourse(0)" onmousedown="return false">
                123456789
            </div>
            <div class="false" onclick="pricker.onSelectCourse(1)" onmousedown="return false">
                123456789  p
            </div>
            <div class="" onclick="pricker.onSelectCourse(2)" onmousedown="return false">
                123456789  p
            </div>
        `);
    });
});
