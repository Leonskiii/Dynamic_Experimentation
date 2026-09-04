import {Independent_Variable} from "./treatments/Independent_Variable.js";
import {Task} from "./Task.js";
import {Measurement_Type} from "./Experimentation.js";
import {Questionnaire_Forwarder} from "../Automata_Forwarders/Questionnaire_Forwarder.js";
import {Treatments_Combinator} from "./treatments/Treatments_Combinator.js";
import {Independent_Variables} from "./treatments/Independent_Variables.js";

export function init(){}

export abstract class Experiment_Definition {

    experiment_name: string;
    is_training: boolean;

    variables: Independent_Variables;
    questionnaires:Questionnaire_Forwarder[] = [];
    measurement:Measurement_Type;
    treatments_combinator: Treatments_Combinator;

    tasks: Task[] = [];

    experiment_definition_task_creator: (Task: Task) => void;

    constructor(experiment_name: string,
                is_training: boolean,
                treatments_combinator: Treatments_Combinator,
                variables: Independent_Variables,
                repetitions: number,
                measurement:Measurement_Type,
                task_creator: (task: Task) => void)
    {
        this.experiment_name = experiment_name;
        this.is_training = is_training;
        this.template = {experiment_name: experiment_name, variables: variables, repetitions: repetitions, task_creator: task_creator};
        this.treatments_combinator = treatments_combinator;
        this.variables = variables;
        this.measurement = measurement;
        this.experiment_definition_task_creator = task_creator;
    }

    template: {  experiment_name: string,
                 variables:  Independent_Variables,
                 repetitions: number,
                 task_creator: (task: Task) => void };



    init_experiment(is_training) {
        this.tasks = this.treatments_combinator.create_tasks(this);
    }

    all_independent_variables():Independent_Variable[] {
        return this.variables.independent_variables;
    }

    generate_csv_data():string[] {
        let result:string[] = [];
        // let questionnaire_variables = this.questionnaire_responses = cfg.questionnaire.filter((e: Input_Object)=> !(e instanceof Information)).map((e: Input_Object)=>e.variable);
        for(let questionnaire of this.questionnaires) {
            for(let question of questionnaire.questions) {
                result.push("\"" + question.variable_name + "\"" + ";");
            }
        }
        this.variables.print_to_array(result);
        result.push("number_of_given_answers;expected_answer;given_answer;is_correct;time_in_milliseconds;\n");
        for(let task of this.tasks) {
            for(let questionnaire of this.questionnaires) {
                for (let question of questionnaire.questions) {
                    result.push("\"" + question.answer + "\"" + ";");
                }
            }
            for(let treatment_combination of task.treatment_combination.treatment_combination) {
                result.push(treatment_combination.value + ";")
            }
            result.push((task.invalid_answers.length + 1) + ";");
            result.push(task.expected_answer + ";");
            result.push(task.given_answer + ";");
            result.push("" + (task.given_answer==task.expected_answer) + ";");
            result.push(task.required_milliseconds + ";");

            task.invalid_answers.forEach( (a) => result.push(a[0] + ";" + a[1] + ";"));

            result.push("\n");
        }
        return result; /*this comment just needed for a commit.....*/
    }
}