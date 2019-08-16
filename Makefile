.PHONY: services
services::
	mvn package -f ./auth && mvn package -f ./gateway

.PHONY: build
build::
	docker-compose build

.PHONY: up
up::
	docker-compose up -d --force