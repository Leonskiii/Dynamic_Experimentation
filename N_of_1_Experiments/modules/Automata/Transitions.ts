import {contains} from "../utils/Utils.js";

export function init(){}
abstract class Transition_Acceptor {
    abstract accepts(input: string): boolean;
}

class Transition_Strings_Acceptor extends  Transition_Acceptor {
    constructor(strings: string[]) {
        super();
        this.accepted_strings = strings;
    }

    accepted_strings: string[];
    accepts(input: string) {
        return contains(this.accepted_strings, input);
    }
}

export class Transition_Acceptor_Function extends  Transition_Acceptor {
    constructor(acceptor_function: (checked_string:string) => boolean) {
        super();
        this.acceptor_function = acceptor_function;
    }

    acceptor_function: (checked_string:string) => boolean;
    accepts(input: string) {
        return this.acceptor_function(input);
    }
}

class Transition_Strings_Accepts_ALL extends  Transition_Acceptor {
    accepts(input: String) {
        return true;
    }
}


export function keys(strings:string[]) {
    return new Transition_Strings_Acceptor(strings);
}

export function if_func(f: (s:string)=>boolean) {
    return new Transition_Acceptor_Function(f);
}
export function each_char(charlist:string) {
    var chars:string[] = [];
    for(let a of charlist) {
        chars.push(a);
    }

    return new Transition_Strings_Acceptor(chars);
}

export class Transition {
    from: number;
    acceptor: Transition_Acceptor;
    next_state: number;
    action: (from :number, input :string, to :number) => void;

    constructor(from: number, acceptor: Transition_Acceptor, next_state: number, action: (from :number, input :string, to :number) => void){
        this.from = from;
        this.acceptor = acceptor;
        this.next_state = next_state;
        this.action = action;
    };

    is_valid_input(input: string) {
        return this.acceptor.accepts(input);
    }

    accepts(input: string) {
        return this.acceptor.accepts(input);
    }
}

export function Simple_Transition(
                                    from: number,
                                    accept_input_function: (input: string)=>boolean,
                                    next_state: number,
                                    action: (s:String)=>void
                                 )
{
    return new Transition(from, new Transition_Acceptor_Function(accept_input_function), next_state, (s:number, i:string, n:number) => action(i))
}



export function accept_all():Transition_Strings_Accepts_ALL {
    return new Transition_Strings_Accepts_ALL();
}
export function do_nothing(at:number, input:string, next: number):void {}
export function pass(f:()=>void):(at:number, input:string, next: number)=>void {
    return (at:number, input:string, next: number) => f();
}

export function from(from: number)
{

    return {
            to: (to: number) => { return {
                on: (key: string)=> { return {
                        if: (check: (i:string)=>boolean)=> { return {
                            do:(action:(i:string)=>void) => {
                                return Simple_Transition(from, (input: string)=> {return input==key && check(input)}, to, action)
                            }
                         }},
                        do:(action:(i:string)=>void) => {
                            return Simple_Transition(from, (input: string)=> {return input==key}, to, action)
                        }
                    }},
                on_any: (keys: string[])=> { return {
                    if: (check: (i:string)=>boolean)=> { return {
                        do:(action:(i:string)=>void) => {
                            return Simple_Transition(from, (input: string)=> {
                                return contains(keys,input) && check(input)}, to, action)
                        }
                    }},
                    do:(action:(i:string)=>void) => {
                        return Simple_Transition(from, (input: string)=> {return contains(keys,input)}, to, action)
                    }
                }}
            }},

    }

}
