/**
 * get absolute mouse position
 * @param {MouseEvent} event 
 */
export function getMousePos(event: any) {
    let posx: number = 0;
    let posy: number = 0;
    if (!event) event = window.event;
    if (event.clientX || event.clientY) {
        posx = event.clientX + document.getElementById('editor_area').scrollLeft;
        posy = event.clientY + document.getElementById('editor_area').scrollTop;
    }
    return { x: posx, y: posy }
};

/**
 * get element id from posx, posy
 * @param {number} posx 
 * @param {number} posy 
 */
export function getClickedElementId(posx: number, posy: number) {
    let elem_height: number = 1;
    let sum_elem_height: number = 1;
    let result_id: string = "";
    let child_nodes: HTMLCollection = document.getElementById("d" + String(posx) + "_area").children;
    Array.prototype.forEach.call(child_nodes, (value: HTMLElement) => {
        let value_id: string = value.id.split("_")[1];
        if (value_id != "name" && typeof value_id != "undefined") {
            elem_height = Math.round(Number(value.style.height.split("px")[0]) / 25);
            if (sum_elem_height <= posy && posy < sum_elem_height + elem_height) {
                result_id = "d" + String(posx) + "_" + value_id;
            }
            sum_elem_height += elem_height;
        }
    });
    return result_id;
};

/**
 * get element using clicked position
 * @param {MouseEvent} event 
 * @param {HTMLElement} selected_elem 
 */
export function getClickedElement(event: any, selected_elem: HTMLElement) {
    let json_pos: { x: number, y: number } = getMousePos(event);
    let elem_posx: number = Math.floor(json_pos["x"] / 200);
    let elem_posy: number = Math.floor(json_pos["y"] / 25);
    let elem: HTMLElement = document.getElementById(getClickedElementId(elem_posx, elem_posy));
    elem.style.height = String(Number(elem.style.height.split("px")[0]) - 1) + "px";
    elem.style.borderTop = "1px solid red";
    elem.style.borderColor = "red";
    if (selected_elem != null && elem != selected_elem) {
        selected_elem.style.height = String(Number(selected_elem.style.height.split("px")[0]) + 1) + "px";
        selected_elem.style.borderTop = "none";
        selected_elem.style.borderColor = "black";
    }
    return elem;
};