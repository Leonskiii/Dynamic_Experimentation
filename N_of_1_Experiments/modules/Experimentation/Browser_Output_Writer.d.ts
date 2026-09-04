import { Experiment_Output_Writer, Measurement_Type, Output_Command } from "./Experimentation.js";
import { Task } from "./Task.js";
import { Question } from "../Automata_Forwarders/Questionnaire_Forwarder.js";
import { Sequential_Forwarder_Forwarder } from "../Books/Sequential_Forwarder_Forwarder.js";
export declare class Browser_Output_Writer extends Experiment_Output_Writer {
    print_experiment_name(s: string): void;
    clear_error(): void;
    clear_stage(): void;
    clear_state(): void;
    print_error_string_on_stage(s: string): void;
    get_html_element_by_id(s: string): HTMLElement;
    print_string_to_state(s: string): void;
    print_string_on_stage(s: string): void;
    ask_for_input(): void;
    set_focus_on_input(): void;
    print_string_to_page_number(s: string): void;
    get_given_answer(): string;
    print_on_input_response(given_answer: string): void;
    private create_html_element_from_string;
    print_html_on_stage(s: string): void;
    print_html_on_error(s: string): void;
}
export declare function BROWSER_EXPERIMENT(creator: (writer: Experiment_Output_Writer) => {
    experiment_name: string;
    seed: string;
    introduction_pages: (() => void)[];
    post_questionnaire?: Question[];
    pre_run_training_instructions: Output_Command;
    training_configuration?: {
        fixed_treatments?: string[][];
        can_be_cancelled: boolean;
        can_be_repeated: boolean;
    };
    pre_activation_function?: (f: Sequential_Forwarder_Forwarder) => void;
    pre_run_experiment_instructions: Output_Command;
    finish_pages: Output_Command[];
    layout: {
        variable: string;
        treatments: string[];
    }[];
    repetitions: number;
    measurement: (Experiment_Output_Writer: any) => Measurement_Type;
    task_configuration: (task: Task) => void;
}): void;
