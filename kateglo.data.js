const fs = require('fs');
const kategloargs = require('./kateglo.args');
const datadir = './kateglo.data/';
const rawdir = './kateglo/';
const datafiles = {};
const lexicons = {};

console.log('Collecting words, please wait..');

kategloargs.lexicons.values.forEach(function (el) {
    lexicons[el.val] = el.desc.replace(/\s/g, '').toLowerCase()
});
let total = 0;
fs.mkdir(datadir, new Function());
fs.readdirSync(rawdir).forEach(function(file, i){
    if (file.indexOf('.txt') === file.length - 4) {
        let content = JSON.parse(fs.readFileSync(rawdir + file).toString());
        let {param, desc, text, tags} = content;

        let fname0 = `${datadir}all.txt`;
        if (!datafiles[fname0]) {
            fs.writeFileSync(fname0, text + '\n');
            datafiles[fname0] = 1;
        } else {
            total += 1;
            fs.appendFileSync(fname0, text + '\n');
        }

        let fname1 = `${datadir}${param}.${desc.toLowerCase()}.txt`;
        if (!datafiles[fname1]) {
            fs.writeFileSync(fname1, text + '\n');
            datafiles[fname1] = 1;
        } else {
            fs.appendFileSync(fname1, text + '\n');
        }

        let fname2 = `${datadir}alphabet.${text[0].toLowerCase()}.txt`;
        if (!datafiles[fname2]) {
            fs.writeFileSync(fname2, text + '\n');
            datafiles[fname2] = 1;
        } else {
            fs.appendFileSync(fname2, text + '\n');
        }

        for (let tag in tags) {
        	let lextype = lexicons[tag.toLowerCase()];
        	if (lextype) {
	            let fname3 = `${datadir}lexicon.${lextype}.txt`;
	            if (!datafiles[fname3]) {
	                fs.writeFileSync(fname3, text + '\n');
	                datafiles[fname3] = 1;
	            } else {
	                fs.appendFileSync(fname3, text + '\n');
	            }	
        	}
        }

    }
});

console.log('Words grouping has done, please wait for sorting..');

for (let file in datafiles) {
    let content = [];
    let index = {};
    let words = fs.readFileSync(file).toString().split('\n');
    words.forEach(function (word) {
        if (word) index[word.toLowerCase()] = word
    });
    Object.keys(index).sort().forEach(function (key) {
        content.push(index[key])
    });
    fs.writeFileSync(file, content.join('\n'))
}

console.log('Done. There are about', total + ' words collected in ' + datadir + ' folder');