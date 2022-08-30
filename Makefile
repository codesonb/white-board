# development
dev.up:
	docker compose up -d
dev.down:
	docker compose down --remove-orphans
dev.destroy:
	docker compose down --volumes --remove-orphans

dev.ui:
	npm --prefix ui/ run start
dev.api:
	dotnet run --project api/

# production
prod.up:
	docker compose -f docker-compose.prod.yml up -d
prod.down:
	docker compose -f docker-compose.prod.yml down --remove-orphans
prod.destroy:
	docker compose -f docker-compose.prod.yml down --volumes --remove-orphans

# compile
compile.ui:
	npm --prefix ui run build
compile.api:
	mvn --quiet -f api/ clean compile assembly:single

# build
build.ui:
	docker compose -f docker-compose.prod.yml build ui
	docker compose -f docker-compose.prod.yml up ui -d
build.api:
	docker compose -f docker-compose.prod.yml build api
	docker compose -f docker-compose.prod.yml up api -d

# release
release:
	npm --prefix ui run build
	mvn --quiet -f api/ clean compile assembly:single
	docker compose -f docker-compose.prod.yml build
	docker compose -f docker-compose.prod.yml up -d
release.up:
	docker compose -f docker-compose.prod.yml up -d
release.down:
	docker compose down -f docker-compose.prod.yml --remove-orphans
release.destroy:
	docker compose down -f docker-compose.prod.yml --volumes --remove-orphans

# up/down specific
up.ui:
	docker compose up ui -d
up.api:
	docker compose up api -d

stop.ui:
	docker compose stop ui
stop.api:
	docker compose stop api

# reload
reload.nx:
	docker compose -f docker-compose.prod.yml exec nginx nginx -s reload
reload.dev:
	docker compose exec nginx nginx -s reload

# logs
log.nx:
	docker compose logs nginx
log.db:
	docker compose logs db
log.api:
	docker compose logs api
log.ui:
	docker compose logs ui
