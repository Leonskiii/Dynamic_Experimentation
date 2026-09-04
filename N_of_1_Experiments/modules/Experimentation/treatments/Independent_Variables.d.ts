import { Independent_Variable } from "./Independent_Variable.js";
import { Treatment_Combination } from "./Treatment_Combination.js";
export declare class Independent_Variables {
    independent_variables: Independent_Variable[];
    push_variable(n: string, treatments: string[]): void;
    print_to_array(result: string[]): void;
    create_treatment_combinations(): Treatment_Combination[];
    get_variable_named(var_name: string): Independent_Variable;
    static from_layout(layout: {
        variable: string;
        treatments: string[];
    }[]): Independent_Variables;
}
