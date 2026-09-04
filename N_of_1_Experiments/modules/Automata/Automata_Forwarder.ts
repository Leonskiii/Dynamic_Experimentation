import {Automata} from "./Automata.js";

export class Automata_Forwarder {

    automata: Automata;

    forwarder_name: string;

    constructor(forwarder_name: string) {
        this.forwarder_name = forwarder_name;
    }


    input(s: string) {
        this.automata.input(s);
    }

    set_active_function: ()=>void = ()=>{};

    add_activation_function(to_add: ()=>void) {
        // let old_activation_function = this.set_active_function;
        // this.set_active_function = () => {
        //     old_activation_function();
        //     to_add();
        // }
    }

    set_active() {}
}