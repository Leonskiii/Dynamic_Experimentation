export declare abstract class Term {
    abstract print_into(array: string[], indentation_depth: number, indentation_size: number): void;
    abstract print_into_with_extra_lines(array: string[], indentation_depth: number, indentation_size: number): void;
    print_string(indentation_size: number): string;
    print_string_with_extra_lines(indentation_size: number): string;
}
export declare class Return extends Term {
    return_value: number;
    constructor(return_value: number);
    print_into(array: string[], _depth: number, _length: number): void;
    print_into_with_extra_lines(array: string[], _depth: number, _size: number): void;
}
export declare class Nested_Ifs extends Term {
    condition_string: string;
    then_branch: Term;
    else_branch: Term;
    print_into(array: string[], indentation_depth: number, indentation_length: number): void;
    print_into_with_extra_lines(array: string[], indentation_depth: number, indentation_length: number): void;
    print_into_continuation(array: string[], col: number): void;
    target_condition_string(target_number: number): string;
    target_word(target_number: number): string;
    return_string(target_number: number): string;
    set_condition_at_level(target_level: number, condition: string): void;
}
export declare const NOISE_MARKED_LEN = 37;
export declare const NOISE_ABOVE_LEN = 37;
export declare const NOISE_BELOW_LEN = 35;
export declare const NO_NOISE_WORD_LEN = 2;
export declare function generate_if_statement_noise(nesting_depth: number, level: number): {
    if_statement: Nested_Ifs;
    marked_word: string;
};
export declare function generate_if_statement_no_noise(nesting_depth: number, level: number): {
    if_statement: Nested_Ifs;
    marked_word: string;
};
