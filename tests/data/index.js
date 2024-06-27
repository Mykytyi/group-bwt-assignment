const cashIn_natural_1 = [
	{
		date: '2016-01-05',
		user_id: 1,
		user_type: 'natural',
		type: 'cash_in',
		operation: { amount: 200.0, currency: 'EUR' }
	}
];

const cashIn_juridical_1 = [
	{
		date: '2016-01-06',
		user_id: 2,
		user_type: 'juridical',
		type: 'cash_in',
		operation: { amount: 300.0, currency: 'EUR' }
	}
];

const cashOut_natural_1 = [
	{
		date: '2016-01-10',
		user_id: 1,
		user_type: 'natural',
		type: 'cash_out',
		operation: { amount: 100.0, currency: 'EUR' }
	}
];

const cashOut_natural_2 = [
	{
		date: '2016-01-10',
		user_id: 1,
		user_type: 'natural',
		type: 'cash_out',
		operation: { amount: 900.0, currency: 'EUR' }
	},
	{
		date: '2016-01-11',
		user_id: 1,
		user_type: 'natural',
		type: 'cash_out',
		operation: { amount: 200.0, currency: 'EUR' }
	}
];

const cashOut_juridical_1 = [
	{
		date: '2016-01-06',
		user_id: 2,
		user_type: 'juridical',
		type: 'cash_out',
		operation: { amount: 300.0, currency: 'EUR' }
	}
];

module.exports = {
	cashIn_natural_1,
	cashIn_juridical_1,
	cashOut_natural_1,
	cashOut_natural_2,
	cashOut_juridical_1
};
