import { Task } from "./Task.js";
import { Alternatives, Freetext, Information } from "../Automata_Forwarders/Questionnaire_Forwarder.js";
export type Output_Command = () => void;
export declare function init(): void;
export declare enum VARIABLE_TYPE {
    STRING = 1,
    NUMBER = 2
}
export declare function Reaction_Time(input: (writer: Experiment_Output_Writer) => Experiment_Input_Type): (writer: Experiment_Output_Writer) => Measurement_Type;
export declare function Reaction_Time_With_Penalty(input: (writer: Experiment_Output_Writer) => Experiment_Input_Type, penalty_seconds: number): (writer: Experiment_Output_Writer) => Measurement_Type;
export declare function Time_to_finish(input: (Experiment_Output_Writer: any) => Experiment_Input_Type): (Experiment_Output_Writer: any) => Measurement_Type;
export declare function Time_to_finish_with_Penalty(input: (Experiment_Output_Writer: any) => Experiment_Input_Type, penalty_seconds: number): (Experiment_Output_Writer: any) => Measurement_Type;
export declare function keys(key_list: string[]): (writer: Experiment_Output_Writer) => Key_Pressing;
export declare function keys_0_to_9(): (writer: Experiment_Output_Writer) => Key_Pressing;
export declare function text_input_experiment(output_writer: Experiment_Output_Writer): Experiment_Input_Type;
export declare function text_input_experiment_with_pre_post_label(pre: any, post: any): (output_writer: Experiment_Output_Writer) => Free_Text_User_Input_Experiment_With_PrePost;
export declare function information(question: string): Information;
export declare function free_text(var_name: string, question: string): Freetext;
export declare function alternatives(var_name: string, question: string, alternatives: string[]): Alternatives;
export declare abstract class Experiment_Output_Writer {
    abstract print_experiment_name(s: string): any;
    abstract print_string_to_state(forwarder_name: string): any;
    abstract clear_stage(): any;
    abstract clear_error(): any;
    abstract print_string_on_stage(s: string): any;
    abstract print_html_on_stage(s: string): any;
    abstract print_html_on_error(s: string): any;
    abstract print_error_string_on_stage(error_string: string): any;
    convert_string_to_html_string(s: string): string;
    string_page_command(s: string): Output_Command;
    stage_string_pages_commands(pages: string[]): Output_Command[];
    abstract ask_for_input(): any;
    abstract print_string_to_page_number(s: string): any;
    get_given_answer(input: string): string;
    print_on_input_response(given_answer: string): void;
    set_focus_on_input(): void;
    abstract clear_state(): any;
    clear_all(): void;
}
export declare abstract class Measurement_Type {
    input_type: Experiment_Input_Type;
    start_time: number;
    constructor(input_type: Experiment_Input_Type);
    accepted_responses(): string[];
    given_answer(i: string): any;
    start_measurement(task: Task): void;
    stop_measurement(input: string, task: Task): void;
    incorrect_response(i: string, task: Task): void;
    output_writer(): Experiment_Output_Writer;
    get_given_answer(input: string): string;
    demands_penalty(): boolean;
    penalty_is_over(): boolean;
}
export declare class Reaction_Time_Measurement extends Measurement_Type {
    constructor(input_type: Experiment_Input_Type);
}
export declare class Reaction_Time_Penalty_Measurement extends Measurement_Type {
    penalty_miliseconds: number;
    penalty_started: boolean;
    penalty_start_point: any;
    constructor(input_type: Experiment_Input_Type, penalty_seconds: number);
    demands_penalty(): boolean;
    incorrect_response(i: string, task: Task): void;
    delete_penalty(): void;
    penalty_is_over(): boolean;
    start_measurement(task: Task): void;
}
export declare class Time_To_Finish_Measurement extends Measurement_Type {
    constructor(input_type: Experiment_Input_Type);
}
export declare class Time_To_Finish_With_Time_Penalty_Measurement extends Time_To_Finish_Measurement {
    penalty_miliseconds: number;
    penalty_started: boolean;
    penalty_start_point: any;
    constructor(input_type: Experiment_Input_Type, penalty_seconds: number);
    demands_penalty(): boolean;
    incorrect_response(i: string, task: Task): void;
    delete_penalty(): void;
    penalty_is_over(): boolean;
    start_measurement(task: Task): void;
}
export declare abstract class Experiment_Input_Type {
    output_writer: Experiment_Output_Writer;
    abstract accepted_responses(): string[];
    abstract given_answer(key_pressed: string): any;
    constructor(output_writer: Experiment_Output_Writer);
    print_input_request(): void;
    get_given_answer(input_string: string): string;
}
export declare class Key_Pressing extends Experiment_Input_Type {
    accepted_keys: string[];
    constructor(accepted_keys: string[], output_writer: Experiment_Output_Writer);
    accepted_responses(): string[];
    given_answer(key_pressed: string): string;
    print_input_request(): void;
    get_given_answer(input_string: string): string;
}
export declare class Free_Text_User_Input_Experiment extends Experiment_Input_Type {
    constructor(output_writer: Experiment_Output_Writer);
    accepted_responses(): string[];
    given_answer(key_pressed: string): void;
    print_input_request(): void;
}
export declare class Free_Text_User_Input_Experiment_With_PrePost extends Experiment_Input_Type {
    constructor(output_writer: Experiment_Output_Writer, pre: string, post: string);
    accepted_responses(): string[];
    given_answer(key_pressed: string): void;
    print_input_request(): void;
}
declare class _Random {
    constructor();
    new_random_integer(upper_limit: number): number;
    set_seed(seed: string): void;
}
export declare const Random: _Random;
export declare function SET_SEED(seed: string): void;
export declare function random_integer_up_to_excluding(upper_limit: number): number;
export declare function do_random_array_sort<T>(array: T[]): T[];
export declare function random_array_element_and_remove<T>(array: T[]): T;
export declare function random_array_element<T>(array: T[]): T;
export declare function random_array_element_without<T>(array: T[], exceptions: any): T;
export declare function random_array_elements_without_repetitions<T>(array: T[], number_of_elements_to_chose: number): T[];
export declare function random_lower_case_letter(): string;
export declare function random_lower_case_letter_except(letters: string[]): string;
export declare function random_upper_case_letter_except(letters: string[]): string;
export declare function Standard_Post_Questionnaire(): Alternatives[];
export {};
