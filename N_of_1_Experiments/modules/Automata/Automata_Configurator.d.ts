import { Transition } from "./Transitions.js";
import { Automata } from "./Automata.js";
export declare function init(): void;
export declare class Automata_Configurator {
    states: number[];
    start: number;
    transitions: Transition[];
    end_states: number[];
    init_function: () => void;
    constructor(states: number[], start: number, init_function: () => void, transitions: Transition[], end_states: number[]);
}
export declare function create_automata(states: number[], start: number, init_function: () => void, transitions: Transition[], end_states: number[]): Automata;
