const { fs } = require("fs");


const components = path.join(__dirname, '/components');

let componentData = {};

fs.mkdir(projectDir, { recursive: true }, (err) => {});

fs.copyFile(template, indexHTML, (err, files) => {});

fs.readdir(components, (err, files) => {
    files.forEach((file) => {
        fs.readFile(path.join(components, file), 'utf8', (err, data) => {
            componentData[file.split('.')[0]] = data;
        });
    });
});

const mainHTML = fs.createReadStream(indexHTML, 'utf8');
process.on('beforeExit', () => {
    for (let comp in componentData) {
        replaceData(comp);
    }
});

function replaceData(comp) {
    mainHTML.on('data', (chunk) => {
        let result = chunk.replaceData(`{{${comp}}}`, componentData[comp]);

        fs.writeFile(indexHTML, result, 'utf8', (err) => {
            if (err) 
                console.log(err);
        });
    });
}