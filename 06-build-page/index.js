// 1. modules import
// 2. read and save template-file in variable
// 3. tag's names find in template-file
// 4. replace tags to component-files content
// 5. write modified template-file to destination
// 6. 05-merge-styles task script use
// 7. 04-copy-directory task script use

const fs = require('fs');
const path = require('path');
const { mkdir, copyFile } = require('fs/promises');


const components = path.join(__dirname, 'components');
const projectDist = path.join(__dirname, 'project-dist');
const template = path.join(__dirname, 'template.html');

const componentData = new Map();

(async function () {
    fs.mkdir(projectDist, { recursive: true }, (err) => {});

    fs.copyFile(template, path.join(__dirname, 'project-dist/index.html'), (err, files) => {});

    const indexHTML = path.join(__dirname, 'project-dist/index.html');
    const mainHTML = fs.createReadStream(indexHTML, 'utf8');

    fs.readdir(components, (err, files) => {
        files.forEach((file) => {
            fs.readFile(path.join(components, file), 'utf8', (err, data) => {
                componentData.set(file.split('.')[0], data);  
            });
        });
    });



    fs.rm(path.join(__dirname, 'project-dist/style.css'), { force: true }, function (err) {
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
                    fs.writeFile(path.join(__dirname, 'project-dist/style.css'), data, 
                                    { flag: 'a+' }, function (err) {
                        if (err) throw err;
                    });
                });  
            }
        }
    });

        // create file-copy if isn't exist// fsPromises/mkdir {recursive: }
        mkdir(path.join(projectDist, 'assets'), { recursive: true });

        // files  content read
        fs.readdir(path.join(__dirname, 'assets'), { withFileTypes: true}, (err, files) => {
            // console.log(files.length);
            for (const file of files) {      
                // console.log(file.name);     
                if (!file.isDirectory()) {      
                    // copy files
                    copyFile(path.join(__dirname, 'assets', file.name), path.join(projectDist, 'assets', file.name));
                    // console.log('Copy file');
                } else if (file.isDirectory()) {
                    mkdir(path.join(projectDist, 'assets', file.name), { recursive: true });
                    // console.log('Copy directory');
                    fs.readdir(path.join(__dirname, 'assets', file.name), { withFileTypes: true}, (err, files) => {
                        for (const file of files) {
                            // copyFile(path.join(__dirname, 'assets', file.name), path.join(projectDist, 'assets', file.name));
                        }
                    });
                }
            }
        });    

    process.on('beforeExit', () => {
       
        for (const key of componentData.keys()) {
            
            replaceData(key);
        }
    });

    function replaceData(comp) {
        mainHTML.on('data', (chunk) => {
            let result = chunk.replace(`{{${comp}}}`, componentData.get(comp));

            fs.writeFile(indexHTML, result, (err) => {
                if (err) 
                    console.log(err);
            });
        });
    }

})();






