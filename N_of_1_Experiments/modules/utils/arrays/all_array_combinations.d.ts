/**
 *  @param arr: An array of arrays
 *  executes for all combinations of arrays the function f
 */
export declare function all_array_combinations<T>(arr: T[][], f: ((T: any) => any)): void;
/**
 * Examples:
 *   all_x_tupel(1, [1, 2, 3]) = [1, 2, 3]
 *   all_x_tupel(2, [1, 2, 3]) = [[1, 1], [1,2]], [1,3], [2,1]....[3,3]]

 */
export declare function all_x_tupel<T>(tupel_length: number, arr: T[]): T[][];
/**
 * Examples:
 *   all_different_x_tupel(3, [1, 2, 3]) = [[1, 2, 3], [1,3,2], [2,1,3], [2,3,1]. [3,1,2], [3,2,1]]
 *
*/
export declare function all_different_x_tupel<T>(tupel_length: number, arr: T[]): T[][];
