export declare class Tree {
    content: any;
    children: Tree[];
    constructor(content: any, children: any);
    clone(): Tree;
    preorder(f: any): void;
    postorder(f: any): void;
    distance_SH01(source: any, target: any): number;
    right_distance_SH01(node: any): number;
    left_distance_SH01(node: any): number;
    path_length_from_this(n: any): number;
    number_of_nodes(): number;
    contains_node(n: any): boolean;
}
export declare function generate_flat_trees(number_of_children: any): Tree[];
export declare function generate_binary_trees(number_of_nodes: number): Tree[];
export declare function all_true_false_binary_trees(number_of_tree_nodes: number): any[];
export declare function generate_trees(number_of_nodes: any): Tree[];
