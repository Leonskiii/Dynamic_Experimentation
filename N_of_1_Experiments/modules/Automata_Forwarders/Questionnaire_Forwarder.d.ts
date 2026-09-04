import { Automata_With_Output_Forwarder } from "./Automata_With_Output_Forwarder.js";
import { Automata_Configurator } from "../Automata/Automata_Configurator.js";
import { Measurement_Type } from "../Experimentation/Experimentation.js";
export declare abstract class Question {
    variable_name: string;
    question_text: string;
    answer: any;
    constructor(variable_name: string, question_text: string);
    abstract input_html(): any;
    store_answer(): void;
}
export declare class Alternatives extends Question {
    alternatives: string[];
    constructor(variable_name: string, question_text: string, alternatives: string[]);
    input_html(): string;
    store_answer(): void;
}
export declare class Information extends Question {
    html_string(): string;
    input_html(): string;
    constructor(question_text: string);
}
export declare class Freetext extends Question {
    html_string(): void;
    input_html(): string;
}
export declare class Questionnaire_Forwarder extends Automata_With_Output_Forwarder {
    current_question_number: number;
    questions: Question[];
    constructor(questions: Question[], measurement: Measurement_Type);
    automata_configurator(): Automata_Configurator;
    transitions(): import("../Automata/Transitions.js").Transition[];
    show_intro(): void;
    show_outro(): void;
    create_questionnaire_html_string(): string;
    add_result_to_question(): void;
}
