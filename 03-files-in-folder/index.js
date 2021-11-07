//import required modules
const fs = require('fs');
const path = require('path');
// const { readdir } = require('fs/promises');
// const stats = require('fs');

//read folder content

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true}, (err, files) => {
    for (const file of files) {      
        let fileSize;    
        if (!file.isDirectory()) {           
            fs.stat(path.join(path.join(__dirname, 'secret-folder'), file.name), (err, stats) => {
                fileSize = stats.size;
                // console.log(fileSize);
            });
            console.log(`${file.name.split('.')[0]} - ${path.extname(file.name).slice(1)} - kb`); //${fileSizeArr.at(files.indexOf(file))}
        }   
    }
    // console.log('files into: ', files);
});

// const files = readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true});
// console.log('files into: ', files);

// (async function (pat) {
//     try {
//         const files = await readdir(pat, { withFileTypes: true});
        
//         console.log('files into: ', files);

//         let fileSizeArr = [];
//         console.log('fileSizeArr created: ', fileSizeArr);

//         for (const file of files) {
//             fs.stat(path.join(path.join(__dirname, 'secret-folder'), file.name), (err, stats) => {
//                 if(stats.isFile()) {
//                     fileSizeArr.push(stats.size);
//                     console.log(stats.size);
//                 }
//             });
//         }
//         console.log('fileSizeArr after: ', fileSizeArr);
//     } catch (error) {
//         console.error('there was an error: ', error.message);
//     } 
// })(path.join(__dirname, 'secret-folder'));


// for (const file of files) {          
//     if (!file.isDirectory()) {
//         console.log(`${file.name.split('.')[0]} - ${path.extname(file.name).slice(1)} - ${fileSizeArr.at(files.indexOf(file))}b`);
//     }    
// }


//collect folder objects data

//file checking

//console output