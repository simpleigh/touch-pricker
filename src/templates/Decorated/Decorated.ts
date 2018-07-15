import * as Templates from '../index';
import text from './text.dot';

@Templates.makePrintable({ text })
class Decorated implements Templates.Interface {
    public getData: () => string = () => 'test data';
    public print: Templates.Print;
}

export default Decorated;
