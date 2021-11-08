// 1. import required modules
const fs = require('fs');
const path = require('path');
// const { readdir } = require('fs/promises');

(async function () {
    try {
// 2. read folder content
        fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true}, (err, files) => {
// 3. collect folder objects data
            for (const file of files) {      
// 4. file checking  
                if (!file.isDirectory()) {           
                    fs.stat(path.join(path.join(__dirname, 'secret-folder'), file.name), (err, stats) => {
// 5. console output
                        console.log(`${file.name.split('.')[0]} - ${path.extname(file.name).slice(1)} - ${stats.size}b`);
                    }); 
                }   
            }
        });
    } catch (err) {
        console.log(err);
    }
})();