"use strict";

const BusinessRuleValidationError = require("../shared/errors");

module.exports = {
	name: "math",

	actions: {
		add: {
			params: {
				a: { type: "number" },
				b: { type: "number" },
			},
			async handler(ctx) {
				const { a, b } = ctx.params;
				const { name } = ctx.action;

				const result = a + b;

				await ctx.call("logger.log", { action: name, result });

				return result;
			},
		},

		multiply: {
			params: {
				a: { type: "number" },
				b: { type: "number" },
			},
			async handler(ctx) {
				const { a, b } = ctx.params;
				const { name } = ctx.action;

				const result = a * b;

				if (result > 1000) {
					throw new BusinessRuleValidationError(
						"The cumulative product of the values cannot exceed 1000"
					);
				}

				await ctx.call("logger.log", { action: name, result });

				return result;
			},
		},
	},
};
