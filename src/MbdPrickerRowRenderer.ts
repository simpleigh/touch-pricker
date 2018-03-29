import BellRenderer from './BellRenderer';
import Call from './Call';
import CallRenderer from './CallRenderer';
import MbdPrickerCallRenderer from './MbdPrickerCallRenderer';
import RowRenderer from './RowRenderer';
import TextBellRenderer from './TextBellRenderer';

class MbdPrickerRowRenderer implements RowRenderer {
    public print(row: number[], call?: Call, sixNumber?: number): string {
        let rowIndex: number;
        const bellRenderer: BellRenderer = new TextBellRenderer();
        const callRenderer: CallRenderer = new MbdPrickerCallRenderer();
        let output: string = '';

        for (rowIndex = 0; rowIndex < row.length; rowIndex += 1) {
            output = output.concat(bellRenderer.print(row[rowIndex]));
        }

        if (call && sixNumber) {
            output = output.concat(callRenderer.print(call, sixNumber));
            output = output.concat(sixNumber.toString());
        }

        output = output.concat('<br />');

        return output;
    }
}

export default MbdPrickerRowRenderer;
