/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('Proof visitor', function () {

    it('has a dictionary of row counts that starts empty', function () {
        const visitor: Pricker.Visitor.Proof = new Pricker.Visitor.Proof();

        expect(visitor.getRowCounts()).toEqual({ });
    });

    it('accumulates counts when it visits a row', function () {
        const visitor: Pricker.Visitor.Proof = new Pricker.Visitor.Proof(),
            row1: Pricker.Row =
                Pricker.rowFromString('2314567890E', Pricker.Stage.Cinques),
            row2: Pricker.Row =
                Pricker.rowFromString('3241658709E', Pricker.Stage.Cinques),
            block: Pricker.AbstractBlock =
                jasmine.createSpyObj('AbstractBlock', ['setFlag']);

        visitor.visit(row1, block);
        visitor.visit(row2, block);
        visitor.visit(row2, block);

        expect(visitor.getRowCounts()).toEqual(
            {
                '2314567890E': 1,
                '3241658709E': 2,
            },
        );
    });

    it('ignores changes to the result', function () {
        const visitor: Pricker.Visitor.Proof = new Pricker.Visitor.Proof(),
            getRowCounts: { [index: string]: number } = visitor.getRowCounts();

        getRowCounts['2314567890E'] = 5;  // Mutate the getRows result

        expect(visitor.getRowCounts()).not.toEqual(getRowCounts);
        expect(visitor.getRowCounts()).toEqual({ });
    });

    it('starts out true', function () {
        const visitor: Pricker.Visitor.Proof = new Pricker.Visitor.Proof();
        expect(visitor.isTrue()).toBe(true);
    });

    it('remains true when rows are visited', function () {
        const visitor: Pricker.Visitor.Proof = new Pricker.Visitor.Proof(),
            row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques),
            block: Pricker.AbstractBlock =
                jasmine.createSpyObj('AbstractBlock', ['setFlag']);

        visitor.visit(row, block);
        expect(visitor.isTrue()).toBe(true);
    });

    it('becomes false when a row is repeated', function () {
        const visitor: Pricker.Visitor.Proof = new Pricker.Visitor.Proof(),
            row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques),
            block: Pricker.AbstractBlock =
                jasmine.createSpyObj('AbstractBlock', ['setFlag']);

        visitor.visit(row, block);
        visitor.visit(row, block);
        expect(visitor.isTrue()).toBe(false);
    });

    it('marks a block as true when visiting it', function () {
        const visitor: Pricker.Visitor.Proof = new Pricker.Visitor.Proof(),
            row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques),
            block: Pricker.AbstractBlock =
                jasmine.createSpyObj('AbstractBlock', ['setFlag']);

        visitor.visit(row, block);

        expect(block.setFlag).toHaveBeenCalledWith('proof', true, false);
    });

    it('marks a block as false when a row is repeated', function () {
        const visitor: Pricker.Visitor.Proof = new Pricker.Visitor.Proof(),
            row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques),
            block: Pricker.AbstractBlock =
                jasmine.createSpyObj('AbstractBlock', ['setFlag']);

        let args: any[];

        visitor.visit(row, block);
        visitor.visit(row, block);

        // Use string literal as TypeScript doesn't know about the property
        // tslint:disable-next-line:no-string-literal
        args = block.setFlag['calls'].mostRecent().args;
        expect(args[0]).toBe('proof');
        expect(args[1]).toBe(false);
    });

    it('marks previous blocks as false when a row is repeated', function () {
        const visitor: Pricker.Visitor.Proof = new Pricker.Visitor.Proof(),
            row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques),
            block1: Pricker.AbstractBlock =
                jasmine.createSpyObj('AbstractBlock', ['setFlag']),
            block2: Pricker.AbstractBlock =
                jasmine.createSpyObj('AbstractBlock', ['setFlag']);

        let args: any[];

        visitor.visit(row, block1);
        visitor.visit(row, block2);

        // Use string literal as TypeScript doesn't know about the property
        // tslint:disable-next-line:no-string-literal
        args = block1.setFlag['calls'].mostRecent().args;
        expect(args[0]).toBe('proof');
        expect(args[1]).toBe(false);
    });

    it('only marks previous blocks as false a single time', function () {
        const visitor: Pricker.Visitor.Proof = new Pricker.Visitor.Proof(),
            row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques),
            block1: Pricker.AbstractBlock =
                jasmine.createSpyObj('AbstractBlock', ['setFlag']),
            block2: Pricker.AbstractBlock =
                jasmine.createSpyObj('AbstractBlock', ['setFlag']);

        visitor.visit(row, block1);  // setFlag called (true)
        visitor.visit(row, block2);  // setFlag called (false)
        visitor.visit(row, block2);  // setFlag should NOT be called

        expect(block1.setFlag).toHaveBeenCalledTimes(2);
    });

    testAbstractVisitorImplementation(
        Pricker.Visitor.Proof,
        function (
            visitor: Pricker.Visitor.Proof,
        ): { [index: string]: number } {
            return visitor.getRowCounts();
        },
    );

});
