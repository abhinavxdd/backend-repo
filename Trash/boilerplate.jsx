const fs = require('fs');
const folderName = process.argv[2] || 'NewFolder';

try {
    fs.mkdirSync(folderName);
    fs.writeFileSync(`${folderName}/index.html`, '');
    fs.writeFileSync(`${folderName}/app.jsx`, '');
    fs.writeFileSync(`${folderName}/app.css`, '');
} catch (e) {
    console.log("Unfound error!!");
    console.log(e);
}