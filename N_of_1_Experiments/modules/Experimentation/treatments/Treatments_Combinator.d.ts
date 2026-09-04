import type { Independent_Variable } from "./Independent_Variable.js";
import { Treatment_Combination } from "./Treatment_Combination.js";
import { Task } from "../Task.js";
import { Experiment_Definition } from "../Experiment_Definition.js";
import { Independent_Variables } from "./Independent_Variables.js";
/**
 * All experiment definitions contain the treatment combinations (including repetitions)
 */
export declare class Treatments_Combinator {
    variables: Independent_Variables;
    repetitions: number;
    constructor(variables: Independent_Variables, repetitions: number);
    clone(): Treatments_Combinator;
    create_treatment_combinations(): Treatment_Combination[];
    create_tasks(experiment_definition: Experiment_Definition): Task[];
    get_variable_named(var_name: string): Independent_Variable;
}
