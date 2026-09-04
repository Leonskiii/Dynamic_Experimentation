import {integer_partition_function} from "../numeric/integer_partition.js";
import {all_array_combinations} from "../utils/arrays/all_array_combinations.js";
import {is_true} from "../utils/Testing.js";
import {iterate, repeat} from "../utils/loops/loop.js";
import {all_true_false_combinations} from "../numeric/combinatoric.js";

export class Tree {

    content;
    children:Tree[] = [];

    constructor(content, children) {
        this.children = [];
        this.content = content;
        this.children = children;
    }
    clone() {
        let child_clones = [];
        for (let child of this.children) {
            child_clones.push((child!==null)?child.clone():null);
        }
        return new Tree(this.content, child_clones);
    }

    preorder(f):void {
        f(this);
        for (let child of this.children) {
            if(child !== null)
                child.preorder(f);
        }
    }

    postorder(f):void {
        for (let t of this.children) {
            t.postorder(f);
        }
        f(this);
    }

    distance_SH01(source, target):number {
        if(this == source)
            return this.left_distance_SH01(target) - 1;

        if(this == target)
            return this.right_distance_SH01(source) - 1;

        let source_child = null;
        let target_child = null;

        let distance = 1;

        for(let c of this.children) {
            if(c.contains_node(source))
                source_child = c;
            if(c.contains_node(target))
                target_child = c;
        }

        if(source_child===null || target_child===null)
            throw "should not be";

        if(source_child===target_child)
            return source_child.distance_SH01(source, target);

        let inner_nodes = this.children.slice(this.children.indexOf(source_child)+1, this.children.indexOf(target_child)-1);

        for(let n of inner_nodes) {
            distance += n.number_of_nodes();
        }

        distance += source_child.right_distance_SH01(source);
        distance += target_child.left_distance_SH01(target);

        return distance;

    }

    right_distance_SH01(node):number {
        let relevant_child = null;
        let right_distance = 1;

        if (node===this)
            return 0;

        for(let c of this.children) {
            if(c.contains_node(node)) {
                relevant_child = c;
                break;
            }
        }

        if (relevant_child===null)
            throw "should not be";

        let right_trees = this.children.slice(this.children.indexOf(relevant_child) + 1);

        for(let r of right_trees) {
            right_distance += r.number_of_nodes();
        }

        right_distance += relevant_child.right_distance_SH01(node);
        return right_distance;
    }

    left_distance_SH01(node):number {
        let relevant_child = null;
        let left_distance = 1;

        if (node===this)
            return 0;

        for(let c of this.children) {
            if(c.contains_node(node)) {
                relevant_child = c;
                break;
            }
        }

        if (relevant_child===null)
            throw "should not be";
        let relevant_child_index = this.children.indexOf(relevant_child);
        let left_trees = this.children.slice(0, relevant_child_index);

        for(let l of left_trees) {
            left_distance += l.number_of_nodes();
        }

        left_distance += relevant_child.left_distance_SH01(node);
        return left_distance;
    }

    path_length_from_this(n):number {

        if(this===n) return 0;

        let distance = 0;
        for(let c of this.children) {
            let d = c.path_length_from_this(n);
            if(d>0)
                return d + 1;
        }

        return -1;

    }

    number_of_nodes():number {

        let number = 1

        for(let c of this.children) {
            number += c.number_of_nodes();
        }

        return number;

    }


    contains_node(n) {
        if(this===n)
            return true;
        else {
            for(let c of this.children) {
                if(c.contains_node(n))
                    return true;
            }
        }
        return false;
    }

}

export function generate_flat_trees(number_of_children) {

    let ret = new Tree(null, []);
    repeat(
            number_of_children - 1,
                        (counter) => {
                                        ret.children.push(new Tree(null, []))
            });

    return  [ret];
}

