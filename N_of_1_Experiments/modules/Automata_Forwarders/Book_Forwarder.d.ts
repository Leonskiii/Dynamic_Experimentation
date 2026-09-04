import { Automata_Configurator } from "../Automata/Automata_Configurator.js";
import { Automata_With_Output_Forwarder } from "./Automata_With_Output_Forwarder.js";
import { Measurement_Type, Output_Command } from "../Experimentation/Experimentation.js";
export declare function init(): void;
export declare class Book_Forwarder extends Automata_With_Output_Forwarder {
    pages: Output_Command[];
    current_page_number: number;
    constructor(book_name: string, text: Output_Command[], measurement: Measurement_Type);
    set_page_index(index: number): void;
    set_active(): void;
    show_intro(): void;
    show_outro(): void;
    automata_configurator(): Automata_Configurator;
    transitions(): import("../Automata/Transitions.js").Transition[];
}
