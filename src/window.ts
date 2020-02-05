import { BrowserWindow } from "electron";
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
 * generate html from depth, id, name of task
 * @param {number} task_depth 
 * @param {string | number} task_id 
 * @param {string} task_name 
 */
export function generate_html(task_depth: number, task_id: string | number, task_name: string = null) {
    if (task_id == "area") {
        return "<div id=\"" + generate_id(task_depth, task_id) + "\" class=\"" + generate_class(task_id) + "\">\n";
    } else if (task_id == "name") {
        return "<div id=\"" + generate_id(task_depth, task_id) + "\" class=\"" + generate_class(task_id) + "\">深さ" + String(task_depth) + "</div>\n";
    } else if (typeof task_id == "number") {
        return "<div id=\"" + generate_id(task_depth, task_id) + "\" class=\"" + generate_class(task_id) + "\">" + task_name + "</div>\n";
    }
};

/**
 * generate string of id from depth, id of task
 * @param {number} task_depth 
 * @param {string | number} task_id 
 */
export function generate_id(task_depth: number, task_id: string | number) {
    if (task_id == "area") {
        return "d" + String(task_depth) + "_area";
    } else if (task_id == "name") {
        return "d" + String(task_depth) + "_name";
    } else if (typeof task_id == "number") {
        return "d" + String(task_depth) + "_" + String(task_id);
    }
};

/**
 * generate string of class from id of tasks
 * @param {string | number} task_id 
 */
export function generate_class(task_id: string | number) {
    if (task_id == "area") {
        return "depth_area";
    } else if (task_id == "name") {
        return "depth_node";
    } else if (typeof task_id == "number") {
        return "task_node";
    }
};

/**
 * generate html from task_array
 * @param {string[][]} task_array 
 */
export function array2html(task_array: string[][]) {
    let before_depth: number = 0;
    let html_string: string = "";
    for (let i = 0; i < task_array[0].length; i++) {
        for (let j = 0; j < task_array.length; j++) {
            if (j == 0 && i == 0) {
                html_string += generate_html(i, "area");
                html_string += generate_html(i, "name");
            } else if (before_depth != i) {
                html_string += "</div>\n"
                html_string += generate_html(i, "area");
                html_string += generate_html(i, "name");
            }
            html_string += generate_html(i, j + 1, task_array[j][i]);
            before_depth = i;
        }
    }
    html_string += "</div>\n";
    return html_string;
};

/**
 * adjust element height with task_array
 * @param {string[][]} task_array
 */
export function adjustElement(task_array: string[][]) {
    let task_counter_per_column: number = 1;
    let elem_block_num: number = 1;
    let elem: HTMLElement = null;
    let current_task_elem: HTMLElement = null;
    for (let i = 0; i < task_array[0].length; i++) {
        for (let j = 0; j < task_array.length; j++) {
            elem = document.getElementById("d" + String(i) + "_" + String(j + 1));
            if (current_task_elem == null && elem.innerHTML == "null") {
                set_element_height(elem, 1);
                task_counter_per_column += 1;
            } else if (current_task_elem == null && elem.innerHTML != "null") {
                current_task_elem = elem;
            } else if (current_task_elem != null && elem.innerHTML == "null") {
                elem_block_num += 1;
                elem.remove();
            } else if (current_task_elem != null && elem.innerHTML != "null") {
                set_element_height(current_task_elem, elem_block_num);
                current_task_elem.id = "d" + String(i) + "_" + String(task_counter_per_column);
                elem_block_num = 1;
                task_counter_per_column += 1;
                current_task_elem = elem;
            }
        }
        if (i < task_array[0].length - 1) {
            set_element_height(current_task_elem, elem_block_num);
            current_task_elem.id = "d" + String(i) + "_" + String(task_counter_per_column);
            elem_block_num = 1;
            task_counter_per_column = 1;
            current_task_elem = null;
        } else {
            set_element_height(current_task_elem, 1);
            current_task_elem.id = "d" + String(i) + "_" + String(task_counter_per_column);
            elem_block_num = 1;
            task_counter_per_column = 1;
            current_task_elem = null;
        }

    }
};

/**
 * set html element height
 * @param {HTMLElement} elem 
 * @param {number} elem_block_num 
 */
export function set_element_height(elem: HTMLElement, elem_block_num: number) {
    let elem_height: number = 0;
    if (elem_block_num == 0 || elem_block_num == 1) {
        elem_height = 24;
    } else {
        elem_height = 25 * (elem_block_num - 1) + 24;
    }
    elem.style.height = String(elem_height) + "px";
}