// modules import

const path = require('path');
const { mkdir, copyFile } = require('fs/promises');
const fs = require('fs');

(async function copyDir() {
    try {
        // create file-copy if isn't exist// fsPromises/mkdir {recursive: }
        mkdir(path.join(__dirname, 'files-copy'), { recursive: true });

        // files  content read
        fs.readdir(path.join(__dirname, 'files'), { withFileTypes: true}, (err, files) => {
            for (const file of files) {      
                // console.log(file.name);     
                if (!file.isDirectory()) {      
                    // copy files
                    copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name));
                    // console.log('Copy file');
                } else if (file.isDirectory()) {
                    mkdir(path.join(__dirname, 'files-copy', file.name), { recursive: true });
                    // console.log('Copy directory');
                }
            }
            // console.log('files into: ', files);
        });
    } catch {
        console.log('not copied')
    }
})();