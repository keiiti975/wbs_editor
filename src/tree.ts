/**
 * Node of Task Tree
 */
export class Tree_Node {
    name: string;
    progress: number; // 0: not_started, 1: in_progress, 2: done
    depth: number;
    id: number;
    parent: Tree_Node;
    childrenArray: Tree_Node[];

    /**
     * constructor
     * @param {string} nodeName
     */
    constructor(nodeName: string, nodeProgress: number = 0) {
        this.name = nodeName;
        this.progress = nodeProgress;
        this.depth = 0;
        this.id = 1;
        this.parent = null;
        this.childrenArray = [];
    };

    /**
     * add children node to this node
     * @param {Tree_Node} childnode
     */
    addchild(childnode: Tree_Node) {
        this.childrenArray.push(childnode);
        childnode.depth = this.depth + 1;
        childnode.id = this.childrenArray.length;
        childnode.parent = this;
    };

    deletechild(childnode: Tree_Node) {
        let before_childrenArray = this.childrenArray;
        this.childrenArray = [];
        Array.prototype.forEach.call(before_childrenArray, (value: Tree_Node) => {
            if (value.name != childnode.name) {
                this.addchild(new Tree_Node(value.name, value.progress));
            }
        });
    };

    /**
     * count leaf node from this node
     */
    countleaf() {
        let count: number = 0;
        Array.prototype.forEach.call(this.childrenArray, (node: Tree_Node) => {
            if (node.childrenArray.length == 0) {
                count += 1;
            } else {
                count += node.countleaf();
            }
        });
        return count;
    };
};

/**
 * visualize task tree
 * @param {Tree_Node} tree
 */
export function visualize_tree(tree: Tree_Node) {
    let queue: Tree_Node[] = [tree];
    let node: Tree_Node = null;
    while (queue.length > 0) {
        node = queue.shift();
        console.log("name: " + node.name + " progress: " + node.progress);
        queue = queue.concat(node.childrenArray);
    }
};

/**
 * make sample Task Tree
 */
export function makeSampleTree() {
    const root: Tree_Node = new Tree_Node('Root');

    const group_A: Tree_Node = new Tree_Node('GROUP_A');
    const group_B: Tree_Node = new Tree_Node('GROUP_B');

    root.addchild(group_A);
    root.addchild(group_B);

    const group_A_1: Tree_Node = new Tree_Node('GROUP_A_1');
    const group_A_2: Tree_Node = new Tree_Node('GROUP_A_2');
    const group_A_3: Tree_Node = new Tree_Node('GROUP_A_3');
    const group_A_4: Tree_Node = new Tree_Node('GROUP_A_4');
    const group_A_5: Tree_Node = new Tree_Node('GROUP_A_5');

    group_A.addchild(group_A_1);
    group_A.addchild(group_A_2);
    group_A.addchild(group_A_3);
    group_A.addchild(group_A_4);
    group_A.addchild(group_A_5);
    return root;
};

/**
 * initialize Task Tree
 */
export function initTree() {
    const root: Tree_Node = new Tree_Node('Root');
    return root;
};

/**
 * search node in tree using name, depth
 * @param {Tree_Node} tree 
 * @param {string} elem_name 
 * @param {number} elem_depth 
 */
export function search_node(tree: Tree_Node, elem_name: string, elem_depth: number) {
    let queue: Tree_Node[] = [tree];
    let node: Tree_Node = null;
    while (queue.length > 0) {
        node = queue.shift();
        if (node.name == elem_name && node.depth == elem_depth) {
            break;
        }
        queue = queue.concat(node.childrenArray);
    }
    return node;
};

/**
 * search greatest depth of tree
 * @param {Tree_Node} tree 
 */
export function search_max_depth(tree: Tree_Node) {
    let max_depth: number = 0;
    let queue: Tree_Node[] = [tree];
    let node: Tree_Node = null;
    while (queue.length > 0) {
        node = queue.shift();
        if (node.depth > max_depth) {
            max_depth = node.depth;
        }
        queue = queue.concat(node.childrenArray);
    }
    return max_depth;
};

/**
 * insert task node
 * @param {Tree_Node} tree 
 * @param {string} elem_name
 * @param {number} elem_depth
 * @param {string} task_name
 * @param {number} task_progress
 * @param {boolean} mode_complement
 */
