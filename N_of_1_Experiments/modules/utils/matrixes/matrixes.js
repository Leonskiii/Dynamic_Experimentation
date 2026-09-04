import { repeat } from "../loops/loop.js";
export function list_as_first_line_unbalanced_matrix(in_list, num_rows, num_columns) {
    let list = [...in_list];
    let matrix = [];
    repeat(num_rows, row_no => {
        let current_row = [];
        matrix.unshift(current_row);
        repeat(num_columns, column_no => {
            if (list.length > 0) {
                let last_element = list.pop();
                current_row.unshift(last_element);
            }
        });
    });
    return matrix;
}
export function iterate_matrix(matrix, f) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            f(matrix[x][y], x, y);
        }
    }
}
//# sourceMappingURL=matrixes.js.map