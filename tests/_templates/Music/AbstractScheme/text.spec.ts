/**
 * Free Stedman Pricker
 * @author Leigh Simpson <code@simpleigh.com>
 * @license GPL-3.0
 * @copyright © 2015-17 Leigh Simpson. All rights reserved.
 */

describe('text template for AbstractScheme music class', function () {

    it('displays nothing when nothing matches', function () {
        const scheme: Pricker.Music.CustomScheme =
                new Pricker.Music.CustomScheme(Pricker.Stage.Cinques);
        expect(scheme.print('text')).toBe('');
    });

    it('displays matches by calling contained matchers', function () {
        const scheme: Pricker.Music.CustomScheme =
                new Pricker.Music.CustomScheme(Pricker.Stage.Cinques),
            pattern1 = jasmine.createSpyObj('Pattern', ['print']),
            pattern2 = jasmine.createSpyObj('Pattern', ['print']);

        pattern1.print.and.returnValue('test1');
        pattern2.print.and.returnValue('test2');
        scheme.addMatcher(pattern1);
        scheme.addMatcher(pattern2);

        expect(scheme.print('text')).toBe('test1test2');
        expect(pattern1.print).toHaveBeenCalled();
        expect(pattern2.print).toHaveBeenCalled();
    });

});
