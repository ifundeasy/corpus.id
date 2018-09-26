const alphabets = {
    is: 'alphabet',
    key: 'idx',
    values: `-qwertyuiopasdfghjklzxcvbnm`.split('').map(function (val) {
        return {desc: 'Alphabet', val}
    })
};
const lexicons = {
    is: 'lexicon',
    key: 'lex',
    values: [
        {desc: 'Noun', val: 'n'}, //kata benda: nomina
        {desc: 'Verb', val: 'v'}, //kata kerja: verba
        {desc: 'Adjective', val: 'adj'}, //kata sifat
        {desc: 'Adverb', val: 'adv'}, //kata keterangan
        {desc: 'Pronoun', val: 'pron'}, //kata ganti: pronomina
        {desc: 'Numeral', val: 'num'}, //numeralia
        {desc: 'Preposition', val: 'pre'}, //kata depan: preposisi
        {desc: 'Interjection', val: 'i'}, //kata seru: interjeksi
        {desc: 'Conjunction', val: 'k'}, //kata sambung
        {desc: 'Bounded form', val: 'bt'}, //kata dg bentuk terikat
        {desc: 'Other', val: 'l'} //kata sebagai partikel lain
    ]
};
const types = {
    is: 'type',
    key: 'type',
    values: [
        {desc: 'Affix', val: 'a'}, //kata imbuhan
        {desc: 'Root', val: 'r'}, //kata dasar
        {desc: 'Derivative', val: 'd'} //kata turunan
    ]
};
module.exports = {alphabets, lexicons, types}