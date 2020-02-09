const fs = require('fs');
const csv = require('csv');
const csv_parser = require('csv-parse/lib/sync');

/**
 * output csv file from csv_array
 * @param {string[][]} csv_array 
 */
export function output_csv(csv_array: string[][]) {
    csv.stringify(csv_array, (error: any, output: any) => {
        fs.writeFile('TaskArray.csv', output, (error: any) => {
            console.log("処理データをCSV出力しました。");
        });
    });
};

/**
 * load csv file and return csv_data_parsed
 */
export function load_csv() {
    let csv_data: string = fs.readFileSync("TaskArray.csv", 'utf-8');
    let csv_data_parsed: string[][] = csv_parser(csv_data);
    return csv_data_parsed
};
