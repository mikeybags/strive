const path = require('path');
const fs = require('fs');

fs.readdir(path.join(__dirname, "./emoji"), (err, files) => {
	const emoji = files.filter(f => f.includes(".png")).map(file => file.replace(".png", ""));
	fs.writeFile(path.join(__dirname, `./all-emoji.js`), `export default ${JSON.stringify(emoji, null, 4)};`);
});