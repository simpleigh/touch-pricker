declare module '*.dot' {
    const template: (context: any) => string;
    export default template;
}

declare namespace jasmine {
    interface Matchers<T> {
        toBePrintable(): jasmine.CustomMatcherResult;
        toHaveTemplate(expected: string): jasmine.CustomMatcherResult;
        toRenderAs(expected: string): jasmine.CustomMatcherResult;
    }
}
