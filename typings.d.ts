declare module '*.dot' {
    const template: (context: any) => string;
    export default template;
}

declare module jasmine {
    interface Matchers<T> {
        toBePrintable(): jasmine.CustomMatcherResult;
        toHaveTemplate(expected: string): jasmine.CustomMatcherResult;
    }
}
