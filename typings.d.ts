declare module '*.dot' {
    const template: (context: any) => string;
    export default template;
}

declare namespace jasmine {
    interface Matchers<T> {
        toBePrintable: () => CustomMatcherResult;
        toHaveTemplate: (expected: string) => CustomMatcherResult;
        toRenderAs: (expected: string) => CustomMatcherResult;
    }
}
