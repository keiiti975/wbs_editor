const fs = require('fs');

/**
 * output json file from json_form
 * @param { "name": string, "childrenArray": any } json_form 
 */
export function outputJSON(json_form: { "name": string, "childrenArray": any }) {
    fs.writeFile("TaskTree.json", JSON.stringify(json_form), (err: string) => {
        if (err) {
            throw err;
        }
    });
};

/**
 * load json file and return json_string
 */
export function loadJSON() {
    let json_string: string = fs.readFileSync("TaskTree.json", "utf-8");
    return JSON.parse(json_string);
};