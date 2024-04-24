const { MoleculerError } = require("moleculer").Errors;

class BusinessRuleValidationError extends MoleculerError {
	constructor(msg) {
		super(msg, 400);
	}
}

module.exports = BusinessRuleValidationError;
