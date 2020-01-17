/**
 * generate html from depth, id, name of node
 * @param {number} node_depth 
 * @param {string | number} node_id 
 * @param {string} node_name 
 */
function generate_html(node_depth: number, node_id: string | number, node_name: string = null) {
    if (node_id == "area") {
        return "<div id=\"" + generate_id(node_depth, node_id) + "\" class=\"" + generate_class(node_id) + "\">\n";
    } else if (node_id == "name") {
        return "<div id=\"" + generate_id(node_depth, node_id) + "\" class=\"" + generate_class(node_id) + "\">深さ" + String(node_depth) + "</div>\n";
    } else if (typeof node_id == "number") {
        return "<div id=\"" + generate_id(node_depth, node_id) + "\" class=\"" + generate_class(node_id) + "\">" + node_name + "</div>\n";
    }
};

/**
 * generate string of id from depth, id of node
 * @param {number} node_depth 
 * @param {string | number} node_id 
 */
function generate_id(node_depth: number, node_id: string | number) {
    if (node_id == "area") {
        return "d" + String(node_depth) + "_area";
    } else if (node_id == "name") {
        return "d" + String(node_depth) + "_name";
    } else if (typeof node_id == "number") {
        return "d" + String(node_depth) + "_" + String(node_id);
    }
};

/**
 * generate string of class from id of node
 * @param {string | number} node_id 
 */
function generate_class(node_id: string | number) {
    if (node_id == "area") {
        return "depth_area";
    } else if (node_id == "name") {
        return "depth_node";
    } else if (typeof node_id == "number") {
        return "task_node";
    }
};

/**
 * generate html from Task Tree
 * @param {Tree_Node} tree 
 */
function tree2html(tree: Tree_Node) {
    let node_counter: number = 1;
    let html_string: string = "";
    let queue: Tree_Node[] = [tree];
    let node: Tree_Node = null;
    let before_node: Tree_Node = null;
    while (queue.length > 0) {
        node = queue.shift();
        if (before_node == null) {
            html_string += generate_html(node.depth, "area");
            html_string += generate_html(node.depth, "name");
        } else if (before_node != null && before_node.depth != node.depth) {
            node_counter = 1;
            html_string += "</div>\n"
            html_string += generate_html(node.depth, "area");
            html_string += generate_html(node.depth, "name");
        }
        html_string += generate_html(node.depth, node_counter, node.name);
        queue = queue.concat(node.childrenArray);
        node_counter += 1;
        before_node = node;
    }
    html_string += "</div>\n";
    return html_string;
};

/**
 * adjust element height with tree
 * @param {Tree_Node} tree 
 */
function adjustElementHeight(tree: Tree_Node) {
    let elem_counter: number = 1;
    let elem_height: number = 25;
    let queue: Tree_Node[] = [tree];
    let node: Tree_Node = null;
    let before_node: Tree_Node = null;
    let elem: HTMLElement = null;
    while (queue.length > 0) {
        node = queue.shift();
        if (before_node != null && before_node.depth != node.depth) {
            elem_counter = 1;
        }
        if (node.countleaf() == 0 || node.countleaf() == 1) {
            elem_height = 24;
        } else {
            elem_height = 25 * (node.countleaf() - 1) + 24;
        }
        elem = document.getElementById("d" + String(node.depth) + "_" + String(elem_counter));
        elem.style.height = String(elem_height) + "px";
        queue = queue.concat(node.childrenArray);
        elem_counter += 1;
        before_node = node;
    }
};