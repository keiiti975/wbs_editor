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