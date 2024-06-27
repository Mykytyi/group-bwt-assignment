const path = require('path');
const fs = require('fs');
const { readJsonFile } = require('./helpers/utils');
const { jsonFile } = require('./constants');
const { EuroCommissionFeeCalculator } = require('./helpers/calculators');

const userArgs = process.argv.slice(2);
const fileToParse = userArgs[0];

try {
	if (userArgs.length < 1) {
		throw Error('Expected at least 1 argument, but got none.');
	}

	if (!jsonFile.test(fileToParse)) {
		throw Error(`Incorrect extension: file '${fileToParse}' should be in .json format.`);
	}

	const filePath = path.resolve(__dirname, `./dumps/${fileToParse}`);

	if (!fs.existsSync(filePath)) {
		throw Error(`File '${fileToParse}' was not found`);
	}

	const dataPromise = readJsonFile(filePath);

	dataPromise.then(data => {
		EuroCommissionFeeCalculator.parseOrders(data);
	});
} catch (error) {
	console.error(`Error: ${error.message}`);
	process.exit(1);
}
