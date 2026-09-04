import { Experiment_Definition } from "../Experimentation/Experiment_Definition.js";
import { Task } from "../Experimentation/Task.js";
export declare function init(): void;
export type Function_P1<T> = (p1: T) => void;
export type Function_P1_R<T, R> = (p1: T) => R;
export type Function_P2<T, U> = (p1: T, p2: U) => void;
export type Function_P2_R<T, U, R> = (p1: T, p2: U) => R;
export type Function_P3<T, U, V> = (p1: T, p2: U, p3: V) => void;
export type Function_P3_R<T, U, V, R> = (p1: T, p2: U, p3: V) => R;
export declare class RefObject<T> {
    value: T;
    constructor(value: T);
}
export declare function contains(collection: any[], element: any): boolean;
export declare function cartesian_product(arr1: any, arr2: any, f: any): void;
export declare function guarantee_test(f: () => boolean): void;
export declare function guarantee_true(trueFalse: boolean): void;
export declare function convert_string_to_html_string(s: string): string;
export declare function key_event_string(event: any): string;
export declare function array_to_sequence_of_size_(sequence: any[]): number[];
export declare function csv_encoding(a_string: String): string;
export declare function save_file_in_html(filename: string, data: string[]): void;
export declare function add_upload_push_button(url: string, button_test: string, data: string): void;
export declare function upload_experiment_to_server<TaskType extends Task>(experiment: Experiment_Definition): void;
