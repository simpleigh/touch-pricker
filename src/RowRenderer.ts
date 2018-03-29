import Call from './Call';

interface RowRenderer {
    print(row: number[]): string;
    print(row: number[], call: Call, sixNumber: number): string;
}

export default RowRenderer;
