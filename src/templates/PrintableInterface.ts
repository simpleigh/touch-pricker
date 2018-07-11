import { Context, Templates } from './types';

interface PrintableInterface {

    print(name: string, context: Context): string;

    readonly templates: Templates;

}

export default PrintableInterface;
