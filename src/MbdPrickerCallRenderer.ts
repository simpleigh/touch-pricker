import Call from './Call';
import CallRenderer from './CallRenderer';

class MbdPrickerCallRenderer implements CallRenderer {
    public print(call: Call, sixNumber: number): string {
        return '<span class="'
            + (sixNumber % 2 ? 'oddCall' : 'evenCall')
            + '" onclick="c('
            + sixNumber
            + ')">'
            + (call === Call.Bob ? ' - ' : '')
            + (call === Call.Single ? ' s ' : '')
            + '</span>';
    }
}

export default MbdPrickerCallRenderer;
