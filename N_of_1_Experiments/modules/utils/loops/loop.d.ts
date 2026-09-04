export declare function iterate_with_counter<T>(array: T[], f: ((element: T, counter: number) => void)): void;
export declare function iterate_both<T1, T2>(a1: T1[], a2: T2[], f: (first: T1, second: T2) => void): void;
export declare function iterate_matrix<T1>(matrix: T1[][], f: any): void;
export declare function iterate<ElementType>(array: ElementType[]): Iterator<ElementType>;
export declare class Iterator<T> {
    array: T[];
    constructor(array: T[]);
    do(f: ((element: T) => void)): void;
    do_with_counter(f: ((element: T, counter: number) => void)): void;
}
export declare function repeat(n: number, f: ((c: number) => void)): void;
export declare function repeat_n_times(n: number): Repeat;
export declare function repeat_(n: number): Repeat;
export declare class Repeat {
    counter: number;
    constructor(counter: number);
    and_collect(f: any): any[];
    _times(f: any): void;
    times(f: any): void;
    _do(f: any): void;
}
