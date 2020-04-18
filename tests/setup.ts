import matchers from './matchers';

beforeAll(() => {
    jasmine.addMatchers(matchers);

    jasmine.getEnv().configure({
        failSpecWithNoExpectations: true,
    });
});
