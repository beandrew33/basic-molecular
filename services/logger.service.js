"use strict";

module.exports = {
	name: "logger",

	actions: {
		log(ctx) {
			const { action, result } = ctx.params;
			const { caller } = ctx;

			this.logger.info(
				`Action: ${action}, Caller: ${caller}, Result: ${result}`
			);
		},
	},
};
