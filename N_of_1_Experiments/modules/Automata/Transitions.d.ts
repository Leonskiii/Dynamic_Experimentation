export declare function init(): void;
declare abstract class Transition_Acceptor {
    abstract accepts(input: string): boolean;
}
declare class Transition_Strings_Acceptor extends Transition_Acceptor {
    constructor(strings: string[]);
    accepted_strings: string[];
    accepts(input: string): boolean;
}
export declare class Transition_Acceptor_Function extends Transition_Acceptor {
    constructor(acceptor_function: (checked_string: string) => boolean);
    acceptor_function: (checked_string: string) => boolean;
    accepts(input: string): boolean;
}
declare class Transition_Strings_Accepts_ALL extends Transition_Acceptor {
    accepts(input: String): boolean;
}
export declare function keys(strings: string[]): Transition_Strings_Acceptor;
export declare function if_func(f: (s: string) => boolean): Transition_Acceptor_Function;
export declare function each_char(charlist: string): Transition_Strings_Acceptor;
export declare class Transition {
    from: number;
    acceptor: Transition_Acceptor;
    next_state: number;
    action: (from: number, input: string, to: number) => void;
    constructor(from: number, acceptor: Transition_Acceptor, next_state: number, action: (from: number, input: string, to: number) => void);
    is_valid_input(input: string): boolean;
    accepts(input: string): boolean;
}
export declare function Simple_Transition(from: number, accept_input_function: (input: string) => boolean, next_state: number, action: (s: String) => void): Transition;
export declare function accept_all(): Transition_Strings_Accepts_ALL;
export declare function do_nothing(at: number, input: string, next: number): void;
export declare function pass(f: () => void): (at: number, input: string, next: number) => void;
export declare function from(from: number): {
    to: (to: number) => {
        on: (key: string) => {
            if: (check: (i: string) => boolean) => {
                do: (action: (i: string) => void) => Transition;
            };
            do: (action: (i: string) => void) => Transition;
        };
        on_any: (keys: string[]) => {
            if: (check: (i: string) => boolean) => {
                do: (action: (i: string) => void) => Transition;
            };
            do: (action: (i: string) => void) => Transition;
        };
    };
};
export {};
