/**
 * get element using clicked position
 * @param {string} clicked_id
 * @param {HTMLElement} selected_elem 
 */
export function getClickedElement(clicked_id: string, selected_elem: HTMLElement) {
    let elem: HTMLElement = document.getElementById(clicked_id);
    //console.log(elem.style.height);
    if (selected_elem != null && elem != selected_elem) {
        elem.style.height = String(Number(elem.style.height.split("px")[0]) - 1) + "px";
        elem.style.borderTop = "1px solid red";
        elem.style.borderColor = "red";
        selected_elem.style.height = String(Number(selected_elem.style.height.split("px")[0]) + 1) + "px";
        selected_elem.style.borderTop = "none";
        selected_elem.style.borderColor = "black";
    } else if (selected_elem == null && elem != selected_elem) {
        elem.style.height = String(Number(elem.style.height.split("px")[0]) - 1) + "px";
        elem.style.borderTop = "1px solid red";
        elem.style.borderColor = "red";
    }
    return elem;
};