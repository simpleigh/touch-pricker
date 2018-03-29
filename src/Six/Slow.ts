import AbstractSix from './AbstractSix';

/**
 * A slow six
 */
class Slow extends AbstractSix {
    /**
     * Transposes the front three bells depending upon the type of six
     */
    protected transposeFrontThree(): AbstractSix {
        this._sixEnd[0] = this._previousSixEnd[1];
        this._sixEnd[1] = this._previousSixEnd[3];
        this._sixEnd[2] = this._previousSixEnd[0];
        return this;
    }
}

export default Slow;
