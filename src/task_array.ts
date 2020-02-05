/**
 * Task_Array
 */
export class Task_Array {
    task_array: string[][];

    /**
     * initializer
     */
    constructor() {
        this.task_array = [["Root"]];
    };

    /**
     * add vertical axis
     * @param {number} selected_w 
     */
    add_w_axis(selected_w: number) {
        let array_width: number = this.task_array[0].length;
        let array_height: number = this.task_array.length;
        let array_slice1: string[] = null;
        let array_slice2: string[] = null;
        for (let i = 0; i < array_height; i++) {
            if (selected_w < 0 || array_width < selected_w) {
                console.log("error in add_w_axis");
                break;
            }

            if (selected_w == 0) {
                array_slice1 = new Array(1).fill("null");
                this.task_array[i] = array_slice1.concat(this.task_array[i]);
            } else if (selected_w == array_width) {
                array_slice1 = new Array(1).fill("null");
                this.task_array[i] = this.task_array[i].concat(array_slice1);
            } else {
                array_slice1 = this.task_array[i].slice(0, selected_w);
                array_slice2 = this.task_array[i].slice(selected_w);
                this.task_array[i] = array_slice1.concat(["null"]).concat(array_slice2);
            }
        }
    };

    /**
     * add horizontal axis
     * @param {number} selected_h
     */
    add_h_axis(selected_h: number) {
        let array_width: number = this.task_array[0].length;
        let array_height: number = this.task_array.length;
        let array_slice1: string[][] = null;
        let array_slice2: string[][] = null;
        let new_axis: string[] = null;
        if (selected_h < 0 || array_height < selected_h) {
            console.log("error in add_h_axis");
        } else {
            if (selected_h == 0) {
                new_axis = new Array(array_width).fill("null");
                this.task_array = [new_axis].concat(this.task_array);
            } else if (selected_h == array_height) {
                new_axis = new Array(array_width).fill("null");
                this.task_array = this.task_array.concat([new_axis]);
            } else {
                new_axis = new Array(array_width).fill("null");
                array_slice1 = this.task_array.slice(0, selected_h);
                array_slice2 = this.task_array.slice(selected_h);
                this.task_array = array_slice1.concat([new_axis]).concat(array_slice2);
            }
        }
    };

    /**
     * set task to task_array
     * @param {number} w 
     * @param {number} h 
     * @param {string} task 
     */
    set_task(w: number, h: number, task: string) {
        let h_viewed_from_array: number = 0;
        if (0 <= w && 0 <= h && w < this.task_array[0].length && h < this.task_array.length) {
            h_viewed_from_array = get_h_viewed_from_array(this.task_array, w, h);
            this.task_array[h_viewed_from_array][w] = task;
        } else {
            console.log("error in set_task");
        }
    };

    /**
     * get task from task_array
     * @param {number} w 
     * @param {number} h 
     * @param {string} task 
     */
    get_task(w: number, h: number) {
        let h_viewed_from_array: number = 0;
        if (0 <= w && 0 <= h && w < this.task_array[0].length && h < this.task_array.length) {
            h_viewed_from_array = get_h_viewed_from_array(this.task_array, w, h);
            return this.task_array[h_viewed_from_array][w];
        } else {
            console.log("error in get_task");
        }
    };

    /**
     * add child task to task_array
     * @param {number} w 
     * @param {number} h 
     * @param {string} task 
     */
    add_child(w: number, h: number, task: string) {
        if (0 <= w && 0 <= h && w < this.task_array[0].length && h < this.task_array.length) {
            if (w + 1 >= this.task_array[0].length) this.add_w_axis(w + 1);
            h = get_h_viewed_from_array(this.task_array, w, h);
            if (this.task_array[h][w + 1] == "null") {
                // add child task when w + 1 is "null"
                this.task_array[h][w + 1] = task;
            } else {
                // add child task when w + 1 is not "null"
                while (h < this.task_array.length) {
                    if (h == this.task_array.length - 1) {
                        this.add_h_axis(h + 1);
                        this.task_array[h + 1][w + 1] = task;
                        break;
                    } else {
                        h += 1;
                        if (this.task_array[h][w] != "null") {
                            this.add_h_axis(h);
                            this.task_array[h][w + 1] = task;
                            break;
                        }
                    }
                }
            }
        } else {
            console.log("error in add_child");
        }
    };

    /**
     * display task_array
     */
    display() {
        this.task_array.forEach((val) => {
            console.log(val)
        });
    };
}

/**
 * get h viewed from array
 * @param {string[][]} task_array 
 * @param {number} w 
 * @param {number} h 
 */
export function get_h_viewed_from_array(task_array: string[][], w: number, h: number) {
    let smaller_id_null_flag = true;
    let h_viewed_from_array: number = 0;
    let h_viewed_from_window: number = 0;
    for (h_viewed_from_array = 0; h_viewed_from_array < task_array.length; h_viewed_from_array++) {
        if (task_array[h_viewed_from_array][w] != "null") {
            smaller_id_null_flag = false;
            if (h_viewed_from_window == h) break;
            h_viewed_from_window += 1;
        } else if (task_array[h_viewed_from_array][w] == "null" && smaller_id_null_flag == true) {
            h_viewed_from_window += 1;
        }
    }
    return h_viewed_from_array;
};

/**
 * generate csv with task_array
 * @param {string[][]} task_array 
 */
export function array2csv(task_array: string[][]) {
    let pos_comma: string[] = null;
    let pos_new_line: string[] = null;
    let csv_string: string = "";
    for (let i = 0; i < task_array.length; i++) {
        for (let j = 0; j < task_array[0].length; j++) {
            pos_comma = task_array[i][j].match(/,/g);
            pos_new_line = task_array[i][j].match(/\n/g);
            if (pos_comma == null && pos_new_line == null) {
                if (j == task_array[0].length - 1) csv_string += task_array[i][j];
                else csv_string += task_array[i][j] + ",";
            } else {
                if (j == task_array[0].length - 1) csv_string += '"' + task_array[i][j].replace('"', '""') + '"';
                else csv_string += '"' + task_array[i][j].replace('"', '""') + '"' + ",";
            }
        }
        csv_string += "\n";
    }
    return csv_string;
};