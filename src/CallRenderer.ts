import Call from './Call';

interface CallRenderer {
    print(call: Call, sixNumber: number): string;
}

export default CallRenderer;
