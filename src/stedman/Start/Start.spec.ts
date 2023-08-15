/**
 * Free Touch Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright Copyright 2015-23 Leigh Simpson. All rights reserved.
 */

import testAbstractBlockImplementation from '../../blocks/testAbstractBlockImplementation';
import { rounds, Row, rowFromString, Stage as S } from '../../rows';
import { StringArray } from '../../visitors';
import { AbstractMethod, Carter, Erin, Stedman, StedmanJump } from '../methods';
import { AbstractSix, Cold } from '../sixes';
import SixType from '../SixType';
import Start from '.';

class TestMethod extends AbstractMethod {
    public override name: string = 'Test';

    public override createSix(initialRow: Row): AbstractSix {
        return new Cold(initialRow);
    }

    protected override sixTypeProgression: Partial<Record<SixType, SixType>> = {
        [SixType.Cold]: SixType.Cold,
    };

    public override defaultFirstSix: SixType = SixType.Cold;

    public override defaultStartSixType: SixType = SixType.Cold;

    public override defaultStartRowIndex: number = 3;
}

describe('Start class', () => {
    testAbstractBlockImplementation(
        S.Cinques,
        (initialRow) => new Start(initialRow),
        [[S.Cinques, 2]],
        (fixture) => {
            (fixture as Start).rowIndex = 2;
        },
    );

    let start: Start;

    beforeEach(() => {
        start = new Start(rounds(S.Cinques));
    });

    it('obtains the default start from the chosen method', () => {
        const method = new TestMethod();

        start = new Start(rounds(S.Cinques), method);

        expect(start.sixType).toBe(SixType.Cold);
        expect(start.rowIndex).toBe(3);
    });

    it('defaults to standard start for Carter', () => {
        start = new Start(rounds(S.Cinques), new Carter());
        expect(start.sixType).toBe(SixType.Eight);
        expect(start.rowIndex).toBe(8);
    });

    it('defaults to a standard start for Erin', () => {
        start = new Start(rounds(S.Cinques), new Erin());
        expect(start.sixType).toBe(SixType.Slow);
        expect(start.rowIndex).toBe(6);
    });

    it('defaults to a standard start for Stedman', () => {
        start = new Start(rounds(S.Cinques), new Stedman());
        expect(start.sixType).toBe(SixType.Quick);
        expect(start.rowIndex).toBe(4);
    });

    it('defaults to a standard start for Stedman Jump', () => {
        start = new Start(rounds(S.Cinques), new StedmanJump());
        expect(start.sixType).toBe(SixType.Hot);
        expect(start.rowIndex).toBe(6);
    });

    it('allows the six type to be set', () => {
        start.sixType = SixType.Slow;
        expect(start.sixType).toBe(SixType.Slow);
    });

    it('throws an exception if the six type is invalid', () => {
        expect(() => {
            start.sixType = SixType.Invalid;
        }).toThrowError("'invalid' blocks not allowed for this method");
    });

    it('checks the six type is valid for the chosen method', () => {
        const method = new Stedman();
        jest.spyOn(method, 'checkSixType');
        start = new Start(rounds(S.Cinques), method);

        start.sixType = SixType.Slow;

        expect(method.checkSixType).toHaveBeenCalled();
        expect(method.checkSixType).toHaveBeenCalledWith(SixType.Slow);
    });

    // prettier-ignore
    it('checks the six type is valid for Carter', () => {
        start = new Start(rounds(S.Cinques), new Carter());
        expect(() => { start.sixType = SixType.Slow; }).toThrow();
        expect(() => { start.sixType = SixType.Quick; }).toThrow();
        expect(() => { start.sixType = SixType.Cold; }).toThrow();
        expect(() => { start.sixType = SixType.Hot; }).toThrow();
        expect(() => { start.sixType = SixType.Invalid; }).toThrow();
    });

    // prettier-ignore
    it('checks the six type is valid for Erin', () => {
        start = new Start(rounds(S.Cinques), new Erin());
        expect(() => { start.sixType = SixType.Quick; }).toThrow();
        expect(() => { start.sixType = SixType.Cold; }).toThrow();
        expect(() => { start.sixType = SixType.Hot; }).toThrow();
        expect(() => { start.sixType = SixType.Four; }).toThrow();
        expect(() => { start.sixType = SixType.Eight; }).toThrow();
        expect(() => { start.sixType = SixType.Invalid; }).toThrow();
    });

    // prettier-ignore
    it('checks the six type is valid for Stedman', () => {
        start = new Start(rounds(S.Cinques), new Erin());
        expect(() => { start.sixType = SixType.Cold; }).toThrow();
        expect(() => { start.sixType = SixType.Hot; }).toThrow();
        expect(() => { start.sixType = SixType.Four; }).toThrow();
        expect(() => { start.sixType = SixType.Eight; }).toThrow();
        expect(() => { start.sixType = SixType.Invalid; }).toThrow();
    });

    // prettier-ignore
    it('checks the six type is valid for Stedman Jump', () => {
        start = new Start(rounds(S.Cinques), new StedmanJump());
        expect(() => { start.sixType = SixType.Slow; }).toThrow();
        expect(() => { start.sixType = SixType.Quick; }).toThrow();
        expect(() => { start.sixType = SixType.Four; }).toThrow();
        expect(() => { start.sixType = SixType.Eight; }).toThrow();
        expect(() => { start.sixType = SixType.Invalid; }).toThrow();
    });

    it('allows the row index to be set', () => {
        start.rowIndex = 3;
        expect(start.rowIndex).toBe(3);
    });

    it('throws an exception if the row index is out of range', () => {
        expect(() => {
            start.rowIndex = 0;
        }).toThrowError("Row index '0' out of range");
        expect(() => {
            start.rowIndex = 7;
        }).toThrowError("Row index '7' out of range");
    });

    // prettier-ignore
    const indexTestCases: [SixType, new () => AbstractMethod, number][] = [
        [SixType.Slow,  Erin,        6],
        [SixType.Quick, Stedman,     6],
        [SixType.Cold,  StedmanJump, 6],
        [SixType.Hot,   StedmanJump, 6],
        [SixType.Four,  Carter,      4],
        [SixType.Eight, Carter,      8],
    ];

    it('exposes the last permitted row index for a six', () => {
        for (const [sixType, Method, maxIndex] of indexTestCases) {
            start = new Start(rounds(S.Cinques), new Method());
            start.sixType = sixType;

            expect(start.lastRowIndex).toBe(maxIndex);
        }
    });

    it('restricts the row index range based on the six type', () => {
        for (const [sixType, Method, maxIndex] of indexTestCases) {
            start = new Start(rounds(S.Cinques), new Method());
            start.sixType = sixType;

            // Following two lines should not raise an error
            start.rowIndex = 1;
            start.rowIndex = maxIndex;

            expect(() => {
                start.rowIndex = 0;
            }).toThrow();
            expect(() => {
                start.rowIndex = maxIndex + 1;
            }).toThrow();
        }
    });

    it('ensures the row index is valid when setting the six type', () => {
        start = new Start(rounds(S.Cinques), new Carter());
        start.sixType = SixType.Eight;
        start.rowIndex = 5;

        start.sixType = SixType.Four;

        expect(start.rowIndex).toBe(4);
    });

    it('provides read access to the method', () => {
        const method = new Stedman();
        start = new Start(rounds(S.Cinques), method);
        expect(start.method).toBe(method);
    });

    type StageTestCase<Expected> = [S, Expected];

    type StartPosition<Expected> = [number, SixType, StageTestCase<Expected>[]];

    // prettier-ignore
    const rowTestCases: StartPosition<string[]>[] = [
        [1, SixType.Quick, [
            [S.Triples,   ['1325476',         '3124567',         '3215476',         '2314567',         '2135476']],
            [S.Caters,    ['132547698',       '312456789',       '321547698',       '231456789',       '213547698']],
            [S.Cinques,   ['132547698E0',     '3124567890E',     '321547698E0',     '2314567890E',     '213547698E0']],
            [S.Sextuples, ['132547698E0AT',   '3124567890ETA',   '321547698E0AT',   '2314567890ETA',   '213547698E0AT']],
            [S.Septuples, ['132547698E0ATCB', '3124567890ETABC', '321547698E0ATCB', '2314567890ETABC', '213547698E0ATCB']],
        ]],
        [2, SixType.Quick, [
            [S.Triples,   ['2135476',         '2314567',         '3215476',         '3124567']],
            [S.Caters,    ['213547698',       '231456789',       '321547698',       '312456789']],
            [S.Cinques,   ['213547698E0',     '2314567890E',     '321547698E0',     '3124567890E']],
            [S.Sextuples, ['213547698E0AT',   '2314567890ETA',   '321547698E0AT',   '3124567890ETA']],
            [S.Septuples, ['213547698E0ATCB', '2314567890ETABC', '321547698E0ATCB', '3124567890ETABC']],
        ]],
        [3, SixType.Quick, [
            [S.Triples,   ['1325476',         '3124567',         '3215476']],
            [S.Caters,    ['132547698',       '312456789',       '321547698']],
            [S.Cinques,   ['132547698E0',     '3124567890E',     '321547698E0']],
            [S.Sextuples, ['132547698E0AT',   '3124567890ETA',   '321547698E0AT']],
            [S.Septuples, ['132547698E0ATCB', '3124567890ETABC', '321547698E0ATCB']],
        ]],
        [4, SixType.Quick, [
            [S.Triples,   ['2135476',         '2314567']],
            [S.Caters,    ['213547698',       '231456789']],
            [S.Cinques,   ['213547698E0',     '2314567890E']],
            [S.Sextuples, ['213547698E0AT',   '2314567890ETA']],
            [S.Septuples, ['213547698E0ATCB', '2314567890ETABC']],
        ]],
        [5, SixType.Quick, [
            [S.Triples,   ['1325476']],
            [S.Caters,    ['132547698']],
            [S.Cinques,   ['132547698E0']],
            [S.Sextuples, ['132547698E0AT']],
            [S.Septuples, ['132547698E0ATCB']],
        ]],
        [6, SixType.Quick, [
            [S.Triples,   []],
            [S.Caters,    []],
            [S.Cinques,   []],
            [S.Sextuples, []],
            [S.Septuples, []],
        ]],
        [1, SixType.Slow, [
            [S.Triples,   ['2135476',         '2314567',         '3215476',         '3124567',         '1325476']],
            [S.Caters,    ['213547698',       '231456789',       '321547698',       '312456789',       '132547698']],
            [S.Cinques,   ['213547698E0',     '2314567890E',     '321547698E0',     '3124567890E',     '132547698E0']],
            [S.Sextuples, ['213547698E0AT',   '2314567890ETA',   '321547698E0AT',   '3124567890ETA',   '132547698E0AT']],
            [S.Septuples, ['213547698E0ATCB', '2314567890ETABC', '321547698E0ATCB', '3124567890ETABC', '132547698E0ATCB']],
        ]],
        [2, SixType.Slow, [
            [S.Triples,   ['1325476',         '3124567',         '3215476',         '2314567']],
            [S.Caters,    ['132547698',       '312456789',       '321547698',       '231456789']],
            [S.Cinques,   ['132547698E0',     '3124567890E',     '321547698E0',     '2314567890E']],
            [S.Sextuples, ['132547698E0AT',   '3124567890ETA',   '321547698E0AT',   '2314567890ETA']],
            [S.Septuples, ['132547698E0ATCB', '3124567890ETABC', '321547698E0ATCB', '2314567890ETABC']],
        ]],
        [3, SixType.Slow, [
            [S.Triples,   ['2135476',         '2314567',         '3215476']],
            [S.Caters,    ['213547698',       '231456789',       '321547698']],
            [S.Cinques,   ['213547698E0',     '2314567890E',     '321547698E0']],
            [S.Sextuples, ['213547698E0AT',   '2314567890ETA',   '321547698E0AT']],
            [S.Septuples, ['213547698E0ATCB', '2314567890ETABC', '321547698E0ATCB']],
        ]],
        [4, SixType.Slow, [
            [S.Triples,   ['1325476',         '3124567']],
            [S.Caters,    ['132547698',       '312456789']],
            [S.Cinques,   ['132547698E0',     '3124567890E']],
            [S.Sextuples, ['132547698E0AT',   '3124567890ETA']],
            [S.Septuples, ['132547698E0ATCB', '3124567890ETABC']],
        ]],
        [5, SixType.Slow, [
            [S.Triples,   ['2135476']],
            [S.Caters,    ['213547698']],
            [S.Cinques,   ['213547698E0']],
            [S.Sextuples, ['213547698E0AT']],
            [S.Septuples, ['213547698E0ATCB']],
        ]],
        [6, SixType.Slow, [
            [S.Triples,   []],
            [S.Caters,    []],
            [S.Cinques,   []],
            [S.Sextuples, []],
            [S.Septuples, []],
        ]],
        [1, SixType.Cold, [
            [S.Triples,   ['2315476',         '3124567',         '1235476',         '2314567',         '3125476']],
            [S.Caters,    ['231547698',       '312456789',       '123547698',       '231456789',       '312547698']],
            [S.Cinques,   ['231547698E0',     '3124567890E',     '123547698E0',     '2314567890E',     '312547698E0']],
            [S.Sextuples, ['231547698E0AT',   '3124567890ETA',   '123547698E0AT',   '2314567890ETA',   '312547698E0AT']],
            [S.Septuples, ['231547698E0ATCB', '3124567890ETABC', '123547698E0ATCB', '2314567890ETABC', '312547698E0ATCB']],
        ]],
        [2, SixType.Cold, [
            [S.Triples,   ['2315476',         '3124567',         '1235476',         '2314567']],
            [S.Caters,    ['231547698',       '312456789',       '123547698',       '231456789']],
            [S.Cinques,   ['231547698E0',     '3124567890E',     '123547698E0',     '2314567890E']],
            [S.Sextuples, ['231547698E0AT',   '3124567890ETA',   '123547698E0AT',   '2314567890ETA']],
            [S.Septuples, ['231547698E0ATCB', '3124567890ETABC', '123547698E0ATCB', '2314567890ETABC']],
        ]],
        [3, SixType.Cold, [
            [S.Triples,   ['2315476',         '3124567',         '1235476']],
            [S.Caters,    ['231547698',       '312456789',       '123547698']],
            [S.Cinques,   ['231547698E0',     '3124567890E',     '123547698E0']],
            [S.Sextuples, ['231547698E0AT',   '3124567890ETA',   '123547698E0AT']],
            [S.Septuples, ['231547698E0ATCB', '3124567890ETABC', '123547698E0ATCB']],
        ]],
        [4, SixType.Cold, [
            [S.Triples,   ['2315476',         '3124567']],
            [S.Caters,    ['231547698',       '312456789']],
            [S.Cinques,   ['231547698E0',     '3124567890E']],
            [S.Sextuples, ['231547698E0AT',   '3124567890ETA']],
            [S.Septuples, ['231547698E0ATCB', '3124567890ETABC']],
        ]],
        [5, SixType.Cold, [
            [S.Triples,   ['2315476']],
            [S.Caters,    ['231547698']],
            [S.Cinques,   ['231547698E0']],
            [S.Sextuples, ['231547698E0AT']],
            [S.Septuples, ['231547698E0ATCB']],
        ]],
        [6, SixType.Cold, [
            [S.Triples,   []],
            [S.Caters,    []],
            [S.Cinques,   []],
            [S.Sextuples, []],
            [S.Septuples, []],
        ]],
        [1, SixType.Hot, [
            [S.Triples,   ['3125476',         '2314567',         '1235476',         '3124567',         '2315476']],
            [S.Caters,    ['312547698',       '231456789',       '123547698',       '312456789',       '231547698']],
            [S.Cinques,   ['312547698E0',     '2314567890E',     '123547698E0',     '3124567890E',     '231547698E0']],
            [S.Sextuples, ['312547698E0AT',   '2314567890ETA',   '123547698E0AT',   '3124567890ETA',   '231547698E0AT']],
            [S.Septuples, ['312547698E0ATCB', '2314567890ETABC', '123547698E0ATCB', '3124567890ETABC', '231547698E0ATCB']],
        ]],
        [2, SixType.Hot, [
            [S.Triples,   ['3125476',         '2314567',         '1235476',         '3124567']],
            [S.Caters,    ['312547698',       '231456789',       '123547698',       '312456789']],
            [S.Cinques,   ['312547698E0',     '2314567890E',     '123547698E0',     '3124567890E']],
            [S.Sextuples, ['312547698E0AT',   '2314567890ETA',   '123547698E0AT',   '3124567890ETA']],
            [S.Septuples, ['312547698E0ATCB', '2314567890ETABC', '123547698E0ATCB', '3124567890ETABC']],
        ]],
        [3, SixType.Hot, [
            [S.Triples,   ['3125476',         '2314567',         '1235476']],
            [S.Caters,    ['312547698',       '231456789',       '123547698']],
            [S.Cinques,   ['312547698E0',     '2314567890E',     '123547698E0']],
            [S.Sextuples, ['312547698E0AT',   '2314567890ETA',   '123547698E0AT']],
            [S.Septuples, ['312547698E0ATCB', '2314567890ETABC', '123547698E0ATCB']],
        ]],
        [4, SixType.Hot, [
            [S.Triples,   ['3125476',         '2314567']],
            [S.Caters,    ['312547698',       '231456789']],
            [S.Cinques,   ['312547698E0',     '2314567890E']],
            [S.Sextuples, ['312547698E0AT',   '2314567890ETA']],
            [S.Septuples, ['312547698E0ATCB', '2314567890ETABC']],
        ]],
        [5, SixType.Hot, [
            [S.Triples,   ['3125476']],
            [S.Caters,    ['312547698']],
            [S.Cinques,   ['312547698E0']],
            [S.Sextuples, ['312547698E0AT']],
            [S.Septuples, ['312547698E0ATCB']],
        ]],
        [6, SixType.Hot, [
            [S.Triples,   []],
            [S.Caters,    []],
            [S.Cinques,   []],
            [S.Sextuples, []],
            [S.Septuples, []],
        ]],
        [1, SixType.Four, [
            [S.Triples,   ['2135476',         '2314567',         '3215476']],
            [S.Caters,    ['213547698',       '231456789',       '321547698']],
            [S.Cinques,   ['213547698E0',     '2314567890E',     '321547698E0']],
            [S.Sextuples, ['213547698E0AT',   '2314567890ETA',   '321547698E0AT']],
            [S.Septuples, ['213547698E0ATCB', '2314567890ETABC', '321547698E0ATCB']],
        ]],
        [2, SixType.Four, [
            [S.Triples,   ['1325476',         '3124567']],
            [S.Caters,    ['132547698',       '312456789']],
            [S.Cinques,   ['132547698E0',     '3124567890E']],
            [S.Sextuples, ['132547698E0AT',   '3124567890ETA']],
            [S.Septuples, ['132547698E0ATCB', '3124567890ETABC']],
        ]],
        [3, SixType.Four, [
            [S.Triples,   ['2135476']],
            [S.Caters,    ['213547698']],
            [S.Cinques,   ['213547698E0']],
            [S.Sextuples, ['213547698E0AT']],
            [S.Septuples, ['213547698E0ATCB']],
        ]],
        [4, SixType.Four, [
            [S.Triples,   []],
            [S.Caters,    []],
            [S.Cinques,   []],
            [S.Sextuples, []],
            [S.Septuples, []],
        ]],
        [1, SixType.Eight, [
            [S.Triples,   ['1325476',         '3124567',         '1342576',         '3145267',         '1354276',         '3152467',         '3514276']],
            [S.Caters,    ['132547698',       '312456789',       '134257698',       '314526789',       '135427698',       '315246789',       '351427698']],
            [S.Cinques,   ['132547698E0',     '3124567890E',     '134257698E0',     '3145267890E',     '135427698E0',     '3152467890E',     '351427698E0']],
            [S.Sextuples, ['132547698E0AT',   '3124567890ETA',   '134257698E0AT',   '3145267890ETA',   '135427698E0AT',   '3152467890ETA',   '351427698E0AT']],
            [S.Septuples, ['132547698E0ATCB', '3124567890ETABC', '134257698E0ATCB', '3145267890ETABC', '135427698E0ATCB', '3152467890ETABC', '351427698E0ATCB']],
        ]],
        [2, SixType.Eight, [
            [S.Triples,   ['2135476',         '1253467',         '2154376',         '1245367',         '2143576',         '2415367']],
            [S.Caters,    ['213547698',       '125346789',       '215437698',       '124536789',       '214357698',       '241536789']],
            [S.Cinques,   ['213547698E0',     '1253467890E',     '215437698E0',     '1245367890E',     '214357698E0',     '2415367890E']],
            [S.Sextuples, ['213547698E0AT',   '1253467890ETA',   '215437698E0AT',   '1245367890ETA',   '214357698E0AT',   '2415367890ETA']],
            [S.Septuples, ['213547698E0ATCB', '1253467890ETABC', '215437698E0ATCB', '1245367890ETABC', '214357698E0ATCB', '2415367890ETABC']],
        ]],
        [3, SixType.Eight, [
            [S.Triples,   ['2143576',         '1245367',         '2154376',         '1253467',         '1524376']],
            [S.Caters,    ['214357698',       '124536789',       '215437698',       '125346789',       '152437698']],
            [S.Cinques,   ['214357698E0',     '1245367890E',     '215437698E0',     '1253467890E',     '152437698E0']],
            [S.Sextuples, ['214357698E0AT',   '1245367890ETA',   '215437698E0AT',   '1253467890ETA',   '152437698E0AT']],
            [S.Septuples, ['214357698E0ATCB', '1245367890ETABC', '215437698E0ATCB', '1253467890ETABC', '152437698E0ATCB']],
        ]],
        [4, SixType.Eight, [
            [S.Triples,   ['2135476',         '1253467',         '2154376',         '2513467']],
            [S.Caters,    ['213547698',       '125346789',       '215437698',       '251346789']],
            [S.Cinques,   ['213547698E0',     '1253467890E',     '215437698E0',     '2513467890E']],
            [S.Sextuples, ['213547698E0AT',   '1253467890ETA',   '215437698E0AT',   '2513467890ETA']],
            [S.Septuples, ['213547698E0ATCB', '1253467890ETABC', '215437698E0ATCB', '2513467890ETABC']],
        ]],
        [5, SixType.Eight, [
            [S.Triples,   ['2143576',         '1245367',         '1423576']],
            [S.Caters,    ['214357698',       '124536789',       '142357698']],
            [S.Cinques,   ['214357698E0',     '1245367890E',     '142357698E0']],
            [S.Sextuples, ['214357698E0AT',   '1245367890ETA',   '142357698E0AT']],
            [S.Septuples, ['214357698E0ATCB', '1245367890ETABC', '142357698E0ATCB']],
        ]],
        [6, SixType.Eight, [
            [S.Triples,   ['2135476',         '2314567']],
            [S.Caters,    ['213547698',       '231456789']],
            [S.Cinques,   ['213547698E0',     '2314567890E']],
            [S.Sextuples, ['213547698E0AT',   '2314567890ETA']],
            [S.Septuples, ['213547698E0ATCB', '2314567890ETABC']],
        ]],
        [7, SixType.Eight, [
            [S.Triples,   ['1325476']],
            [S.Caters,    ['132547698']],
            [S.Cinques,   ['132547698E0']],
            [S.Sextuples, ['132547698E0AT']],
            [S.Septuples, ['132547698E0ATCB']],
        ]],
        [8, SixType.Eight, [
            [S.Triples,   []],
            [S.Caters,    []],
            [S.Cinques,   []],
            [S.Sextuples, []],
            [S.Septuples, []],
        ]],
    ];

    // prettier-ignore
    const notationTestCases: StartPosition<string[]>[] = [
        [1, SixType.Quick, [
            [S.Triples,   ['1', '3', '1', '3', '1']],
            [S.Caters,    ['1', '3', '1', '3', '1']],
            [S.Cinques,   ['1', '3', '1', '3', '1']],
            [S.Sextuples, ['1', '3', '1', '3', '1']],
            [S.Septuples, ['1', '3', '1', '3', '1']],
        ]],
        [2, SixType.Quick, [
            [S.Triples,   ['3', '1', '3', '1']],
            [S.Caters,    ['3', '1', '3', '1']],
            [S.Cinques,   ['3', '1', '3', '1']],
            [S.Sextuples, ['3', '1', '3', '1']],
            [S.Septuples, ['3', '1', '3', '1']],
        ]],
        [3, SixType.Quick, [
            [S.Triples,   ['1', '3', '1']],
            [S.Caters,    ['1', '3', '1']],
            [S.Cinques,   ['1', '3', '1']],
            [S.Sextuples, ['1', '3', '1']],
            [S.Septuples, ['1', '3', '1']],
        ]],
        [4, SixType.Quick, [
            [S.Triples,   ['3', '1']],
            [S.Caters,    ['3', '1']],
            [S.Cinques,   ['3', '1']],
            [S.Sextuples, ['3', '1']],
            [S.Septuples, ['3', '1']],
        ]],
        [5, SixType.Quick, [
            [S.Triples,   ['1']],
            [S.Caters,    ['1']],
            [S.Cinques,   ['1']],
            [S.Sextuples, ['1']],
            [S.Septuples, ['1']],
        ]],
        [6, SixType.Quick, [
            [S.Triples,   []],
            [S.Caters,    []],
            [S.Cinques,   []],
            [S.Sextuples, []],
            [S.Septuples, []],
        ]],
        [1, SixType.Slow, [
            [S.Triples,   ['3', '1', '3', '1', '3']],
            [S.Caters,    ['3', '1', '3', '1', '3']],
            [S.Cinques,   ['3', '1', '3', '1', '3']],
            [S.Sextuples, ['3', '1', '3', '1', '3']],
            [S.Septuples, ['3', '1', '3', '1', '3']],
        ]],
        [2, SixType.Slow, [
            [S.Triples,   ['1', '3', '1', '3']],
            [S.Caters,    ['1', '3', '1', '3']],
            [S.Cinques,   ['1', '3', '1', '3']],
            [S.Sextuples, ['1', '3', '1', '3']],
            [S.Septuples, ['1', '3', '1', '3']],
        ]],
        [3, SixType.Slow, [
            [S.Triples,   ['3', '1', '3']],
            [S.Caters,    ['3', '1', '3']],
            [S.Cinques,   ['3', '1', '3']],
            [S.Sextuples, ['3', '1', '3']],
            [S.Septuples, ['3', '1', '3']],
        ]],
        [4, SixType.Slow, [
            [S.Triples,   ['1', '3']],
            [S.Caters,    ['1', '3']],
            [S.Cinques,   ['1', '3']],
            [S.Sextuples, ['1', '3']],
            [S.Septuples, ['1', '3']],
        ]],
        [5, SixType.Slow, [
            [S.Triples,   ['3']],
            [S.Caters,    ['3']],
            [S.Cinques,   ['3']],
            [S.Sextuples, ['3']],
            [S.Septuples, ['3']],
        ]],
        [6, SixType.Slow, [
            [S.Triples,   []],
            [S.Caters,    []],
            [S.Cinques,   []],
            [S.Sextuples, []],
            [S.Septuples, []],
        ]],
        [1, SixType.Cold, [
            [S.Triples,   ["'2315476'",         "'2315476'",         "'2315476'",         "'2315476'",         "'2315476'"]],
            [S.Caters,    ["'231547698'",       "'231547698'",       "'231547698'",       "'231547698'",       "'231547698'"]],
            [S.Cinques,   ["'231547698E0'",     "'231547698E0'",     "'231547698E0'",     "'231547698E0'",     "'231547698E0'"]],
            [S.Sextuples, ["'231547698E0AT'",   "'231547698E0AT'",   "'231547698E0AT'",   "'231547698E0AT'",   "'231547698E0AT'"]],
            [S.Septuples, ["'231547698E0ATCB'", "'231547698E0ATCB'", "'231547698E0ATCB'", "'231547698E0ATCB'", "'231547698E0ATCB'"]],
        ]],
        [2, SixType.Cold, [
            [S.Triples,   ["'2315476'",         "'2315476'",         "'2315476'",         "'2315476'"]],
            [S.Caters,    ["'231547698'",       "'231547698'",       "'231547698'",       "'231547698'"]],
            [S.Cinques,   ["'231547698E0'",     "'231547698E0'",     "'231547698E0'",     "'231547698E0'"]],
            [S.Sextuples, ["'231547698E0AT'",   "'231547698E0AT'",   "'231547698E0AT'",   "'231547698E0AT'"]],
            [S.Septuples, ["'231547698E0ATCB'", "'231547698E0ATCB'", "'231547698E0ATCB'", "'231547698E0ATCB'"]],
        ]],
        [3, SixType.Cold, [
            [S.Triples,   ["'2315476'",         "'2315476'",         "'2315476'"]],
            [S.Caters,    ["'231547698'",       "'231547698'",       "'231547698'"]],
            [S.Cinques,   ["'231547698E0'",     "'231547698E0'",     "'231547698E0'"]],
            [S.Sextuples, ["'231547698E0AT'",   "'231547698E0AT'",   "'231547698E0AT'"]],
            [S.Septuples, ["'231547698E0ATCB'", "'231547698E0ATCB'", "'231547698E0ATCB'"]],
        ]],
        [4, SixType.Cold, [
            [S.Triples,   ["'2315476'",         "'2315476'"]],
            [S.Caters,    ["'231547698'",       "'231547698'"]],
            [S.Cinques,   ["'231547698E0'",     "'231547698E0'"]],
            [S.Sextuples, ["'231547698E0AT'",   "'231547698E0AT'"]],
            [S.Septuples, ["'231547698E0ATCB'", "'231547698E0ATCB'"]],
        ]],
        [5, SixType.Cold, [
            [S.Triples,   ["'2315476'"]],
            [S.Caters,    ["'231547698'"]],
            [S.Cinques,   ["'231547698E0'"]],
            [S.Sextuples, ["'231547698E0AT'"]],
            [S.Septuples, ["'231547698E0ATCB'"]],
        ]],
        [6, SixType.Cold, [
            [S.Triples,   []],
            [S.Caters,    []],
            [S.Cinques,   []],
            [S.Sextuples, []],
            [S.Septuples, []],
        ]],
        [1, SixType.Hot, [
            [S.Triples,   ["'3125476'",         "'3125476'",         "'3125476'",         "'3125476'",         "'3125476'"]],
            [S.Caters,    ["'312547698'",       "'312547698'",       "'312547698'",       "'312547698'",       "'312547698'"]],
            [S.Cinques,   ["'312547698E0'",     "'312547698E0'",     "'312547698E0'",     "'312547698E0'",     "'312547698E0'"]],
            [S.Sextuples, ["'312547698E0AT'",   "'312547698E0AT'",   "'312547698E0AT'",   "'312547698E0AT'",   "'312547698E0AT'"]],
            [S.Septuples, ["'312547698E0ATCB'", "'312547698E0ATCB'", "'312547698E0ATCB'", "'312547698E0ATCB'", "'312547698E0ATCB'"]],
        ]],
        [2, SixType.Hot, [
            [S.Triples,   ["'3125476'",         "'3125476'",         "'3125476'",         "'3125476'"]],
            [S.Caters,    ["'312547698'",       "'312547698'",       "'312547698'",       "'312547698'"]],
            [S.Cinques,   ["'312547698E0'",     "'312547698E0'",     "'312547698E0'",     "'312547698E0'"]],
            [S.Sextuples, ["'312547698E0AT'",   "'312547698E0AT'",   "'312547698E0AT'",   "'312547698E0AT'"]],
            [S.Septuples, ["'312547698E0ATCB'", "'312547698E0ATCB'", "'312547698E0ATCB'", "'312547698E0ATCB'"]],
        ]],
        [3, SixType.Hot, [
            [S.Triples,   ["'3125476'",         "'3125476'",         "'3125476'"]],
            [S.Caters,    ["'312547698'",       "'312547698'",       "'312547698'"]],
            [S.Cinques,   ["'312547698E0'",     "'312547698E0'",     "'312547698E0'"]],
            [S.Sextuples, ["'312547698E0AT'",   "'312547698E0AT'",   "'312547698E0AT'"]],
            [S.Septuples, ["'312547698E0ATCB'", "'312547698E0ATCB'", "'312547698E0ATCB'"]],
        ]],
        [4, SixType.Hot, [
            [S.Triples,   ["'3125476'",         "'3125476'"]],
            [S.Caters,    ["'312547698'",       "'312547698'"]],
            [S.Cinques,   ["'312547698E0'",     "'312547698E0'"]],
            [S.Sextuples, ["'312547698E0AT'",   "'312547698E0AT'"]],
            [S.Septuples, ["'312547698E0ATCB'", "'312547698E0ATCB'"]],
        ]],
        [5, SixType.Hot, [
            [S.Triples,   ["'3125476'"]],
            [S.Caters,    ["'312547698'"]],
            [S.Cinques,   ["'312547698E0'"]],
            [S.Sextuples, ["'312547698E0AT'"]],
            [S.Septuples, ["'312547698E0ATCB'"]],
        ]],
        [6, SixType.Hot, [
            [S.Triples,   []],
            [S.Caters,    []],
            [S.Cinques,   []],
            [S.Sextuples, []],
            [S.Septuples, []],
        ]],
        [1, SixType.Four, [
            [S.Triples,   ['3', '1', '3']],
            [S.Caters,    ['3', '1', '3']],
            [S.Cinques,   ['3', '1', '3']],
            [S.Sextuples, ['3', '1', '3']],
            [S.Septuples, ['3', '1', '3']],
        ]],
        [2, SixType.Four, [
            [S.Triples,   ['1', '3']],
            [S.Caters,    ['1', '3']],
            [S.Cinques,   ['1', '3']],
            [S.Sextuples, ['1', '3']],
            [S.Septuples, ['1', '3']],
        ]],
        [3, SixType.Four, [
            [S.Triples,   ['3']],
            [S.Caters,    ['3']],
            [S.Cinques,   ['3']],
            [S.Sextuples, ['3']],
            [S.Septuples, ['3']],
        ]],
        [4, SixType.Four, [
            [S.Triples,   []],
            [S.Caters,    []],
            [S.Cinques,   []],
            [S.Sextuples, []],
            [S.Septuples, []],
        ]],
        [1, SixType.Eight, [
            [S.Triples,   ['1', '3', '5', '3', '5', '3', '1']],
            [S.Caters,    ['1', '3', '5', '3', '5', '3', '1']],
            [S.Cinques,   ['1', '3', '5', '3', '5', '3', '1']],
            [S.Sextuples, ['1', '3', '5', '3', '5', '3', '1']],
            [S.Septuples, ['1', '3', '5', '3', '5', '3', '1']],
        ]],
        [2, SixType.Eight, [
            [S.Triples,   ['3', '5', '3', '5', '3', '1']],
            [S.Caters,    ['3', '5', '3', '5', '3', '1']],
            [S.Cinques,   ['3', '5', '3', '5', '3', '1']],
            [S.Sextuples, ['3', '5', '3', '5', '3', '1']],
            [S.Septuples, ['3', '5', '3', '5', '3', '1']],
        ]],
        [3, SixType.Eight, [
            [S.Triples,   ['5', '3', '5', '3', '1']],
            [S.Caters,    ['5', '3', '5', '3', '1']],
            [S.Cinques,   ['5', '3', '5', '3', '1']],
            [S.Sextuples, ['5', '3', '5', '3', '1']],
            [S.Septuples, ['5', '3', '5', '3', '1']],
        ]],
        [4, SixType.Eight, [
            [S.Triples,   ['3', '5', '3', '1']],
            [S.Caters,    ['3', '5', '3', '1']],
            [S.Cinques,   ['3', '5', '3', '1']],
            [S.Sextuples, ['3', '5', '3', '1']],
            [S.Septuples, ['3', '5', '3', '1']],
        ]],
        [5, SixType.Eight, [
            [S.Triples,   ['5', '3', '1']],
            [S.Caters,    ['5', '3', '1']],
            [S.Cinques,   ['5', '3', '1']],
            [S.Sextuples, ['5', '3', '1']],
            [S.Septuples, ['5', '3', '1']],
        ]],
        [6, SixType.Eight, [
            [S.Triples,   ['3', '1']],
            [S.Caters,    ['3', '1']],
            [S.Cinques,   ['3', '1']],
            [S.Sextuples, ['3', '1']],
            [S.Septuples, ['3', '1']],
        ]],
        [7, SixType.Eight, [
            [S.Triples,   ['1']],
            [S.Caters,    ['1']],
            [S.Cinques,   ['1']],
            [S.Sextuples, ['1']],
            [S.Septuples, ['1']],
        ]],
        [8, SixType.Eight, [
            [S.Triples,   []],
            [S.Caters,    []],
            [S.Cinques,   []],
            [S.Sextuples, []],
            [S.Septuples, []],
        ]],
    ];

    // prettier-ignore
    const notationStringTestCases: StartPosition<string>[] = [
        [1, SixType.Quick, [
            [S.Triples,   '+1.3.1.3.1'],
            [S.Caters,    '+1.3.1.3.1'],
            [S.Cinques,   '+1.3.1.3.1'],
            [S.Sextuples, '+1.3.1.3.1'],
            [S.Septuples, '+1.3.1.3.1'],
        ]],
        [2, SixType.Quick, [
            [S.Triples,   '+3.1.3.1'],
            [S.Caters,    '+3.1.3.1'],
            [S.Cinques,   '+3.1.3.1'],
            [S.Sextuples, '+3.1.3.1'],
            [S.Septuples, '+3.1.3.1'],
        ]],
        [3, SixType.Quick, [
            [S.Triples,   '+1.3.1'],
            [S.Caters,    '+1.3.1'],
            [S.Cinques,   '+1.3.1'],
            [S.Sextuples, '+1.3.1'],
            [S.Septuples, '+1.3.1'],
        ]],
        [4, SixType.Quick, [
            [S.Triples,   '+3.1'],
            [S.Caters,    '+3.1'],
            [S.Cinques,   '+3.1'],
            [S.Sextuples, '+3.1'],
            [S.Septuples, '+3.1'],
        ]],
        [5, SixType.Quick, [
            [S.Triples,   '+1'],
            [S.Caters,    '+1'],
            [S.Cinques,   '+1'],
            [S.Sextuples, '+1'],
            [S.Septuples, '+1'],
        ]],
        [6, SixType.Quick, [
            [S.Triples,   '+'],
            [S.Caters,    '+'],
            [S.Cinques,   '+'],
            [S.Sextuples, '+'],
            [S.Septuples, '+'],
        ]],
        [1, SixType.Slow, [
            [S.Triples,   '+3.1.3.1.3'],
            [S.Caters,    '+3.1.3.1.3'],
            [S.Cinques,   '+3.1.3.1.3'],
            [S.Sextuples, '+3.1.3.1.3'],
            [S.Septuples, '+3.1.3.1.3'],
        ]],
        [2, SixType.Slow, [
            [S.Triples,   '+1.3.1.3'],
            [S.Caters,    '+1.3.1.3'],
            [S.Cinques,   '+1.3.1.3'],
            [S.Sextuples, '+1.3.1.3'],
            [S.Septuples, '+1.3.1.3'],
        ]],
        [3, SixType.Slow, [
            [S.Triples,   '+3.1.3'],
            [S.Caters,    '+3.1.3'],
            [S.Cinques,   '+3.1.3'],
            [S.Sextuples, '+3.1.3'],
            [S.Septuples, '+3.1.3'],
        ]],
        [4, SixType.Slow, [
            [S.Triples,   '+1.3'],
            [S.Caters,    '+1.3'],
            [S.Cinques,   '+1.3'],
            [S.Sextuples, '+1.3'],
            [S.Septuples, '+1.3'],
        ]],
        [5, SixType.Slow, [
            [S.Triples,   '+3'],
            [S.Caters,    '+3'],
            [S.Cinques,   '+3'],
            [S.Sextuples, '+3'],
            [S.Septuples, '+3'],
        ]],
        [6, SixType.Slow, [
            [S.Triples,   '+'],
            [S.Caters,    '+'],
            [S.Cinques,   '+'],
            [S.Sextuples, '+'],
            [S.Septuples, '+'],
        ]],
        [1, SixType.Cold, [
            [S.Triples,   "'2315476', '2315476', '2315476', '2315476', '2315476'"],
            [S.Caters,    "'231547698', '231547698', '231547698', '231547698', '231547698'"],
            [S.Cinques,   "'231547698E0', '231547698E0', '231547698E0', '231547698E0', '231547698E0'"],
            [S.Sextuples, "'231547698E0AT', '231547698E0AT', '231547698E0AT', '231547698E0AT', '231547698E0AT'"],
            [S.Septuples, "'231547698E0ATCB', '231547698E0ATCB', '231547698E0ATCB', '231547698E0ATCB', '231547698E0ATCB'"],
        ]],
        [2, SixType.Cold, [
            [S.Triples,   "'2315476', '2315476', '2315476', '2315476'"],
            [S.Caters,    "'231547698', '231547698', '231547698', '231547698'"],
            [S.Cinques,   "'231547698E0', '231547698E0', '231547698E0', '231547698E0'"],
            [S.Sextuples, "'231547698E0AT', '231547698E0AT', '231547698E0AT', '231547698E0AT'"],
            [S.Septuples, "'231547698E0ATCB', '231547698E0ATCB', '231547698E0ATCB', '231547698E0ATCB'"],
        ]],
        [3, SixType.Cold, [
            [S.Triples,   "'2315476', '2315476', '2315476'"],
            [S.Caters,    "'231547698', '231547698', '231547698'"],
            [S.Cinques,   "'231547698E0', '231547698E0', '231547698E0'"],
            [S.Sextuples, "'231547698E0AT', '231547698E0AT', '231547698E0AT'"],
            [S.Septuples, "'231547698E0ATCB', '231547698E0ATCB', '231547698E0ATCB'"],
        ]],
        [4, SixType.Cold, [
            [S.Triples,   "'2315476', '2315476'"],
            [S.Caters,    "'231547698', '231547698'"],
            [S.Cinques,   "'231547698E0', '231547698E0'"],
            [S.Sextuples, "'231547698E0AT', '231547698E0AT'"],
            [S.Septuples, "'231547698E0ATCB', '231547698E0ATCB'"],
        ]],
        [5, SixType.Cold, [
            [S.Triples,   "'2315476'"],
            [S.Caters,    "'231547698'"],
            [S.Cinques,   "'231547698E0'"],
            [S.Sextuples, "'231547698E0AT'"],
            [S.Septuples, "'231547698E0ATCB'"],
        ]],
        [6, SixType.Cold, [
            [S.Triples,   ''],
            [S.Caters,    ''],
            [S.Cinques,   ''],
            [S.Sextuples, ''],
            [S.Septuples, ''],
        ]],
        [1, SixType.Hot, [
            [S.Triples,   "'3125476', '3125476', '3125476', '3125476', '3125476'"],
            [S.Caters,    "'312547698', '312547698', '312547698', '312547698', '312547698'"],
            [S.Cinques,   "'312547698E0', '312547698E0', '312547698E0', '312547698E0', '312547698E0'"],
            [S.Sextuples, "'312547698E0AT', '312547698E0AT', '312547698E0AT', '312547698E0AT', '312547698E0AT'"],
            [S.Septuples, "'312547698E0ATCB', '312547698E0ATCB', '312547698E0ATCB', '312547698E0ATCB', '312547698E0ATCB'"],
        ]],
        [2, SixType.Hot, [
            [S.Triples,   "'3125476', '3125476', '3125476', '3125476'"],
            [S.Caters,    "'312547698', '312547698', '312547698', '312547698'"],
            [S.Cinques,   "'312547698E0', '312547698E0', '312547698E0', '312547698E0'"],
            [S.Sextuples, "'312547698E0AT', '312547698E0AT', '312547698E0AT', '312547698E0AT'"],
            [S.Septuples, "'312547698E0ATCB', '312547698E0ATCB', '312547698E0ATCB', '312547698E0ATCB'"],
        ]],
        [3, SixType.Hot, [
            [S.Triples,   "'3125476', '3125476', '3125476'"],
            [S.Caters,    "'312547698', '312547698', '312547698'"],
            [S.Cinques,   "'312547698E0', '312547698E0', '312547698E0'"],
            [S.Sextuples, "'312547698E0AT', '312547698E0AT', '312547698E0AT'"],
            [S.Septuples, "'312547698E0ATCB', '312547698E0ATCB', '312547698E0ATCB'"],
        ]],
        [4, SixType.Hot, [
            [S.Triples,   "'3125476', '3125476'"],
            [S.Caters,    "'312547698', '312547698'"],
            [S.Cinques,   "'312547698E0', '312547698E0'"],
            [S.Sextuples, "'312547698E0AT', '312547698E0AT'"],
            [S.Septuples, "'312547698E0ATCB', '312547698E0ATCB'"],
        ]],
        [5, SixType.Hot, [
            [S.Triples,   "'3125476'"],
            [S.Caters,    "'312547698'"],
            [S.Cinques,   "'312547698E0'"],
            [S.Sextuples, "'312547698E0AT'"],
            [S.Septuples, "'312547698E0ATCB'"],
        ]],
        [6, SixType.Hot, [
            [S.Triples,   ''],
            [S.Caters,    ''],
            [S.Cinques,   ''],
            [S.Sextuples, ''],
            [S.Septuples, ''],
        ]],
        [1, SixType.Four, [
            [S.Triples,   '+3.1.3'],
            [S.Caters,    '+3.1.3'],
            [S.Cinques,   '+3.1.3'],
            [S.Sextuples, '+3.1.3'],
            [S.Septuples, '+3.1.3'],
        ]],
        [2, SixType.Four, [
            [S.Triples,   '+1.3'],
            [S.Caters,    '+1.3'],
            [S.Cinques,   '+1.3'],
            [S.Sextuples, '+1.3'],
            [S.Septuples, '+1.3'],
        ]],
        [3, SixType.Four, [
            [S.Triples,   '+3'],
            [S.Caters,    '+3'],
            [S.Cinques,   '+3'],
            [S.Sextuples, '+3'],
            [S.Septuples, '+3'],
        ]],
        [4, SixType.Four, [
            [S.Triples,   '+'],
            [S.Caters,    '+'],
            [S.Cinques,   '+'],
            [S.Sextuples, '+'],
            [S.Septuples, '+'],
        ]],
        [1, SixType.Eight, [
            [S.Triples,   '+1.3.5.3.5.3.1'],
            [S.Caters,    '+1.3.5.3.5.3.1'],
            [S.Cinques,   '+1.3.5.3.5.3.1'],
            [S.Sextuples, '+1.3.5.3.5.3.1'],
            [S.Septuples, '+1.3.5.3.5.3.1'],
        ]],
        [2, SixType.Eight, [
            [S.Triples,   '+3.5.3.5.3.1'],
            [S.Caters,    '+3.5.3.5.3.1'],
            [S.Cinques,   '+3.5.3.5.3.1'],
            [S.Sextuples, '+3.5.3.5.3.1'],
            [S.Septuples, '+3.5.3.5.3.1'],
        ]],
        [3, SixType.Eight, [
            [S.Triples,   '+5.3.5.3.1'],
            [S.Caters,    '+5.3.5.3.1'],
            [S.Cinques,   '+5.3.5.3.1'],
            [S.Sextuples, '+5.3.5.3.1'],
            [S.Septuples, '+5.3.5.3.1'],
        ]],
        [4, SixType.Eight, [
            [S.Triples,   '+3.5.3.1'],
            [S.Caters,    '+3.5.3.1'],
            [S.Cinques,   '+3.5.3.1'],
            [S.Sextuples, '+3.5.3.1'],
            [S.Septuples, '+3.5.3.1'],
        ]],
        [5, SixType.Eight, [
            [S.Triples,   '+5.3.1'],
            [S.Caters,    '+5.3.1'],
            [S.Cinques,   '+5.3.1'],
            [S.Sextuples, '+5.3.1'],
            [S.Septuples, '+5.3.1'],
        ]],
        [6, SixType.Eight, [
            [S.Triples,   '+3.1'],
            [S.Caters,    '+3.1'],
            [S.Cinques,   '+3.1'],
            [S.Sextuples, '+3.1'],
            [S.Septuples, '+3.1'],
        ]],
        [7, SixType.Eight, [
            [S.Triples,   '+1'],
            [S.Caters,    '+1'],
            [S.Cinques,   '+1'],
            [S.Sextuples, '+1'],
            [S.Septuples, '+1'],
        ]],
        [8, SixType.Eight, [
            [S.Triples,   '+'],
            [S.Caters,    '+'],
            [S.Cinques,   '+'],
            [S.Sextuples, '+'],
            [S.Septuples, '+'],
        ]],
    ];

    // prettier-ignore
    const methodMap: Record<SixType, new () => AbstractMethod> = {
        [SixType.Slow]:    Stedman,
        [SixType.Quick]:   Stedman,
        [SixType.Cold]:    StedmanJump,
        [SixType.Hot]:     StedmanJump,
        [SixType.Four]:    Carter,
        [SixType.Eight]:   Carter,
        [SixType.Invalid]: Stedman,
    };

    const runRowTestCases =
        (testFn: (fixture: Start, rows: string[]) => void) => () => {
            for (const [rowIndex, sixType, testCases] of rowTestCases) {
                for (const [stage, rows] of testCases) {
                    const fixture = new Start(
                        rounds(stage),
                        new methodMap[sixType](),
                    );

                    fixture.sixType = sixType;
                    fixture.rowIndex = rowIndex;
                    testFn(fixture, rows);
                }
            }
        };

    it('computes the notation correctly', () => {
        for (const [rowIndex, sixType, testCases] of notationTestCases) {
            for (const [stage, notation] of testCases) {
                const fixture = new Start(
                    rounds(stage),
                    new methodMap[sixType](),
                );

                fixture.sixType = sixType;
                fixture.rowIndex = rowIndex;
                expect(fixture.notation).toEqual(notation);
            }
        }
    });

    it('computes the notation string correctly', () => {
        for (const [rowIndex, sixType, testCases] of notationStringTestCases) {
            for (const [stage, notation] of testCases) {
                const fixture = new Start(
                    rounds(stage),
                    new methodMap[sixType](),
                );

                fixture.sixType = sixType;
                fixture.rowIndex = rowIndex;
                expect(fixture.getNotationString()).toEqual(notation);
            }
        }
    });

    it(
        'computes the last row correctly',
        runRowTestCases((fixture: Start, rows: string[]) => {
            const last = fixture.getLast();
            const stage = last.length;

            if (rows.length) {
                const expected = rows[rows.length - 1];
                expect(last).toEqual(rowFromString(expected, stage));
            } else {
                expect(last).toEqual(rowFromString('123', stage));
            }
        }),
    );

    it(
        'computes the length correctly',
        runRowTestCases((fixture: Start, rows: string[]) => {
            expect(fixture.rows).toBe(rows.length);
        }),
    );

    it(
        'computes the rows correctly',
        runRowTestCases((fixture: Start, rows: string[]) => {
            const visitor = new StringArray();
            fixture.accept(visitor);
            expect(visitor.strings).toEqual(rows);
        }),
    );

    describe('can set the row index and six type from strings:', () => {
        // Enumerate all possible starts and check the following flow:
        //  Start -> text (`print`) -> Start (`setFromString`)

        // prettier-ignore
        const validSixTypes: [new () => AbstractMethod, SixType, number][] = [
            [Erin,        SixType.Slow,  6],
            [Stedman,     SixType.Quick, 6],
            [Stedman,     SixType.Slow,  6],
            [StedmanJump, SixType.Cold,  6],
            [StedmanJump, SixType.Hot,   6],
            [Carter,      SixType.Four,  4],
            [Carter,      SixType.Eight, 8],
        ];

        for (const [Method, sixType, maxIndex] of validSixTypes) {
            const method = new Method();
            start = new Start(rounds(S.Cinques), method);
            start.sixType = sixType;

            for (let rowIndex = 1; rowIndex <= maxIndex; rowIndex += 1) {
                start.rowIndex = rowIndex;
                const output = start.print('text');

                // Ignore default start (produces no output)
                if (!output) {
                    continue; // eslint-disable-line no-continue
                }

                const description =
                    `a ${sixType} six start on row ${rowIndex}` +
                    ` for ${method.name}`;

                it(description, () => {
                    // Reset start as beforeEach() rule will have overwritten
                    start = new Start(rounds(S.Cinques), method);
                    start.setFromString(output);
                    expect(start.sixType).toBe(sixType);
                    expect(start.rowIndex).toBe(rowIndex);
                });
            }
        }

        const testLoad = (
            description: string,
            input: string,
            expectedRowIndex: number = 3,
            expectedSixType: SixType = SixType.Slow,
        ) => {
            it(description, () => {
                start.setFromString(input);
                expect(start.sixType).toBe(expectedSixType);
                expect(start.rowIndex).toBe(expectedRowIndex);
            });
        };

        testLoad(
            'an ordinary string',
            'Start with rounds as the third row of a slow six',
        );

        testLoad(
            'a string with a numeric ordinal',
            'Start with rounds as the 3rd row of a slow six',
        );

        testLoad(
            'a string with a bare number',
            'Start with rounds as row 3 of a slow six',
        );

        testLoad(
            'a string with extra content',
            'Start at backstroke with rounds as the third row of a slow six',
        );

        // prettier-ignore
        testLoad(
            'a string with much less content',
            'Start 3 slow',
        );

        testLoad(
            'a string with the number and six type reversed',
            'Start in a slow six at the third row',
        );

        testLoad(
            'a string with an ordinal number for the last row',
            'Start with rounds as the sixth row of a slow six',
            6,
        );

        testLoad(
            'a string with the word "last" for the last row',
            'Start with rounds as the last row of a slow six',
            6,
        );

        it('a string with the six type missing', () => {
            expect(() => {
                start.setFromString('Start third');
            }).toThrowError("Start 'Start third' missing type of block");
        });

        it('a string with the row index missing', () => {
            expect(() => {
                start.setFromString('Start slow');
            }).toThrowError("Start 'Start slow' missing row index");
        });

        it('a string with a large row index', () => {
            expect(() => {
                start.setFromString('Start seventh slow');
            }).toThrowError("Row index '7' out of range");
        });

        it('a string with a large row index for a Carter four', () => {
            start = new Start(rounds(S.Cinques), new Carter());
            expect(() => {
                start.setFromString('Start four fifth');
            }).toThrowError("Row index '5' out of range");
        });

        it('returns this when setting the start', () => {
            expect(start.setFromString('Start slow third')).toBe(start);
        });

        it('strings for Carter', () => {
            start = new Start(rounds(S.Cinques), new Carter());

            start.setFromString('Start third of a four');
            expect(start.sixType).toBe(SixType.Four);
            expect(start.rowIndex).toBe(3);

            start.setFromString('Start seventh of an eight');
            expect(start.sixType).toBe(SixType.Eight);
            expect(start.rowIndex).toBe(7);

            start.setFromString('Start last of a four');
            expect(start.sixType).toBe(SixType.Four);
            expect(start.rowIndex).toBe(4);

            start.setFromString('Start last of an eight');
            expect(start.sixType).toBe(SixType.Eight);
            expect(start.rowIndex).toBe(8);
        });
    });
});
