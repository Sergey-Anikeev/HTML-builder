const { stdin } = require('process');
const path = require('path');
const fs = require('fs');

const stdout = fs.createWriteStream(path.join(__dirname, "response.txt"));

console.log('My regards ...');

stdin.on('data', data => {

    if (data.toString().trimEnd() == 'exit')
        process.exit();
    stdout.write(data);
})

process.on('exit', () => console.log('Удачи в изучении Node.js!'));
process.on('SIGINT', () => process.exit());