export declare abstract class Term {
    abstract print_into(array: string[], indentation_depth: number, indentation_size: number): any;
    abstract print_into_with_extra_lines(array: string[], indentation_depth: number, indentation_size: number): any;
    print_string(indentation_size: number): string;
    print_string_with_extra_lines(indentation_size: number): string;
}
export declare class Return extends Term {
    return_value: number;
    constructor(return_value: number);
    print_into(array: string[], indentation_depth: number, indentation_length: number): void;
    print_into_with_extra_lines(array: string[], indentation_depth: number, indentation_size: number): void;
}
export declare class Nested_Ifs extends Term {
    condition_string: string;
    then_branch: Term;
    else_branch: Term;
    print_into(array: string[], indentation_depth: number, indentation_length: number): void;
    print_into_with_extra_lines(array: string[], indentation_depth: number, indentation_length: number): void;
    target_condition_string(target_number: number): string;
    return_string(target_number: number): string;
}
export declare function generate_If_Statement(indentation_depth: any, nesting_depth: any): Nested_Ifs;
