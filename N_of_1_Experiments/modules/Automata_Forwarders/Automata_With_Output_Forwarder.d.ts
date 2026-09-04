import { Automata_Forwarder } from "../Automata/Automata_Forwarder.js";
import { Experiment_Output_Writer, Measurement_Type, Output_Command } from "../Experimentation/Experimentation.js";
import { Automata_Configurator } from "../Automata/Automata_Configurator.js";
import { Automata } from "../Automata/Automata.js";
export declare function init(): void;
export declare abstract class Automata_With_Output_Forwarder extends Automata_Forwarder {
    pre_run_instructions: Output_Command;
    post_run_instructions: Output_Command;
    measurement: Measurement_Type;
    constructor(forwarder_name: string, measurement: Measurement_Type, pre_run_instructions: Output_Command, post_run_instructions: Output_Command);
    set_active(): void;
    create_automata(): Automata;
    abstract automata_configurator(): Automata_Configurator;
    output_writer(): Experiment_Output_Writer;
    show_intro(): void;
    abstract show_outro(): any;
    empty_screen_and_show_instructions(command: Output_Command): void;
}
