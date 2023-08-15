/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import { BlockDirectory } from '../../../blocks';
import { Call } from '../../../leads';
import { rounds, Row, Stage, stringFromRow } from '../../../rows';
import Course from '../../Course';
import AbstractSix from '.';

/**
 * Tests the template behaves like the parent version
 */
const testMbdAbstractSixTemplate = (
    factory: (initialRow: Row) => AbstractSix,
): void => {
    describe('it has an mbd template that', () => {
        let container: Course;

        let six: AbstractSix;

        beforeEach(() => {
            const initialRow = rounds(Stage.Cinques);
            container = new Course(initialRow);
            six = factory(initialRow);
            six.ownership = { container, index: 1 };
        });

        it('renders a six correctly', () => {
            expect(six.print('mbd')).toRenderAs(`
                <span class="">
                    ${stringFromRow(six.getLast())}
                </span>
                &nbsp;&nbsp;
                <span class="${
                    six.type
                } call" onclick="pricker.c(1)" onmousedown="return false">
                    &nbsp;&nbsp;&nbsp;
                </span>
                &nbsp;&nbsp;
                1
                <br />
            `);
        });

        it('displays bobbed sixes correctly', () => {
            six.setCall(Call.Bob);
            expect(six.print('mbd')).toRenderAs(`
                <span class="">
                    ${stringFromRow(six.getLast())}
                </span>
                &nbsp;&nbsp;
                <span class="${
                    six.type
                } call" onclick="pricker.c(1)" onmousedown="return false">
                    &nbsp;-&nbsp;
                </span>
                &nbsp;&nbsp;
                1
                <br />
            `);
        });

        it('displays singled sixes correctly', () => {
            six.setCall(Call.Single);
            expect(six.print('mbd')).toRenderAs(`
                <span class="">
                    ${stringFromRow(six.getLast())}
                </span>
                &nbsp;&nbsp;
                <span class="${
                    six.type
                } call" onclick="pricker.c(1)" onmousedown="return false">
                    &nbsp;s&nbsp;
                </span>
                &nbsp;&nbsp;
                1
                <br />
            `);
        });

        it('displays the index correctly', () => {
            six.ownership = { container, index: 999 };
            expect(six.print('mbd')).toRenderAs(`
                <span class="">
                    ${stringFromRow(six.getLast())}
                </span>
                &nbsp;&nbsp;
                <span class="${
                    six.type
                } call" onclick="pricker.c(999)" onmousedown="return false">
                    &nbsp;&nbsp;&nbsp;
                </span>
                &nbsp;&nbsp;
                999
                <br />
            `);
        });

        it('highlights sixes based on a music directory', () => {
            const music = new BlockDirectory();

            music.add(2, 1);

            expect(six.print('mbd', { courseIndex: 2, music })).toRenderAs(`
                <span class="musicalBlock">
                    ${stringFromRow(six.getLast())}
                </span>
                &nbsp;&nbsp;
                <span class="${
                    six.type
                } call" onclick="pricker.c(1)" onmousedown="return false">
                    &nbsp;&nbsp;&nbsp;
                </span>
                &nbsp;&nbsp;
                1
                <br />
            `);
        });

        it('highlights sixes based on a falseness directory', () => {
            const falseness = new BlockDirectory();

            falseness.add(2, 1);

            expect(six.print('mbd', { courseIndex: 2, falseness })).toRenderAs(`
                <span class="falseBlock">
                    ${stringFromRow(six.getLast())}
                </span>
                &nbsp;&nbsp;
                <span class="${
                    six.type
                } call" onclick="pricker.c(1)" onmousedown="return false">
                    &nbsp;&nbsp;&nbsp;
                </span>
                &nbsp;&nbsp;
                1
                <br />
            `);
        });

        it('gives priority to falseness over music', () => {
            const falseness = new BlockDirectory();
            const music = new BlockDirectory();

            falseness.add(2, 1);
            music.add(2, 1);

            expect(
                six.print('mbd', {
                    courseIndex: 2,
                    falseness,
                    music,
                }),
            ).toRenderAs(`
                <span class="falseBlock">
                    ${stringFromRow(six.getLast())}
                </span>
                &nbsp;&nbsp;
                <span class="${
                    six.type
                } call" onclick="pricker.c(1)" onmousedown="return false">
                    &nbsp;&nbsp;&nbsp;
                </span>
                &nbsp;&nbsp;
                1
                <br />
            `);
        });

        it('can underline a sixend', () => {
            expect(six.print('mbd', { underline: true })).toRenderAs(`
                <span class="">
                    <u>
                        ${stringFromRow(six.getLast())}
                    </u>
                </span>
                &nbsp;&nbsp;
                <span class="${
                    six.type
                } call" onclick="pricker.c(1)" onmousedown="return false">
                    &nbsp;&nbsp;&nbsp;
                </span>
                &nbsp;&nbsp;
                1
                <br />
            `);
        });

        it('can display a six head as well as a six end', () => {
            expect(six.print('mbd', { showSixHeads: true })).toRenderAs(`
                <span class="">
                    ${stringFromRow(six.getFirst())}
                </span>
                &nbsp;&nbsp;
                <span class="${
                    six.type
                } call" onclick="pricker.c(1)" onmousedown="return false">
                    &nbsp;&nbsp;&nbsp;
                </span>
                &nbsp;&nbsp;
                1
                <br />
                <span class="">
                    <u>
                        ${stringFromRow(six.getLast())}
                    </u>
                </span>
                <br />
            `);
        });
    });
};

export default testMbdAbstractSixTemplate;
