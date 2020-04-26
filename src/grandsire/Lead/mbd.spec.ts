/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

/* eslint-disable max-len */

import { BlockDirectory } from '../../blocks';
import { Call } from '../../leads';
import { rounds, Stage, stringFromRow } from '../../rows';
import Course from '../Course';
import Lead from '.';

describe('mbd template for Grandsire Lead', () => {

    const container: Course = jasmine.createSpyObj('Course', ['notify']);

    let lead: Lead;

    beforeEach(() => {
        lead = new Lead(rounds(Stage.Doubles));
        lead.ownership = { container, index: 1 };
    });

    it('renders a lead correctly', () => {
        expect(lead.print('mbd')).toRenderAs(`
            <span class="">
                ${stringFromRow(lead.getLast())}
            </span>
            &nbsp;&nbsp;
            <span class="odd call" onclick="pricker.c(1)" onmousedown="return false">
                &nbsp;&nbsp;&nbsp;
            </span>
            &nbsp;&nbsp;
            1
            <br />
        `);
    });

    it('displays bobbed leads correctly', () => {
        lead.setCall(Call.Bob);
        expect(lead.print('mbd')).toRenderAs(`
            <span class="">
                ${stringFromRow(lead.getLast())}
            </span>
            &nbsp;&nbsp;
            <span class="odd call" onclick="pricker.c(1)" onmousedown="return false">
                &nbsp;-&nbsp;
            </span>
            &nbsp;&nbsp;
            1
            <br />
        `);
    });

    it('displays singled leads correctly', () => {
        lead.setCall(Call.Single);
        expect(lead.print('mbd')).toRenderAs(`
            <span class="">
                ${stringFromRow(lead.getLast())}
            </span>
            &nbsp;&nbsp;
            <span class="odd call" onclick="pricker.c(1)" onmousedown="return false">
                &nbsp;s&nbsp;
            </span>
            &nbsp;&nbsp;
            1
            <br />
        `);
    });

    it('displays the index correctly', () => {
        lead.ownership = { container, index: 999 };
        expect(lead.print('mbd')).toRenderAs(`
            <span class="">
                ${stringFromRow(lead.getLast())}
            </span>
            &nbsp;&nbsp;
            <span class="odd call" onclick="pricker.c(999)" onmousedown="return false">
                &nbsp;&nbsp;&nbsp;
            </span>
            &nbsp;&nbsp;
            999
            <br />
        `);
    });

    it('changes the class for even indices', () => {
        lead.ownership = { container, index: 2 };
        expect(lead.print('mbd')).toRenderAs(`
            <span class="">
                ${stringFromRow(lead.getLast())}
            </span>
            &nbsp;&nbsp;
            <span class="even call" onclick="pricker.c(2)" onmousedown="return false">
                &nbsp;&nbsp;&nbsp;
            </span>
            &nbsp;&nbsp;
            2
            <br />
        `);
    });

    it('highlights leads based on a music directory', () => {
        const music = new BlockDirectory();

        music.add(2, 1);

        expect(lead.print('mbd', { courseIndex: 2, music })).toRenderAs(`
            <span class="musicalBlock">
                ${stringFromRow(lead.getLast())}
            </span>
            &nbsp;&nbsp;
            <span class="odd call" onclick="pricker.c(1)" onmousedown="return false">
                &nbsp;&nbsp;&nbsp;
            </span>
            &nbsp;&nbsp;
            1
            <br />
        `);
    });

    it('highlights leads based on a falseness directory', () => {
        const falseness = new BlockDirectory();

        falseness.add(2, 1);

        expect(lead.print('mbd', { courseIndex: 2, falseness })).toRenderAs(`
            <span class="falseBlock">
                ${stringFromRow(lead.getLast())}
            </span>
            &nbsp;&nbsp;
            <span class="odd call" onclick="pricker.c(1)" onmousedown="return false">
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

        expect(lead.print('mbd', {
            courseIndex: 2,
            falseness,
            music,
        })).toRenderAs(`
            <span class="falseBlock">
                ${stringFromRow(lead.getLast())}
            </span>
            &nbsp;&nbsp;
            <span class="odd call" onclick="pricker.c(1)" onmousedown="return false">
                &nbsp;&nbsp;&nbsp;
            </span>
            &nbsp;&nbsp;
            1
            <br />
        `);
    });

    it('can underline a leadend', () => {
        expect(lead.print('mbd', { underline: true })).toRenderAs(`
            <span class="">
                <u>
                    ${stringFromRow(lead.getLast())}
                </u>
            </span>
            &nbsp;&nbsp;
            <span class="odd call" onclick="pricker.c(1)" onmousedown="return false">
                &nbsp;&nbsp;&nbsp;
            </span>
            &nbsp;&nbsp;
            1
            <br />
        `);
    });

});
