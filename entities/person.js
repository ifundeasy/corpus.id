let fs = require('fs');
let content = fs.readFileSync('./persons.raw.txt').toString().replace(/\s{,2}/g).replace(/\n{2,}/g, ' ');
let result = {};
content.split(/\n/g).forEach(function (name) {
    if (name) result[name] = result[name] || 0
    result[name] += 1
});
fs.writeFileSync('./persons.txt', Object.keys(result).sort().join('\n'));