export function generate_binary_trees(number_of_nodes:number): Tree[] {
    let all_bin_trees_of_length = [];
    all_bin_trees_of_length.push([null]);                   // 0
    all_bin_trees_of_length.push([new Tree(null, [])]); // 1

    for(let new_all_bin_trees_position = 2; new_all_bin_trees_position <= number_of_nodes; new_all_bin_trees_position++) {
        let new_trees = [];
        for(let left_right_counter=0; left_right_counter<all_bin_trees_of_length.length; left_right_counter++) {
            let left_children = all_bin_trees_of_length[left_right_counter];
            let right_children = all_bin_trees_of_length[all_bin_trees_of_length.length - left_right_counter - 1];

            all_array_combinations([left_children, right_children], combination=> {
                let new_tree = new Tree(null, [combination[0], combination[1]]);
                new_trees.push(new_tree);
            });
        }
        all_bin_trees_of_length.push(new_trees);
    }

    return all_bin_trees_of_length[number_of_nodes];
}

export function all_true_false_binary_trees(number_of_tree_nodes:number) {
    let all_binary_trees                                = generate_binary_trees(
        number_of_tree_nodes
    );

    let number_of_true_false_combinations               = Math.pow(
        2,
        number_of_tree_nodes
    ) - 1;

    let all_true_false_combinations_array:boolean[][]    = all_true_false_combinations(
        number_of_true_false_combinations
    );

    let all_true_false_trees                = [];


    iterate(all_binary_trees)
        .do((tree:Tree) => {
            for(let true_false_combination of all_true_false_combinations_array) {
                let cloned_tree = tree.clone();
                let binary_array_position = 0;
                cloned_tree.preorder((root:Tree) => {
                    root.content = true_false_combination[binary_array_position++];
                    let this_strange_tree = cloned_tree;
                });
                all_true_false_trees.push(cloned_tree);
            }
        });

    return all_true_false_trees;
}

export function generate_trees(number_of_nodes):Tree[] {
    if (number_of_nodes == 1) {
        return [new Tree(null, [])];
    }
    let ret = [];
    let partitions = integer_partition_function(number_of_nodes - 1);
    for (let p of partitions) {
        let this_partition = [];
        for (let child of p) {
            this_partition.push(generate_trees(child));
        }
        all_array_combinations(
            this_partition,
            e => {
                        let children = [];
                        e.forEach(t => children.push(t.clone()));
                ret.push(new Tree(null, children));
                // ret.push(children);
                    }
        );
    }
    return ret;
}

function t(children=[]) {
    return new Tree(null, children);
}

function test_distance_SH01(debug) {

    let source = new Tree("source", []);
    let target = new Tree("target", []);
    let distance = -1;
    let tree =  null;

    tree = t([
        t([t(), t(), t()]),
        t([t(), t([source, target]), t()])
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 1, "distance = 1", debug);


    tree = t([
        t([t(), t([source, target]), t()]),
        t([t(), t(), t()])
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 1, "distance = 1", debug);

    tree = t([
        t([t(), t([source]), t()]),
        t([t(), t(), target, t()])
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 7, "distance = 7", debug);

    tree = t([
        t([t(), t([source]), t()]),
        t([t(), target, t()])
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 6, "distance = 6", debug);

    tree = t([
        t([t(), source, t()]),
        t([t(), t(), target, t()])
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 6, "distance = 6", debug);

    tree = t([
        t([source, t()]),
        t([t(), target, t()])
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 5, "distance = 5", debug);

    tree = t([
        t([source, t()]),
        t([t(), target])
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 5, "distance = 5", debug);

    tree = t([
        t([source, t()]),
        t([target])
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 4, "distance = 4", debug);

    tree = source.clone();
    tree.children = [target];
    distance = tree.distance_SH01(tree, target);
    is_true(distance==0, "distance = 0 (source==root)", debug);

    tree =  target.clone();
    tree.children = [source];
    distance = tree.distance_SH01(source, tree);
    is_true(distance==0, "distance = 0 (target==root)", debug);

    /*
          / \ = 1
         s   t              */
    tree = t([
        source,
        target
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance==1, "distance = 1", debug);

    /*
          / \
         /   t = 3
        s              */
    tree = t([
        t([source]),
        target
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance ==2, "distance = 2", debug);

    tree = t([
        t([source, t()]),
        target
    ]);
    distance = tree.distance_SH01(source, target);
    is_true(distance == 3, "distance = 3", debug);




}

let a = [1, 2];
let b = a.slice(0,1);

test_distance_SH01(true);
