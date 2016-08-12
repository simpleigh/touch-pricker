import * as Pricker from '../../../stedman-pricker'

describe('Pricker layout', createLayoutTests(
    Pricker.Output.Layout.Pricker,
    ''
        + '342618507E9     1\n'
        + '3468201759E  s  2\n'
        + '4830672519E  -  3\n'
        + '480735692E1     4\n',
    function () { }
));
