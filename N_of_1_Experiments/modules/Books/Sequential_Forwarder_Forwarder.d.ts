import { Automata_Forwarder } from "../Automata/Automata_Forwarder.js";
export declare class Sequential_Forwarder_Forwarder extends Automata_Forwarder {
    forwarders: Automata_Forwarder[];
    current_forwarder_index: number;
    constructor(forwarders: Automata_Forwarder[]);
    input(input: string): void;
    input_sequence(input_sequence: string[]): void;
    current_forwarder(): Automata_Forwarder;
    set_active(): void;
}
