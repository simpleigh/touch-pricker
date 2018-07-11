import Decorated from './Decorated';

describe('Decorated class', () => {
    it('returns data', () => {
        const decorated = new Decorated();
        expect(decorated.getData()).toBe('test data');
    });
});
