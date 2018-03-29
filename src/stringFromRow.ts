import Row from './Row';

/**
 * Symbols to be used for bells
 */
export const BELL_SYMBOLS: string = ' 1234567890ETABC';

/**
 * Converts a row array to a string (for debugging)
 */
function stringFromRow(row: Row): string {
    const bellCharacters: string[] = [];
    let bellIndex: number;

    for (bellIndex = 0; bellIndex < row.length; bellIndex += 1) {
        bellCharacters.push(BELL_SYMBOLS[row[bellIndex]]);
    }

    return bellCharacters.join('');
}

export default stringFromRow;
