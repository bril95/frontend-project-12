install:
	npm ci

lint-frontend:
	make -C frontend lint

build:
	rm frontend/build -rf
	npm run build

start:
	make -C frontend start