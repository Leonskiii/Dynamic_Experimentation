import {Transition} from "./Transitions.js";
import {Automata} from "./Automata.js";

export function init(){}

export class Automata_Configurator {
    states: number[];
    start: number;
    transitions:Transition[];
    end_states:number[];
    init_function:()=>void;

    constructor(
                    states: number[],
                    start: number,
                    init_function:()=>void,
                    transitions: Transition[],
                    end_states: number[],
    ) {
        this.states = states;
        this.start = start;
        this.init_function = init_function;
        this.transitions = transitions;
        this.end_states = end_states;
    }
}

export function create_automata(
                                        states: number[],
                                        start: number,
                                        init_function:()=>void,
                                        transitions: Transition[],
                                        end_states:number[],
                               )
{
    return new Automata(new Automata_Configurator(states, start,  init_function, transitions, end_states));
}
