"use strict";

module.exports = {
	namespace: "my-project",
	nodeID: null,
	metadata: {},
	logger: {
		type: "Console",
		options: {
			formatter: "full",
		},
	},
	logLevel: "info",
	transporter: null,
	serializer: "JSON",
	requestTimeout: 10 * 1000,
	heartbeatInterval: 10,
	heartbeatTimeout: 30,
	validator: {
		type: "Fastest",
	},
};
