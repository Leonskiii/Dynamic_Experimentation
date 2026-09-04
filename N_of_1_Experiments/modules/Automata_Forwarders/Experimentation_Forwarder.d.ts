import { Task } from "../Experimentation/Task.js";
import { Automata_Configurator } from "../Automata/Automata_Configurator.js";
import { Experiment_Definition } from "../Experimentation/Experiment_Definition.js";
import { Automata_With_Output_Forwarder } from "./Automata_With_Output_Forwarder.js";
import { Measurement_Type, Output_Command } from "../Experimentation/Experimentation.js";
export declare class Experimentation_Forwarder extends Automata_With_Output_Forwarder {
    current_page_index: number;
    experiment_definition: Experiment_Definition;
    show_intro(): void;
    show_outro(): void;
    automata_configurator(): Automata_Configurator;
    current_task(): Task;
    constructor(experiment_automata_name: string, pre_run_instructions: Output_Command, post_run_instructions: Output_Command, experiment_definition: Experiment_Definition, measurement: Measurement_Type);
    automata_configuration(): Automata_Configurator;
    transitions(): import("../Automata/Transitions.js").Transition[];
    set_experiment_index(index: number): void;
    inc_current_experiment(): void;
    init_experiment(): void;
    private show_pre_task_info;
    private next_task;
    private first_task;
}
