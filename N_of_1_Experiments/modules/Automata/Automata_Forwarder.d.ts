import { Automata } from "./Automata.js";
export declare class Automata_Forwarder {
    automata: Automata;
    forwarder_name: string;
    constructor(forwarder_name: string);
    input(s: string): void;
    set_active_function: () => void;
    add_activation_function(to_add: () => void): void;
    set_active(): void;
}
