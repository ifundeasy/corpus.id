const fs = require('fs');
const kategloargs = require('./kateglo.args');
const datadir = './kateglo.data/';
const rawdir = './kateglo/';
const datafiles = {};
const lexicons = {}, types = {};

console.log('Collecting words, please wait..');

kategloargs.lexicons.values.forEach(function (el) {
    lexicons[el.val] = el.desc.replace(/\s/g, '').toLowerCase()
});
kategloargs.types.values.forEach(function (el) {
    types[el.desc.replace(/\s/g, '').toLowerCase()] = el.val
});
let total = 0;
let detail = Object.keys(lexicons).map(function(val){
    return lexicons[val]
});
let columns = `word,index,type,type_code,lexicons,${detail.join()}`.split(',').map(function (e) {
    return JSON.stringify(e)
}).join();
let t = 0
fs.mkdir(datadir, new Function());
fs.readdirSync(rawdir).forEach(function(file, i){
    if (file.indexOf('.txt') === file.length - 4) {
        let content = JSON.parse(fs.readFileSync(rawdir + file).toString());
        let {param, desc, text, tags} = content;
        let lexlist = [];
        let lexobj = {};

        detail.forEach(function (lex) {
            lexobj[lex] = lexobj[lex] || 0
        });

        let fname0 = `${datadir}${param}.${desc.toLowerCase()}.txt`;
        if (!datafiles[fname0]) {
            fs.writeFileSync(fname0, text + '\n');
            datafiles[fname0] = 1;
        } else {
            fs.appendFileSync(fname0, text + '\n');
        }

        let fname1 = `${datadir}alphabet.${text[0].toLowerCase()}.txt`;
        if (!datafiles[fname1]) {
            fs.writeFileSync(fname1, text + '\n');
            datafiles[fname1] = 1;
        } else {
            fs.appendFileSync(fname1, text + '\n');
        }

        for (let tag in tags) {
        	let lextype = lexicons[tag.toLowerCase()];
        	if (lextype) {
                lexobj[lextype] = 1;
                lexlist.push(lextype);
	            let fname2 = `${datadir}lexicon.${lextype}.txt`;
	            if (!datafiles[fname2]) {
	                fs.writeFileSync(fname2, text + '\n');
	                datafiles[fname2] = 1;
	            } else {
	                fs.appendFileSync(fname2, text + '\n');
	            }
        	}
        }

        let fname3 = `${datadir}all.csv`;
        if (!datafiles[fname3]) {
            fs.writeFileSync(fname3, columns + '\n');
            datafiles[fname3] = 1;
        } else {
            total += 1;
            let data = [
                text,
                text[0].toLowerCase(),
                desc,
                types[desc],
                lexlist.join(),

            ].concat(Object.keys(lexobj).map(function (l) {
                return lexobj[l]
            })).map(function (el) {
                return JSON.stringify(el)
            }).join();
            
            fs.appendFileSync(fname3, data + '\n');
        }
        t += 1
    }
});

console.log('Words grouping has done, please wait for sorting..');

for (let file in datafiles) {
    let content = [];
    let index = {};
    let words = fs.readFileSync(file).toString().split('\n');
    if (file === `${datadir}all.csv`) {
        let cols = words[0]
        words.slice(1).forEach(function (word) {
            let key = word.split('","')
            key = key[0].substr(1)
            if (key) index[key.toLowerCase()] = word
        });
        content.push(cols)
        Object.keys(index).sort().forEach(function (key) {
            content.push(index[key])
        });
    } else {
        words.forEach(function (word) {
            if (word) index[word.toLowerCase()] = word
        });
        Object.keys(index).sort().forEach(function (key) {
            content.push(index[key])
        });
    }
    fs.writeFileSync(file, content.join('\n'))

}

console.log('Done. There are about', total + ' words collected in ' + datadir + ' folder');