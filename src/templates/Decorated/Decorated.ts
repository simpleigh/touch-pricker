import * as Printable from '../index';
import text from './text.dot';

@Printable.makePrintable({ text })
class Decorated implements Printable.Interface {
    public getData: () => string = () => 'test data';
    public print: Printable.Print;
    public templates: Printable.Templates;
}

export default Decorated;
