"use strict";

const { ServiceBroker, Context } = require("moleculer");
const { ValidationError } = require("moleculer").Errors;

const MathService = require("../../../../services/math.service");
const LoggerService = require("../../../../services/logger.service");
const BusinessRuleValidationError = require("../../../../shared/errors");

describe("Test 'math' service", () => {
	let broker = new ServiceBroker({ logger: false });
	broker.createService(MathService);
	broker.createService(LoggerService);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("Test 'math.add' action", () => {
		it("should return with correct value", async () => {
			const params = { a: 5, b: 3 };
			const result = params.a + params.b;
			const action = "math.add";

			const loggerServicesSpy = jest.spyOn(Context.prototype, "call");

			const res = await broker.call(action, params);

			expect(res).toBe(result);
			expect(loggerServicesSpy).toBeCalledWith("logger.log", {
				action,
				result,
			});
		});

		it("should return validation error if value a is not a number", async () => {
			const params = { a: "a", b: 3 };

			const loggerServicesSpy = jest.spyOn(Context.prototype, "call");

			await expect(broker.call("math.add", params)).rejects.toThrow(
				ValidationError
			);
			expect(loggerServicesSpy).not.toBeCalled();
		});

		it("should return validation error if value b is not a number", async () => {
			const params = { a: 4, b: "b" };

			const loggerServicesSpy = jest.spyOn(Context.prototype, "call");

			await expect(broker.call("math.add", params)).rejects.toThrow(
				ValidationError
			);
			expect(loggerServicesSpy).not.toBeCalled();
		});
	});

	describe("Test 'math.multiply' action", () => {
		it("should return correct value", async () => {
			const params = { a: 2, b: 3 };
			const result = params.a * params.b;
			const action = "math.multiply";

			const res = await broker.call(action, params);
			const loggerServicesSpy = jest.spyOn(Context.prototype, "call");

			expect(res).toBe(result);
			expect(loggerServicesSpy).toBeCalledWith("logger.log", {
				action,
				result,
			});
		});

		it("should return throw custom error if result is greater than 1000", async () => {
			const params = { a: 500, b: 500 };
			const loggerServicesSpy = jest.spyOn(Context.prototype, "call");

			await expect(broker.call("math.multiply", params)).rejects.toThrow(
				BusinessRuleValidationError
			);
			expect(loggerServicesSpy).not.toBeCalled();
		});
	});
});
