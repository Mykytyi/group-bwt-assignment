const { EuroCommissionFeeCalculator } = require('../helpers/calculators');
const {
	cashIn_natural_1,
	cashIn_juridical_1,
	cashOut_natural_1,
	cashOut_natural_2,
	cashOut_juridical_1
} = require('./data');

// Check console output
const consoleSpy = jest.spyOn(console, 'log');

describe('Euro commission calculator test', (object, method) => {
	it('CashOut.natural.test - test case when there are two orders, first one does not exceed week limit and the second does', done => {
		EuroCommissionFeeCalculator.parseOrders(cashOut_natural_2);

		expect(consoleSpy).toHaveBeenNthCalledWith(1, 0);
		expect(consoleSpy).toHaveBeenNthCalledWith(2, 0.3);

		consoleSpy.mockClear();
		done();
	});

	it('Correct processing of the "Cash in" request for natural person', done => {
		EuroCommissionFeeCalculator.parseOrders(cashIn_natural_1);

		expect(consoleSpy).toHaveBeenCalledWith(0.06);

		consoleSpy.mockClear();
		done();
	});

	it('Correct processing of the "Cash in" request for juridical person', done => {
		EuroCommissionFeeCalculator.parseOrders(cashIn_juridical_1);

		expect(consoleSpy).toHaveBeenCalledWith(0.09);

		consoleSpy.mockClear();
		done();
	});

	it('Correct processing of the "Cash out" request for juridical person', done => {
		EuroCommissionFeeCalculator.parseOrders(cashOut_natural_1);

		expect(consoleSpy).toHaveBeenCalledWith(0);

		consoleSpy.mockClear();
		done();
	});

	it('Correct processing of the "Cash out" request for juridical person', done => {
		EuroCommissionFeeCalculator.parseOrders(cashOut_juridical_1);

		expect(consoleSpy).toHaveBeenCalledWith(0.9);

		consoleSpy.mockClear();
		done();
	});
});
