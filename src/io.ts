const fs = require('fs');

/**
 * output csv file from csv_array
 * @param {string} csv_array 
 */
export function output_csv(csv_array: string) {
    fs.writeFile("TaskArray.csv", csv_array, (err: string) => {
        if (err) {
            throw err;
        }
    });
};