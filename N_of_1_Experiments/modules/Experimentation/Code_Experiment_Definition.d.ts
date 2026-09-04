import { Experiment_Definition } from "./Experiment_Definition.js";
import { Sequential_Forwarder_Forwarder } from "../Books/Sequential_Forwarder_Forwarder.js";
import { Measurement_Type, Output_Command } from "./Experimentation.js";
import { Question } from "../Automata_Forwarders/Questionnaire_Forwarder.js";
import { Training_Configuration } from "./Training_Configuration.js";
export declare function init(): void;
export declare class Code_Experiment_Definition extends Experiment_Definition {
    create_code_all_experiment_automatas(cfg: {
        seed: string;
        introduction_texts: Output_Command[];
        post_questionnaire?: Question[];
        pre_run_training_output: Output_Command;
        training_configuration: Training_Configuration;
        pre_run_experiment_output: Output_Command;
        finish_texts: Output_Command[];
        measurement: Measurement_Type;
        finish_function: (experiment: Experiment_Definition) => void;
    }): Sequential_Forwarder_Forwarder;
    private clone;
}