export function insert_task(tree: Tree_Node, elem_name: string, elem_depth: number, task_name: string, task_progress: number, mode_complement: boolean = false) {
    let selected_node: Tree_Node = search_node(tree, elem_name, elem_depth);
    if (selected_node.name == "" && mode_complement == false) {
        selected_node.name = task_name;
        selected_node.progress = task_progress;
    } else if (selected_node.childrenArray.length == 1 && selected_node.childrenArray[0].name == "") {
        let child_node = selected_node.childrenArray[0];
        child_node.name = task_name;
        child_node.progress = task_progress;
        selected_node.childrenArray = [child_node];
    } else {
        const new_task_node: Tree_Node = new Tree_Node(task_name, task_progress);
        selected_node.addchild(new_task_node);
    }
};

/**
 * correct task node
 * @param {Tree_Node} tree 
 * @param {string} elem_name
 * @param {number} elem_depth
 * @param {string} task_name 
 * @param {number} task_progress
 */
export function correct_task(tree: Tree_Node, elem_name: string, elem_depth: number, task_name: string, task_progress: number) {
    let selected_node: Tree_Node = search_node(tree, elem_name, elem_depth);
    selected_node.name = task_name;
    selected_node.progress = task_progress;
};

/**
 * delete task node
 * @param {Tree_Node} tree 
 * @param {string} elem_name 
 * @param {number} elem_depth 
 */
export function delete_task(tree: Tree_Node, elem_name: string, elem_depth: number) {
    let selected_node: Tree_Node = search_node(tree, elem_name, elem_depth);
    if (selected_node.childrenArray.length > 0) {
        alert("選択されたタスクの下にタスクがあります");
        /* TODO */
    } else {
        selected_node.parent.deletechild(selected_node);
    }
};

/**
 * complement empty element with tree
 * @param {Tree_Node} tree 
 */
export function complementEmptyElement(tree: Tree_Node) {
    let max_depth: number = search_max_depth(tree);
    let queue: Tree_Node[] = [tree];
    let node: Tree_Node = null;
    let leaves_parent: Tree_Node[] = [];
    let leaves_empty_flag: boolean = true;
    while (queue.length > 0) {
        node = queue.shift();
        if (node.depth < max_depth && node.childrenArray.length == 0) {
            insert_task(tree, node.name, node.depth, "", 0, true);
        }
        if (node.depth == max_depth - 1) {
            leaves_parent.push(node);
        } else if (node.depth == max_depth && node.name != "") {
            leaves_empty_flag = false;
        }
        queue = queue.concat(node.childrenArray);
    }
    if (leaves_empty_flag == true) {
        Array.prototype.forEach.call(leaves_parent, (value: Tree_Node) => {
            value.childrenArray = [];
        });
    }
};

/**
 * generate json with tree
 * @param {Tree_Node} tree
 */
export function tree2json(tree: Tree_Node) {
    let json_tree: { "name": string, "childrenArray": any }[] = [];
    Array.prototype.forEach.call(tree.childrenArray, (value: Tree_Node) => {
        json_tree.push(tree2json(value));
    });
    if (tree.childrenArray.length == 0) {
        return { "name": tree.name, "childrenArray": [] };
    } else {
        return { "name": tree.name, "childrenArray": json_tree };
    }
};

/**
 * generate tree from json_data
 * @param { "name": string, "childrenArray": any } json_data 
 */
export function json2tree(json_data: { "name": string, "childrenArray": any }) {
    let root: Tree_Node = new Tree_Node(json_data["name"]);
    let queue: Tree_Node[] = [root];
    let node: Tree_Node = null;
    let json_queue: { "name": string, "childrenArray": any }[] = [json_data];
    let current_json: { "name": string, "childrenArray": any } = null;
    while (queue.length > 0) {
        node = queue.shift();
        current_json = json_queue.shift();
        Array.prototype.forEach.call(current_json["childrenArray"], (value: { "name": string, "childrenArray": any }) => {
            let child_node: Tree_Node = new Tree_Node(value["name"]);
            node.addchild(child_node);
            queue = queue.concat([child_node]);
        });
        json_queue = json_queue.concat(current_json["childrenArray"]);
    }
    return root;
};