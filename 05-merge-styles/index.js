// 1. modeles import

const fs = require('fs');
const path = require('path');

// 2. folder styles content reading

fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true}, (err, files) => {
    for (const file of files) {      
        if (path.extname(file.name).slice(1) === 'css') {           

        }   
    }
});

// 3. isFile & object extention check

// 4. styles file reading

// 5. writing data to array

// 6. writing styles array to bundle.css file