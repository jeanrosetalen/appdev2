const fs = require('fs');

const fileName = 'reflection.txt';

async function readFileAsync() {
    try {
        const data = await fs.promises.readFile(fileName, 'utf8');
        console.log('File Contents:\n', data);
    } catch (err) {
        console.error('Error reading file:', err.message);
    }
}

readFileAsync();


