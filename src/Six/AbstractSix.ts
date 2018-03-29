import Call from '../Call';
import Row from '../Row';

/**
 * Base class for sixes
 */
abstract class AbstractSix {
    /**
     * Six end of the previous six
     */
    protected _previousSixEnd: Row;

    /**
     * Six end of this six
     */
    protected _sixEnd: Row;

    /**
     * Call used to start the six
     */
    protected _call: Call;

    /**
     * Constructs the six
     * @param {Row}  previousSixEnd    - Six end of the previous six
     * @param {Call} [call=Call.Plain] - Call used to start the six
     */
    constructor(previousSixEnd: Row, call: Call = Call.Plain) {
        this._previousSixEnd = previousSixEnd;
        this._call = call;
        this.calculateSixEnd();
    }

    /**
     * Recalculates the six end
     */
    protected calculateSixEnd(): AbstractSix {
        let n: number;
        this._sixEnd = this._previousSixEnd.slice(); // Create new array

        this.transposeFrontThree();

        // Odd places go up
        for (n = 4; n < this._sixEnd.length; n += 2) {
            this._sixEnd[n] = this._previousSixEnd[n - 2];
        }

        // Even places go in
        for (n = 5; n < this._sixEnd.length; n += 2) {
            this._sixEnd[n - 2] = this._previousSixEnd[n];
        }

        // Random stuff happens at the back
        n = this._sixEnd.length - 1;
        if (this._call === Call.Plain) {
            this._sixEnd[n - 1] = this._previousSixEnd[n];
        } else {
            this._sixEnd[n - 3] = this._previousSixEnd[n - 2];
            if (this._call === Call.Bob) {
                this._sixEnd[n - 1] = this._previousSixEnd[n - 1];
                this._sixEnd[n] = this._previousSixEnd[n];
            } else {
                this._sixEnd[n - 1] = this._previousSixEnd[n];
                this._sixEnd[n] = this._previousSixEnd[n - 1];
            }
        }

        return this;
    }

    /**
     * Read access to the six end
     */
    public getSixEnd(): Row {
        return this._sixEnd;
    }

    /**
     * Write access to the previous six end
     */
    public setPreviousSixEnd(row: Row): AbstractSix {
        this._previousSixEnd = row;
        this.calculateSixEnd();
        return this;
    }

    /**
     * Read access to the call
     */
    public getCall(): Call {
        return this._call;
    }

    /**
     * Write access to the call
     */
    public setCall(call: Call): AbstractSix {
        this._call = call;
        this.calculateSixEnd();
        return this;
    }

    /**
     * Transposes the front three bells depending upon the type of six
     */
    protected abstract transposeFrontThree(): AbstractSix;
}

export default AbstractSix;
