install:
	npm ci

lint-frontend:
	make -C frontend lint

build:
	npm run build

start:
	make -C frontend start