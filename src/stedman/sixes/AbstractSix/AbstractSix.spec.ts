/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-20 Leigh Simpson. All rights reserved.
 */

import { Call } from '../../../leads';
import {
    testAbstractLeadImplementation,
} from '../../../leads/AbstractLead.spec';
import { MutableRow, rounds, Row, rowFromString, Stage } from '../../../rows';
import { StringArray } from '../../../visitors';
import * as Changes from '../../changes';
import SixType from '../../SixType';
import { testMbdAbstractSixTemplate } from './mbd.spec';
import { testSirilAbstractSixTemplate } from './siril.spec';
import AbstractSix from '.';

export const testSixImplementation = (
    factory: (initialRow: Row) => AbstractSix,
    testCases: [string, string, Stage, Call][],
    rowTests: [Stage, ...string[]][],
    type: SixType,
    notation: string[],
    notationStringTests: string[],
): void => {

    testAbstractLeadImplementation(
        Stage.Cinques,
        factory,
        testCases,
        [
            [Stage.Triples,   notation.length + 1],
            [Stage.Caters,    notation.length + 1],
            [Stage.Cinques,   notation.length + 1],
            [Stage.Sextuples, notation.length + 1],
            [Stage.Septuples, notation.length + 1],
        ],
    );

    it('has the expected type', () => {
        const six = factory(rounds(Stage.Cinques));
        expect(six.type).toBe(type);
    });

    it('has the expected notation', () => {
        const six = factory(rounds(Stage.Cinques));
        expect(six.notation).toEqual(notation);
    });

    it('can render the notation as a string', () => {
        const six = factory(rounds(Stage.Cinques));
        for (let i = 1; i <= notationStringTests.length; i += 1) {
            expect(six.getNotationString(i)).toBe(notationStringTests[i - 1]);
        }
    });

    it('computes the six head correctly', () => {
        for (const [initialRow, , testStage, call] of testCases) {
            const six = factory(rowFromString(initialRow, testStage));
            const row = six.initialRow as MutableRow;
            Changes.permuteCall(row, call);
            six.call = call;
            expect(six.getFirst()).toEqual(row);
        }
    });

    it('generates the correct rows when visited', () => {
        for (const rowTest of rowTests) {
            const initialRow = rounds(rowTest[0]);              // Stage ...
            const expectedRows = rowTest.slice(1) as string[];  // and test rows
            const six = factory(initialRow);
            const visitor = new StringArray();

            six.accept(visitor);

            expect(visitor.strings).toEqual(expectedRows);
        }
    });

    describe('is derived from AbstractSix and', () => {

        testMbdAbstractSixTemplate(factory);
        testSirilAbstractSixTemplate(factory);

        it('ignores changes to the returned six head', () => {
            const six = factory(rounds(Stage.Cinques));
            const getFirst = six.getFirst() as MutableRow;
            const getFirstBackup = getFirst.slice();

            getFirst[3] = 16;  // Mutate the getFirst result
            expect(getFirst).not.toEqual(getFirstBackup);

            expect(six.getFirst()).not.toEqual(getFirst);
            expect(six.getFirst()).toEqual(getFirstBackup);
        });

        it('is printable', () => {
            expect(factory(rounds(Stage.Cinques))).toBePrintable();
        });

        it('has a template for MBD-style prickers', () => {
            expect(factory(rounds(Stage.Cinques))).toHaveTemplate('mbd');
        });

        it('has a template for Siril output', () => {
            expect(factory(rounds(Stage.Cinques))).toHaveTemplate('siril');
        });

    });

};
