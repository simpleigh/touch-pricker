/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('Console visitor', function () {

    it('logs to the console when it visits a row', function () {
        let visitor: Pricker.Visitor.Console =
                new Pricker.Visitor.Console(),
            row: Pricker.Row =
                Pricker.rowFromString('231', Pricker.Stage.Cinques);

        spyOn(console, 'log');

        visitor.visit(row);
        expect(console.log).toHaveBeenCalledWith('2314567890E');
    });

    testAbstractVisitorImplementation(Pricker.Visitor.Console);

});
