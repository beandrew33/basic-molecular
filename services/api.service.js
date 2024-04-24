"use strict";

const ApiGateway = require("moleculer-web");
const queryType = require("query-types");

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	settings: {
		port: process.env.PORT,
		use: [queryType.middleware()],
		routes: [
			{
				path: "v1/api",
				mappingPolicy: "restrict",
				aliases: {
					"GET math/add": "math.add",
					"GET math/multiply": "math.multiply",
				},
			},
		],
		onError(_, res, err) {
			res.setHeader("Content-type", "application/json; charset=utf-8");
			res.writeHead(err.code || 500);

			if (err.code == 422) {
				const errors = err.data.map((e) => ({
					name: err.type,
					message: e.message,
				}));
				res.end(JSON.stringify({ errors }));
			} else {
				const { name, message } = err;
				res.end(JSON.stringify({ errors: [{ name, message }] }));
			}
		},
	},
};
