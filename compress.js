const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function compressFiles(directory) {
    const items = fs.readdirSync(directory);

    items.forEach(item => {
        const itemPath = path.join(directory, item);
        const stat = fs.statSync(itemPath);

        // If it's a directory, dive deeper.
        if (stat.isDirectory()) {
            compressFiles(itemPath);
        } else if (stat.isFile() && (item.endsWith('.js') || item.endsWith('.css'))) {
            const content = fs.readFileSync(itemPath);
            const compressed = zlib.brotliCompressSync(content);

            fs.writeFileSync(itemPath + '.br', compressed);
        }
    });
}

compressFiles('./dist/jcmfront2');
console.log('Compression done!');
