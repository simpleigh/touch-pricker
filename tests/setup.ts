import matchers from '../src/templates/matchers';

beforeAll(() => {
    jasmine.addMatchers(matchers);
});
