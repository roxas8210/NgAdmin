export class ESSearch<T> {
    _id: string;
    _index: string;
    _score: number;
    _source: T;
    _type: string;
}
