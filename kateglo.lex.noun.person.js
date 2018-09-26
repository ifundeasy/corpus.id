const fs = require('fs');
const kategloargs = require('./kateglo.args');
const datadir = './kateglo.data/';
const rawdir = './kateglo/';
const datafiles = {};
const lexicons = {};
const idx = {}

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
        if (desc === 'root') {
        	for (let t in tags) {
        		if (t === 'n') {
                    tags[t].forEach(function(tag){
                        let clues = 'sebutan,sapaan,panggilan,nama,saudara,kandung,kerabat,keluarga,gelar,orang,dia,binatang,makhluk,tokoh,tubuh'
                        clues.split(',').forEach(function(clue){
                            if (tag.text.split(/\s/g).indexOf(clue) > -1) {
                                if (text.length > 1) idx[text.toLowerCase()] = text
                            }
                        })
                    })
        		} else if (text.indexOf('or') == text.length - 2) {
                    if (text.length > 1) idx[text.toLowerCase()] = text
                }
        	}
        }

    }
});

let file = datadir + 'lexicon.noun.person.txt';
fs.writeFileSync(file, Object.keys(idx).sort().map(function(el){
	return idx[el]
}).join('\n'))

console.log('Done. There are about', Object.keys(idx).length + ' words collected in ' + file);