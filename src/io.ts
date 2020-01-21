const fs = require('fs');

function outputJSON(json_form: { "name": string }) {
    fs.writeFile("TaskTree.json", JSON.stringify(json_form), (err: string) => {
        if (err) {
            console.log('error!', err);
        }
    });
};