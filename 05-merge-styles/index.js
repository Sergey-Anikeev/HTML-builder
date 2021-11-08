// 1. modeles import
const fs = require('fs');
const path = require('path');

(async function createGeneralCss() {
    try {
        fs.rm(path.join(__dirname, 'project-dist/bundle.css'), { force: true }, function (err) {
            if (err) throw err;
        }); 
// 2. folder styles content reading
        fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true}, (err, files) => {
            for (const file of files) {   
// 3. isFile & object extention check     
                if (!file.isDirectory() && path.extname(file.name).slice(1) === 'css') { 
// 4. styles file reading 
                    fs.readFile(path.join(__dirname, 'styles', file.name), 'utf8', (err, data) => {
                        if (err) throw err;
// 5. writing data to array
// 6. writing styles array to bundle.css file
                        fs.writeFile(path.join(__dirname, 'project-dist/bundle.css'), data, 
                                        { flag: 'a+' }, function (err) {
                            if (err) throw err;
                        });
                    });  
                }
            }
        });
    } catch(err) {
        console.log(err);
    }
})();