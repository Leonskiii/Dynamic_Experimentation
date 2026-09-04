//
// export enum AUTOMATA_OUTPUT_OBJECT_FORMAT {
//     TEXT, CODE, HTML, CODE_IN_HTML,HTML_NODE
// }
//
// export enum AUTOMATA_OUTPUT_WRITER_ACTION {
//     APPEND, OVERWRITE
// }
//
// export enum AUTOMATA_OUTPUT_WRITER_TAGS {
//     STATE, TASK, STAGE, ERROR
// }
//
// export enum AUTOMATA_INPUT_TYPE {
//     TEXT, ALTERNATIVES, NUMBER
// }
//
// export abstract class Automata_IO {
//
//     abstract write(action: AUTOMATA_OUTPUT_WRITER_ACTION, tag: AUTOMATA_OUTPUT_WRITER_TAGS, to_show: Output_Command);
//
// }
//
// export class Simplified_IO extends Automata_IO {
//     output_string: string;
//
//
//     write(action: AUTOMATA_OUTPUT_WRITER_ACTION, tag: AUTOMATA_OUTPUT_WRITER_TAGS, to_show: Output_Command) {
//         if (tag == AUTOMATA_OUTPUT_WRITER_TAGS.STAGE) {
//             if (action == AUTOMATA_OUTPUT_WRITER_ACTION.APPEND) {
//                 this.output_string += to_show.as_raw_string();
//             } else if (action == AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE) {
//                 this.output_string = to_show.as_raw_string();
//             }
//         }
//     }
//
// }
//
// export class Browser_IO extends Automata_IO {
//
//
//     write(action: AUTOMATA_OUTPUT_WRITER_ACTION, tag: AUTOMATA_OUTPUT_WRITER_TAGS, to_show: Output_Command) {
//
//         if(tag==null) {
//             to_show.print_to_html_element(document.body);
//         } else {
//             if (action == AUTOMATA_OUTPUT_WRITER_ACTION.OVERWRITE)
//                 document.getElementById(AUTOMATA_OUTPUT_WRITER_TAGS[tag]).textContent = "";
//
//         // } else {
//             to_show.print_to_html_element(document.getElementById(AUTOMATA_OUTPUT_WRITER_TAGS[tag]));
//         }
//     }
//
// }