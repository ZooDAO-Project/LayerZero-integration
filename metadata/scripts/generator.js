"use strict";
exports.__esModule = true;
var attributes = require("../attributes.json");
var fs = require("fs");
var content = 'Some content!';
attributes[0];
fs.writeFile('./metadata/metadata/test.txt', content, function (err) {
    if (err) {
        console.error(err);
    }
    // file written successfully
});
