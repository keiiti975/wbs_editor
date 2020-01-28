import { BrowserWindow } from "electron";
import { Tree_Node } from "./tree";
import path = require("path");

/**
 * create inputWindow
 * @param {Electron.BrowserWindow} inputWindow
 */
export function initInputWindow(inputWindow: Electron.BrowserWindow, width: number, height: number) {
    inputWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: width,
        height: height
    });
    // vanish menu
    inputWindow.setMenu(null);

    inputWindow.loadFile(path.join(path.dirname(__dirname), "src", 'input.html'));
    return inputWindow;
};

/**
 * increment id below selected element
 * @param {HTMLElement} selected_elem 
 */
export function increment_id_below_selected_element(selected_elem: HTMLElement) {
    let selected_id: number = Number(selected_elem.id.split("_")[1]);
    let child_nodes: HTMLCollection = selected_elem.parentNode.children;
    Array.prototype.forEach.call(child_nodes, (value: HTMLElement) => {
        let value_depth: string = value.id.split("_")[0];
        let value_id: string | number = value.id.split("_")[1];
        if (value_id != "name") {
            value_id = Number(value_id);
            if (selected_id <= value_id) {
                value.id = value_depth + "_" + String(value_id + 1);
            }
        }
    });
};

/**
 * initialize editor_area
 */
export function init_editor_area() {
    let child_nodes: HTMLCollection = document.getElementById("editor_area").children;
    let child_ids: Array<string> = [];
    Array.prototype.forEach.call(child_nodes, (value: HTMLElement) => {
        child_ids.push(value.id);
    });
    child_ids.forEach((value) => { document.getElementById(value).remove() });
};

/**
 * generate html from depth, id, name of node
 * @param {number} node_depth 
 * @param {string | number} node_id 
 * @param {string} node_name 
 */
export function generate_html(node_depth: number, node_id: string | number, node_name: string = null) {
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
export function generate_id(node_depth: number, node_id: string | number) {
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
export function generate_class(node_id: string | number) {
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
export function tree2html(tree: Tree_Node) {
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
export function adjustElement(tree: Tree_Node) {
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
        if (node.progress == 1) {
            elem.style.backgroundColor = "orange";
        } else if (node.progress == 2) {
            elem.style.backgroundColor = "lime";
        }
        queue = queue.concat(node.childrenArray);
        elem_counter += 1;
        before_node = node;
    }
};