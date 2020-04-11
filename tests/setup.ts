import matchers from '../src/templates/matchers';

beforeAll(() => {
    jasmine.addMatchers(matchers);

    jasmine.getEnv().configure({
        failSpecWithNoExpectations: true,
    });
});
