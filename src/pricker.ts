enum Bells {
    Triples = 7,
    Caters = 9,
    Cinques = 11,
    Sextuples = 13,
    Septuples = 15,
}

var symbols: string = '1234567890ETABC';

type Bell = number;
type Row = Bell[];

enum Call {Plain = 1, Bob, Single};

abstract class Six {
    row: Row;

    constructor(spec: Row, call?: Call) {
        if (call) {
            this.calculate(spec, call);
        } else {
            this.row = spec;
        }
    }

    calculate(previous: Row, call: Call): Row {
        this.row = previous.slice();
        this.transposeFrontThree(previous)
            .transposeMiddleBells(previous)
            .transposeCall(previous, call);
        return this.row;
    }

    protected abstract transposeFrontThree(previous: Row): Six;

    private transposeMiddleBells(previous: Row): Six {
        var position: number;

        // Odd places
        for (position = 4; position < this.row.length; position += 2) {
            this.row[position] = previous[position - 2];
        }

        // Even places
        for (position = 5; position < this.row.length; position += 2) {
            this.row[position - 2] = previous[position]
        }

        return this;
    }

    private transposeCall(previous: Row, call: Call): Six {
        var n: number = this.row.length - 1;
        if (call == Call.Plain) {
            this.row[n - 1] = previous[n];
        } else {
            this.row[n - 3] = previous[n - 2];
            if (call == Call.Bob) {
                this.row[n - 1] = previous[n - 1];
                this.row[n] = previous[n];
            } else {
                this.row[n - 1] = previous[n];
                this.row[n] = previous[n - 1];
            }
        }

        return this;
    }
}

class Slow extends Six {
    protected transposeFrontThree(previous: Row): Six {
        this.row[0] = previous[1];
        this.row[1] = previous[3];
        this.row[2] = previous[0];
        return this;
    }
}

class Quick extends Six {
    protected transposeFrontThree(previous: Row): Six {
        this.row[2] = previous[3];
        return this;
    }
}

interface RowRenderer {
    print(row: number[]): string;
    print(row: number[], call: Call, sixNumber: number): string;
}

class MbdPrickerRowRenderer implements RowRenderer {
    print(row: number[], call?: Call, sixNumber?: number): string {
        var rowIndex: number,
            bellRenderer = new TextBellRenderer(),
            callRenderer = new MbdPrickerCallRenderer(),
            output: string = '';

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

interface BellRenderer {
    print(bell: number): string;
}

class TextBellRenderer implements BellRenderer {
    print(bell: number): string {
        return symbols[bell];
    }
}

interface CallRenderer {
    print(call: Call, sixNumber: number): string;
}

class MbdPrickerCallRenderer implements CallRenderer {
    print(call: Call, sixNumber: number): string {
        return '<span class="'
            + (sixNumber % 2 ? 'oddCall' : 'evenCall')
            + '" onclick="c('
            + sixNumber
            + ')">'
            + (call == Call.Bob ? ' - ' : '')
            + (call == Call.Single ? ' s ' : '')
            + '</span>'
    }
}

class Pricker {
    bells: Bells;
    startingRow: string;
    calls: Call[];
    sixes: Six[];

    private symbols = '1234567890ETABC';

    private readRow(row: string, bells: Bells): Row {
        var bellNumber: number,
            bellChar: string,
            charToNumberTable: number[],
            numberUsedTable: boolean[],
            rowIndex: number,
            output: number[] = [];

        for (bellNumber = 0; bellNumber < bells; bellNumber += 1) {
            bellChar = this.symbols[bellNumber].toLowerCase();
            charToNumberTable[bellChar] = bellNumber;
            numberUsedTable[bellNumber] = false;
        }

        for (rowIndex = 0;
            rowIndex < row.length && rowIndex < bells;
            rowIndex += 1
        ) {
            bellChar = row[rowIndex].toLowerCase();
            bellNumber = charToNumberTable[bellChar];
            if (bellNumber) {
                if (numberUsedTable[bellNumber]) {
                    throw new Error('Bell already used');
                }
                output.push(bellNumber);
                numberUsedTable[bellNumber] = true;
            } else {
                throw new Error('Unknown bell or bell already used');
            }
        }

        if (row.length < bells) {
            for (bellNumber = 0; bellNumber < bells; bellNumber += 1) {
                if (!numberUsedTable[bellNumber]) {
                    output.push(bellNumber);
                }
            }
        }

        return output;
    }
}

var row: Row = [1, 2, 0, 3, 4, 5, 6, 7, 8, 9, 10];
var renderer: RowRenderer = new MbdPrickerRowRenderer();
var i: number;

document.write(renderer.print(row));
for (i = 0; i < 22; i += 1) {
    var six: Six;
    var call: Call = i % 2 ? Call.Plain : Call.Bob
    six = i % 2 ? new Quick(row, call) : new Slow(row, call);
    document.write(renderer.print(six.row, call, i + 1));
    row = six.row;
}
