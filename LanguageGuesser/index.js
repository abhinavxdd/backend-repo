const franc = require('franc');
const langs = require('langs');
const colors = require('colors');

const input = process.argv[2];

const LangCode = franc(input);

if(LangCode === 'und'){
    console.log("Can't guess the language, Sorry!!".red)
}
const language = langs.where("3", LangCode);
console.log(`I guess it is : ${language.name.green}`);