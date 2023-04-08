.PHONY: dc-db-migrations
dc-db-migrations:
	@docker-compose exec api yarn typeorm migration:run

.PHONY: dc-app-build
dc-app-build:
	@docker-compose exec api yarn build

.PHONY: dc-terminal
dc-terminal:
	@docker-compose exec api sh

