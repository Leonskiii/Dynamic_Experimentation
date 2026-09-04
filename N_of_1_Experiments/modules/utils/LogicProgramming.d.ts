export declare class Binding {
    number_of_variables: number;
    values: any[];
    constructor(number_of_variables: number);
    do_matching(that: Binding, this_positions: number[], other_positions: number[]): {
        matches: boolean;
        left: Binding;
        has_left_variable_replacements: boolean;
        right: Binding;
        has_right_variable_replacements: boolean;
    };
    clone(): Binding;
    do_print(): void;
}
export declare class Logical_Results {
    static Empty_Logical_Results(num_params: number): Logical_Results;
    static Logical_Results_FROM_SOLUTION_ARRAY(num_params: number, array: any[]): Logical_Results;
    number_of_variables: number;
    rows: Binding[];
    constructor(number_of_variables: number);
    has_contradiction(): boolean;
    add_solution_array(solution_array: []): void;
    unify_results(that: Logical_Results, this_positions: number[], other_positions: number[]): void;
    do_print(): void;
    solutions(): Binding[];
    random_result_for_column(column: number): Logical_Results;
    random_row_for_random_column_value(column: number): Binding;
    elements_of_column_with_unique_results(column: number): any[];
    rows_with_value_matching(column: any, value: any): any[];
}
export declare function array_of_rows_to_logical_result(number_of_columns: any, array_of_rows: any): Logical_Results;
export declare function array_of_values_to_logical_result(number_of_columns: any, array_of_values: any): Logical_Results;
export declare function array_of_array_of_values_to_logical_result(number_of_columns: any, array_of_arrays_of_values: any): Logical_Results;
