export interface Context {
    [index: string]: any;
}

export type Print = (name: string, context?: Context) => string;

export type Template = (context: Context) => string;

export interface Templates {
    [name: string]: Template;
}
