import Decorated from './Decorated';

describe('text template for Decorated', () => {
    it('renders the data', () => {
        const decorated = new Decorated();
        expect(decorated.print('text')).toBe('test data');
    });
});
