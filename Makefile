.PHONY: new

new:
	docker-compose run --entrypoint "npx zenn new:article" zenn-preview
