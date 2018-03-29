import BellRenderer from './BellRenderer';
import { BELL_SYMBOLS } from './stringFromRow';

class TextBellRenderer implements BellRenderer {
    public print(bell: number): string {
        return BELL_SYMBOLS[bell];
    }
}

export default TextBellRenderer;
