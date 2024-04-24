[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)



This is a [Moleculer](https://moleculer.services/)-based microservices project. Generated with the [Moleculer CLI](https://moleculer.services/docs/0.14/moleculer-cli.html).

## Usage

To start local molecular cluster with multiply instances of math service in docker, run command `docker-compose up` from the root folder.
To start local molecular cluster localy, run command `npm install` & `npm run dev` from the root folder.

To access local cluster endpoints, please use:

`Add` action:

[http://localhost:3000/v1/api/math/add?a=5&b=5](http://localhost:3000/v1/api/math/add?a=5&b=5)
 
 `Multiply` action:
 
 [http://localhost:3000/v1/api/math/multiply?a=5&b=5](http://localhost:3000/v1/api/math/multiply?a=5&b=5)


## Services

-   **api**: API Gateway services
-   **logger**: Sample service with `log` action which can be used in other services in logging purposes.
-   **math**: Sample service with `multiply` and `add` actions


## Run tests
This repository contains unit and integration tests for services, to run this tests:

-   `npm install`
-   `npm run test`
