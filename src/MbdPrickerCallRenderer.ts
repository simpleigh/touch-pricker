import Call from './Call';
import CallRenderer from './CallRenderer';
import template from './htmlCall.dot';

const CALL_MAPPING = {
    [Call.Plain]: '',
    [Call.Bob]: ' - ',
    [Call.Single]: ' s ',
};

class MbdPrickerCallRenderer implements CallRenderer {
    public print(call: Call, sixNumber: number): string {
        const context = {
            'call': CALL_MAPPING[call],
            'class': (sixNumber % 2 ? 'oddCall' : 'evenCall'),
            sixNumber,
        };
        return template(context);
    }
}

export default MbdPrickerCallRenderer;
