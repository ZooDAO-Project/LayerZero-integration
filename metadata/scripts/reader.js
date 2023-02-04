"use strict";
exports.__esModule = true;
var console_1 = require("console");
var fs = require("fs");
function readFiles(dirname, onFileContent, onError) {
    var data = [];
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function (filename) {
            fs.readFile(dirname + filename, 'utf-8', function (err, content) {
                if (err) {
                    onError(err);
                    return;
                }
                var card = onFileContent(filename, content);
                data.push(card);
            });
        });
    });
    (0, console_1.log)(data);
    return data;
}
var onErr = function (err) { return (0, console_1.log)('Error in reading:', err); };
var onFileContent = function (filename, content) {
    var dataArr = filename.split('_');
    var id = dataArr[0], type = dataArr[2], rarity = dataArr[3], name = dataArr[4];
    var card = {
        id: Number(id),
        type: type,
        rarity: rarity,
        name: name.split('.')[0]
    };
    (0, console_1.log)(JSON.stringify(card));
};
var cards = readFiles('./metadata/assets/', onFileContent, onErr);
fs.writeFile('./metadata/attributes.json', JSON.stringify(cards), { flag: 'w+' }, onErr);
