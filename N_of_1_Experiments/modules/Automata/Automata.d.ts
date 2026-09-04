import { Transition } from "./Transitions.js";
import { Automata_Configurator } from "./Automata_Configurator.js";
export declare function init(): void;
export declare class Automata {
    constructor(config: Automata_Configurator);
    current_state: number;
    start_state: number;
    transitions: Transition[][];
    states: number[];
    end_states: number[];
    init_function: () => void;
    input(input: string): void;
    start(): void;
    private first_match;
    initialize(): void;
    add_finish_action(action: () => void): void;
    private is_transition_to_end;
    add_action_to_transitions(is_target_transition: (in_transition: Transition) => boolean, action: () => void): void;
}
