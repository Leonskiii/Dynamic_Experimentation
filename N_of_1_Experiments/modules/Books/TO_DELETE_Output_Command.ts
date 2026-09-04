// import * as Utils from "../Utils.js";
// import {AUTOMATA_OUTPUT_OBJECT_FORMAT} from "./Automata_IO.js";
// import {Treatment} from "../Experimentation/Treatment.js";
// import {Independent_Variable} from "../Experimentation/Independent_Variable.js";
//

//
// // export class Output_Command {
//     // to_write: {text:any, format:AUTOMATA_OUTPUT_OBJECT_FORMAT}[];
//     //
//     // constructor(to_write: { text: any; format: AUTOMATA_OUTPUT_OBJECT_FORMAT }[]) {
//     //     // this.to_write = to_write;
//     // }
//     //
//     // as_raw_string():string {
//     //     return this.to_write.map((e)=>e.text).join()
//     // }
//     //
//     // print_to_html_element(html_element: HTMLElement) {
//     //     // html_element.textContent = "";
//     //     for(let element of this.to_write) {
//     //
//     //         if(element.format==AUTOMATA_OUTPUT_OBJECT_FORMAT.HTML) {
//     //
//     //             let parser:DOMParser = new DOMParser();
//     //             let newDocument = parser.parseFromString(element.text, "text/html");
//     //             html_element.appendChild(newDocument.body);
//     //
//     //         } else if (element.format==AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT || element.format==AUTOMATA_OUTPUT_OBJECT_FORMAT.CODE) {
//     //             let html_string = "";
//     //             if (element.format==AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT) {
//     //                 html_string = "<div class='simple_text'>" + Utils.string_to_html(element.text) + "</div>";
//     //             } else if (element.format==AUTOMATA_OUTPUT_OBJECT_FORMAT.CODE) {
//     //                 html_string = "<div class='simple_code'>" + Utils.string_to_html(element.text) + "</div>";
//     //             }
//     //             let parser:DOMParser = new DOMParser();
//     //             let newDocument = parser.parseFromString(html_string, "text/html");
//     //             html_element.appendChild(newDocument.body);
//     //         } else if (element.format==AUTOMATA_OUTPUT_OBJECT_FORMAT.CODE_IN_HTML) {
//     //             let html_string = "";
//     //             html_string = "<ordinarytext>" + element.text + "</ordinarytext>";
//     //             let parser:DOMParser = new DOMParser();
//     //             let newDocument = parser.parseFromString(html_string, "text/html");
//     //             html_element.appendChild(newDocument.body);
// //     //         } else if (element.format==AUTOMATA_OUTPUT_OBJECT_FORMAT.HTML_NODE) {
// //     //             html_element.appendChild(this.to_write[0].text);
// //     //         }
// //     //     }
// //     }
// //
// //     // this is just the dummy method to be overridden by subclasses.
// //     // do_action() {}
// // }
//
// export class HTML_Node_Writer extends Output_Command {
//
// }
//
// export abstract class Input_Object extends Output_Command {
//         input:HTMLInputElement;
//         variable: Treatment;
//         answer_required: boolean;
//
//     constructor(variable_name: string, to_write: { text: string; format: AUTOMATA_OUTPUT_OBJECT_FORMAT }[], answer_required: boolean) {
//         super(to_write);
//         this.variable = new Treatment(new Independent_Variable(variable_name, [variable_name]), null);
//         // this.variable_name = variable_name;
//         this.answer_required = answer_required;
//     }
//
//     has_valid_input() {
//         this.do_action();
//         return !((this.variable.value == null) || this.variable.value == undefined);
//     }
//
//     can_be_left() {
//         return !this.answer_required || (this.has_valid_input());
//     }
// }
//
// export class Information extends Input_Object {
//
//
//     constructor(to_write: { text: string; format: AUTOMATA_OUTPUT_OBJECT_FORMAT }[]) {
//         super("null", to_write, true);
//         let parser:DOMParser = new DOMParser();
//         //this.input  = parser.parseFromString("<input type='text'/>", "text/html").body.lastElementChild as HTMLInputElement;
//     }
//
//     print_to_html_element(html_element: HTMLElement) {
//         super.print_to_html_element(html_element);
//         //html_element.appendChild(this.input);
//     }
//
//     has_valid_input() {
//         return true;
//     }
//
//     do_action() {}
// }
//
// export class Text_Input extends Input_Object {
//
//
//     constructor(variable_name: string, to_write: { text: string; format: AUTOMATA_OUTPUT_OBJECT_FORMAT }[], answer_required: boolean) {
//         super(variable_name, to_write, answer_required);
//         let parser:DOMParser = new DOMParser();
//         this.input  = parser.parseFromString("<input type='text'/>", "text/html").body.lastElementChild as HTMLInputElement;
//     }
//
//     print_to_html_element(html_element: HTMLElement) {
//         super.print_to_html_element(html_element);
//         html_element.appendChild(this.input);
//     }
//
//     has_valid_input() {
//         this.do_action();
//         if (!this.answer_required) return true;
//
//         return (this.variable.value != null) && (this.variable.value != undefined) && (this.variable.value!="");
//     }
//
//
//     do_action() {
//         this.variable.value = this.input.value;
//     }
// }
//
// export class Alternatives extends Input_Object {
//
//     options: string[];
//
//     constructor(variable_name: string,  to_write: {text: string; format: AUTOMATA_OUTPUT_OBJECT_FORMAT }[], options: string[], answer_required: boolean) {
//         super(variable_name, to_write, answer_required);
//         this.options = options;
//
//         let html_string = "<select><option disabled selected value> -- select an option -- </option>"
//
//         for (let option of options) {
//             html_string += "<option value = \"" + option + "\">"+ option + "</option>";
//         }
//
//         this.input  = new DOMParser().parseFromString(html_string + "</select>", "text/html").body.lastElementChild as HTMLInputElement;
//     }
//
//     print_to_html_element(html_element: HTMLElement) {
//         // super.print_to_html_element(html_element);
//         html_element.appendChild(this.input);
//     }
//
//     do_action() {
//         this.variable.value = this.input.value;
//     }
//
//     has_valid_input() {
//         return super.has_valid_input() && this.variable.value!="";
//     }
//
// }
//
// export function free_text(variable_name: string,  text:string, answer_required: boolean = true) {
//     return new Text_Input( variable_name,[{text: text, format: AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT}], answer_required);
// }
//
// export function information(text:string) {
//     return new Information( [{text: text, format: AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT}]);
// }
//
// export function alternatives(variable_name: string, text:string, options:string[], answer_required: boolean) {
//     return new Alternatives(variable_name, [{text: text, format: AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT}], options, answer_required);
// }
// export function text_line(line:string): Output_Command {
//     return new Output_Command([{text: line, format: AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT}]);
// }
//
// export function html_line(line:string): Output_Command {
//     return new Output_Command([{text: line, format: AUTOMATA_OUTPUT_OBJECT_FORMAT.HTML}]);
// }
//
// export function html_node(node): Output_Command {
//     return new Output_Command([{text: node, format: AUTOMATA_OUTPUT_OBJECT_FORMAT.HTML_NODE}]);
// }
//
// export function text_as_pages(line:string): Output_Command[] {
//     return [text_line(line)];
// }
//
// export function code_line(line:string): Output_Command {
//     return new Output_Command([{text: line, format: AUTOMATA_OUTPUT_OBJECT_FORMAT.CODE}]);
// }
// export function code_page(line:string): Output_Command[] {
//     return [code_line(line)];
// }
//
// export function text_pages(lines:string[]):Output_Command[] {
//     let param: Output_Command[] = [];
//     for(let line of lines) {
//         param.push(new Output_Command([{text: line, format: AUTOMATA_OUTPUT_OBJECT_FORMAT.TEXT}]));
//     }
//     return param;
// }