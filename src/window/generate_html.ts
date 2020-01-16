function generate_html(node_depth: number, node_id: string | number, node_name: string = null) {
    if (node_id == "area") {
        return "<div id=\"" + generate_id(node_depth, node_id) + "\" class=\"" + generate_class(node_id) + "\">\n";
    } else if (node_id == "name") {
        return "<div id=\"" + generate_id(node_depth, node_id) + "\" class=\"" + generate_class(node_id) + "\">深さ" + String(node_depth) + "</div>\n";
    } else if (typeof node_id == "number") {
        return "<div id=\"" + generate_id(node_depth, node_id) + "\" class=\"" + generate_class(node_id) + "\">" + node_name + "</div>\n";
    }
};

function generate_id(node_depth: number, node_id: string | number) {
    if (node_id == "area") {
        return "d" + String(node_depth) + "_area";
    } else if (node_id == "name") {
        return "d" + String(node_depth) + "_name";
    } else if (typeof node_id == "number") {
        return "d" + String(node_depth) + "_" + String(node_id);
    }
};

function generate_class(node_id: string | number) {
    if (node_id == "area") {
        return "depth_area";
    } else if (node_id == "name") {
        return "depth_node";
    } else if (typeof node_id == "number") {
        return "task_node";
    }
};

function tree2html(tree: Tree_Node) {
    let html_string = "";
    let queue = [tree]
    let count = 1;
    let node = null;
    let before_node = null;
    while (queue.length > 0) {
        node = queue.shift();
        if (before_node == null) {
            html_string += generate_html(node.depth, "area");
            html_string += generate_html(node.depth, "name");
        } else if (before_node != null && before_node.depth != node.depth) {
            count = 1;
            html_string += "</div>\n"
            html_string += generate_html(node.depth, "area");
            html_string += generate_html(node.depth, "name");
        }
        html_string += generate_html(node.depth, count, node.name);
        queue = queue.concat(node.childrenArray);
        count += 1;
        before_node = node;
    }
    html_string += "</div>\n";
    return html_string;
};