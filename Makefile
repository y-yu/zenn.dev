.PHONY: new preview

new:
	docker compose run zenn-cli new:article

preview:
	docker compose up