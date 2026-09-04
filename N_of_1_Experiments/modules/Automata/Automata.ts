import {Transition, Transition_Acceptor_Function} from "./Transitions.js";
import {contains} from "../utils/Utils.js";
import {Automata_Configurator} from "./Automata_Configurator.js";
export function init(){}

export class Automata {

    constructor(
        config: Automata_Configurator
    )
    {
        this.start_state = config.start;
        this.states = config.states;

        for(let i=0; i<this.states.length; i++) {
            this.transitions.push([]);
        }


        for(let t of config.transitions) {
            if(this.transitions == null) {
                console.log("Something is wrong here");
            }

            if(this.transitions == undefined || t.from==undefined) {
                console.log("Something is wrong here");
            }

            if(this.transitions[t.from] ==undefined) {
                console.log("Something is wrong here");
            }
try {
    this.transitions[t.from].push(t);
}catch (e) {
    console.log("weird")
            }
        }
        this.init_function = config.init_function;
        this.end_states = config.end_states;
    }


    current_state:number = -1;
    start_state: number;
    transitions:Transition[][] = [];
    states: number[] = [];
    end_states: number[];
    init_function: ()=>void;

    // on_finish_function: (number) => void;

    input(
            input:string
         )
    :void
    {
        let matching_transition:Transition = this.first_match(input);
        let state_before:number = this.current_state;
        if(matching_transition != null) {
            this.current_state = matching_transition.next_state; // go to next state
            matching_transition.action(state_before, input, this.current_state); // go to next state
        }
    }

    start(
         )
    {
        this.current_state = this.start_state;
    }

    private first_match(
                            input: string
                       )
    :Transition
    {
        for(let i=0; i<this.transitions[this.current_state].length; i++) {
            if(this.transitions[this.current_state][i].accepts(input))
                return this.transitions[this.current_state][i];
        }
        return null;
    }

    initialize() {
        this.current_state = this.start_state;
        this.init_function();
    }

    add_finish_action(action: () => void) {
        for(let transitions of this.transitions) {
            for(let transition of transitions) {
                if(this.is_transition_to_end(transition)) {
                    let former_action = transition.action;
                    transition.action = (from: number, input: string, next: number) => {
                        former_action(from, input, next);
                        action();
                    }
                }
            }
        }
    }

    private is_transition_to_end(transition: Transition) {
        return contains(this.end_states, transition.next_state);
    }

    add_action_to_transitions(is_target_transition:(in_transition: Transition) => boolean, action: () => void) {
        for(let transitions of this.transitions) {
            for(let transition of transitions) {
                if(is_target_transition(transition)) {
                    let former_action = transition.action;
                    transition.action = (from: number, input: string, next: number) => {
                        former_action(from, input, next);
                        action();
                    }
                }
            }
        }
    }
}


