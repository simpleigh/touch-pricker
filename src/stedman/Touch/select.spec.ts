/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import Touch from '.';
import { BlockDirectory } from '../../blocks';
import { stringFromRow } from '../../rows';
import { createTestCourse, createTestRow } from '../../testFunctions.spec';

describe('select template for Touch', () => {

    const testRow = createTestRow('123');

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
            <div class="noselect" onclick="pricker.onSelectCourse(1)">
                ${touch.getBlock(1).print('text')}
            </div>
            <div class="noselect" onclick="pricker.onSelectCourse(2)">
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
            <div class="noselect" onclick="pricker.onSelectCourse(1)">
                ${touch.getBlock(1).print('text')}
            </div>
            <div class="noselect selected" onclick="pricker.onSelectCourse(2)">
                ${touch.getBlock(2).print('text')}
            </div>
        `);
    });

    it('applies a style for unreachable courses', () => {
        const touch = new Touch(testRow);
        touch.insertBlock(1, createTestCourse(testRow));
        touch.insertBlock(2, createTestCourse(testRow));
        touch.insertBlock(3, createTestCourse(testRow));

        expect(touch.print('select', {
            touchRows: 266, // Two courses plus a standard start
        })).toRenderAs(`
            <div>2314567890E</div>
            <div class="noselect" onclick="pricker.onSelectCourse(1)">
                2314567890E  p
            </div>
            <div class="noselect" onclick="pricker.onSelectCourse(2)">
                2314567890E  p
            </div>
            <div class="noselect unreached" onclick="pricker.onSelectCourse(3)">
                2314567890E  p
            </div>
        `);
    });

    it('applies a style for false courses', () => {
        const touch = new Touch(testRow);
        const falseness = new BlockDirectory();

        touch.insertBlock(1, createTestCourse(testRow));
        touch.insertBlock(2, createTestCourse(testRow));
        falseness.add(1, 3);

        expect(touch.print('select', { falseness })).toRenderAs(`
            <div>2314567890E</div>
            <div class="noselect false" onclick="pricker.onSelectCourse(1)">
                2314567890E  p
            </div>
            <div class="noselect" onclick="pricker.onSelectCourse(2)">
                2314567890E  p
            </div>
        `);
    });

});
