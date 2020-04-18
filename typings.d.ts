/* eslint-disable init-declarations */

declare module '*.dot' {
    const template: (context: Record<string, unknown>) => string;
    export default template;
}

declare namespace jasmine {
    interface Matchers<T> {
        toBePrintable: () => CustomMatcherResult;
        toHaveTemplate: (expected: string) => CustomMatcherResult;
        toRenderAs: (expected: string) => CustomMatcherResult;
    }
}
