import PrintableInterface from './PrintableInterface';
import { Context, Templates } from './types';

abstract class AbstractPrintable implements PrintableInterface {
    public print(name: string, context: Context = { }): string {
        return this.templates[name]({
            ...context,
            'object': this,
        });
    }

    public abstract readonly templates: Templates;
}

const makePrintable = (templates: Templates) => (cls: any) => {
    cls.prototype.print = AbstractPrintable.prototype.print;
    cls.prototype.templates = templates;
};

export default makePrintable;
