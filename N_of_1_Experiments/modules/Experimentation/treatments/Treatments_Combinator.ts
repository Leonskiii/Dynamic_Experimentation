import type {Independent_Variable} from "./Independent_Variable.js";
import {Treatment_Combination} from "./Treatment_Combination.js";
import {Task} from "../Task.js";
import {Experiment_Definition} from "../Experiment_Definition.js";
import {do_random_array_sort} from "../Experimentation.js";
import {Independent_Variables} from "./Independent_Variables.js";

/**
 * All experiment definitions contain the treatment combinations (including repetitions)
 */
export class Treatments_Combinator {

    variables: Independent_Variables;
    repetitions: number;

    constructor(variables: Independent_Variables, repetitions: number) {
        this.variables = variables;
        this.repetitions = repetitions;
    }

    clone(): Treatments_Combinator {
        return new Treatments_Combinator(this.variables, this.repetitions);
    }

    create_treatment_combinations(): Treatment_Combination[] {
        let treatment_combinations = [];
        for(let r=0; r<this.repetitions; r++) {
            treatment_combinations = treatment_combinations.concat(this.variables.create_treatment_combinations());
        }
        return treatment_combinations;
    }

    create_tasks(experiment_definition: Experiment_Definition):Task[] {
        let tasks = [];
        for (let treatment_combination of this.create_treatment_combinations()) {
            let task: Task = new Task(treatment_combination.clone(), experiment_definition, "");
            try {
                experiment_definition.experiment_definition_task_creator(task);
            } catch (ex) {
                console.log("halt");
                experiment_definition.experiment_definition_task_creator(task)
            }
            task.is_training = experiment_definition.is_training;

            if(task.drop != true) {
                tasks.push(task);
            }
        }
        return do_random_array_sort(tasks);
    }

    get_variable_named(var_name:string):Independent_Variable {
        return this.variables.get_variable_named(var_name);
    }

/*
        for(let v of this.variables) {
            if(v.name === var_name)
                return v;
        }
        throw "Unknown independent variable named: " + var_name;
 */

}