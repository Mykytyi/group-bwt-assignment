const fs = require('fs/promises');

async function readJsonFile(filePath) {
	try {
		const data = await fs.readFile(filePath, 'utf-8');

		return JSON.parse(data);
	} catch (error) {
		throw Error(`Error while reading or parsing the json file - (${error})`);
	}
}

module.exports = {
	readJsonFile
};
