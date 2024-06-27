const prepareMockEnv = fileName => {
	// Mock process.argv
	process.argv[2] = fileName;

	// Check console output
	const consoleSpy = jest.spyOn(console, 'error');

	// Check process variable
	const processSpy = jest.spyOn(process, 'exit').mockImplementation(number => {
		throw new Error(`process.exit: ${number}`);
	});

	return { consoleSpy, processSpy };
};

describe('Test our script', (object, method) => {
	it('Script should not process any file other than .json ones and terminate process properly', done => {
		const { consoleSpy, processSpy } = prepareMockEnv('someFile.js');

		expect(() => {
			require('../index');
		}).toThrow();

		expect(processSpy).toHaveBeenCalledWith(1);

		expect(consoleSpy).toHaveBeenCalledWith(
			`Error: Incorrect extension: file '${process.argv[2]}' should be in .json format.`
		);

		processSpy.mockClear();
		consoleSpy.mockClear();
		done();
	});

	it('Script should throw an error in case there is no requested file in a directory', done => {
		const { consoleSpy, processSpy } = prepareMockEnv('someFile.json');

		expect(() => {
			require('../index');
		}).toThrow();

		expect(processSpy).toHaveBeenCalledWith(1);

		expect(consoleSpy).toHaveBeenCalledWith(
			`Error: File '${process.argv[2]}' was not found`
		);

		processSpy.mockClear();
		consoleSpy.mockClear();
		done();
	});
});
