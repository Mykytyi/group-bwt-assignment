const moment = require('moment');
const { NATURAL, JURIDICAL, CASH_IN, CASH_OUT } = require('../constants');

class EuroCommissionFeeCalculator {
	constructor() {
		this.cashInFee = 0.03;
		this.cashInFeeLimit = 5;
		this.cashOutNaturalFee = 0.3;
		this.cashOutFeeNaturalWeekLimit = 1000;
		this.cashOutLegalFee = 0.3;
		this.cashOutLegalMinFee = 0.5;

		this.customersHistory = new Map();
		this.order = null; // we use an "order" variable to avoid arguments drilling
	}

	parseOrders = orders => {
		orders.forEach(order => {
			let fee = 0;
			this.order = order;
			const { type, operation } = order;

			if (type === CASH_IN) {
				fee = this.#calculateCacheInFee(operation);
			}
			if (type === CASH_OUT) {
				fee = this.#calculateCacheOutFee();
			}

			this.order = null; // clear variable
			console.log(fee);
		});
	};

	#calculateCacheInFee = operation => {
		const { amount } = operation;
		const fee = (amount * this.cashInFee) / 100;
		const roundedFee = this.#ceilFee(fee);

		return roundedFee > this.cashInFeeLimit ? this.cashInFeeLimit : roundedFee;
	};

	#calculateCacheOutFee = () => {
		const { user_type, operation } = this.order;

		if (user_type === JURIDICAL) {
			return this.#juridicalFee(operation);
		}
		if (user_type === NATURAL) {
			return this.#naturalFee();
		}

		return 0;
	};

	#juridicalFee = operation => {
		const { amount } = operation;
		const fee = (amount * this.cashOutLegalFee) / 100;
		const roundedFee = this.#ceilFee(fee);

		return this.cashOutLegalMinFee > roundedFee ? this.cashOutLegalMinFee : roundedFee;
	};

	#naturalFee = () => {
		const { date, user_id, operation } = this.order;
		const { amount } = operation;

		const history = this.customersHistory.get(user_id);

		if (!history) {
			this.#addOrderToHistory(user_id);
			return this.#handleNaturalFeeNoHistory();
		}

		// Parse the date of the current order
		const currentDate = moment(date, 'YYYY-MM-DD');

		// Calculate the start date of the week
		const startDate = currentDate.clone().subtract(7, 'days');

		// Filter orders within the last week
		const filteredOrders = Array.from(history).filter(order => {
			const orderDate = moment(order.date, 'YYYY-MM-DD');
			return orderDate.isBetween(startDate, currentDate, 'day', '[]');
		});

		// Sum the amounts of the filtered orders
		const sum = filteredOrders.reduce((total, order) => {
			return total + order.operation.amount;
		}, 0);

		// Return fee when customer's current order HAS NOT exceeded week limit
		if (
			this.cashOutFeeNaturalWeekLimit >= sum &&
			this.cashOutFeeNaturalWeekLimit >= sum + amount
		) {
			return 0;
		}

		// Return fee when customer's current order HAS exceeded week limit
		if (
			this.cashOutFeeNaturalWeekLimit >= sum &&
			this.cashOutFeeNaturalWeekLimit <= sum + amount
		) {
			const fee =
				((sum + amount - this.cashOutFeeNaturalWeekLimit) * this.cashOutNaturalFee) / 100;

			return this.#ceilFee(fee);
		}

		const fee = (amount * this.cashOutNaturalFee) / 100;

		this.#addOrderToHistory(user_id);

		return this.#ceilFee(fee);
	};

	#handleNaturalFeeNoHistory = () => {
		const { amount } = this.order.operation;

		// Customer has not exceeded week limit with his first order
		if (this.cashOutFeeNaturalWeekLimit >= amount) {
			return 0;
		}

		const fee =
			((amount - this.cashOutFeeNaturalWeekLimit) * this.cashOutNaturalFee) / 100;

		return this.#ceilFee(fee);
	};

	// This method controls user's order history
	#addOrderToHistory = userId => {
		const hasHistory = this.customersHistory.has(userId);

		if (!hasHistory) {
			const newHistory = [this.order];
			this.customersHistory.set(userId, newHistory);
		} else {
			const prevHistory = this.customersHistory.get(userId);
			const newHistory = [...prevHistory, this.order];
			this.customersHistory.set(userId, newHistory);
		}
	};

	#ceilFee = fee => {
		return Math.ceil(fee * 100) / 100;
	};
}

module.exports = {
	EuroCommissionFeeCalculator: new EuroCommissionFeeCalculator()
};
