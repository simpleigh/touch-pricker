declare module '*.dot' {
    const template: (context: any) => string;
    export default template;
}
