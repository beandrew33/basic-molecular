"use strict";

process.env.PORT = 0; // Use random ports during tests

const request = require("supertest");
const { ServiceBroker } = require("moleculer");

const APISchema = require("../../../services/api.service");
const MathSchema = require("../../../services/math.service");
const LoggerSchema = require("../../../services/logger.service");

const API_PREFIX = "/v1/api";

describe("API gateway tests", () => {
	const broker = new ServiceBroker({ logger: false });

	broker.createService(MathSchema);
	broker.createService(LoggerSchema);
	const { server } = broker.createService(APISchema);

	beforeAll(() => broker.start());
	afterAll(() => broker.stop());

	describe("Test 'math' path", () => {
		describe("Test 'add' action", () => {
			it("GET should return correct result", async () => {
				const params = { a: 5, b: 3 };
				const result = params.a + params.b;

				const response = await request(server)
					.get(`${API_PREFIX}/math/add`)
					.query(params);

				expect(response.statusCode).toBe(200);
				expect(response.body).toEqual(result);
			});

			it("GET should return error in case value for a in not number", async () => {
				const params = { a: "value", b: 3 };
				const expectedError = {
					name: "VALIDATION_ERROR",
					message: "The 'a' field must be a number.",
				};

				const response = await request(server)
					.get(`${API_PREFIX}/math/add`)
					.query(params);

				expect(response.statusCode).toBe(422);
				expect(response.body.errors.length).toEqual(1);
				expect(response.body.errors).toContainEqual(expectedError);
			});

			it("GET should return error in case value for b is not number", async () => {
				const params = { a: 2, b: "wrong" };
				const expectedError = {
					name: "VALIDATION_ERROR",
					message: "The 'b' field must be a number.",
				};

				const response = await request(server)
					.get(`${API_PREFIX}/math/add`)
					.query(params);

				expect(response.statusCode).toBe(422);
				expect(response.body.errors.length).toEqual(1);
				expect(response.body.errors).toContainEqual(expectedError);
			});

			it("GET should return error in case values for a and b are not numbers", async () => {
				const params = { a: "wrong too", b: "wrong" };
				const expectedErrors = [
					{
						name: "VALIDATION_ERROR",
						message: "The 'a' field must be a number.",
					},
					{
						name: "VALIDATION_ERROR",
						message: "The 'b' field must be a number.",
					},
				];

				const response = await request(server)
					.get(`${API_PREFIX}/math/add`)
					.query(params);

				expect(response.statusCode).toBe(422);
				expect(response.body.errors.length).toEqual(2);

				response.body.errors.forEach((error) => {
					expect(expectedErrors).toContainEqual(error);
				});
			});
		});
		describe("Test 'multiply' action", () => {
			it("GET should return correct result", async () => {
				const params = { a: 5, b: 3 };
				const result = params.a * params.b;

				const response = await request(server)
					.get(`${API_PREFIX}/math/multiply`)
					.query(params);

				expect(response.statusCode).toBe(200);
				expect(response.body).toEqual(result);
			});

			it("GET should return error in case result is greater than 1000", async () => {
				const params = { a: 50, b: 50 };
				const expectedError = {
					name: "BusinessRuleValidationError",
					message:
						"The cumulative product of the values cannot exceed 1000",
				};

				const response = await request(server)
					.get(`${API_PREFIX}/math/multiply`)
					.query(params);

				expect(response.statusCode).toBe(400);
				expect(response.body.errors.length).toEqual(1);
				expect(response.body.errors).toContainEqual(expectedError);
			});
		});
	});
});
