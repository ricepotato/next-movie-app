deploy:
	npm run build
	gcloud app deploy app.yaml --project movie-app-342615

deploy_flex:
	npm run build
	gcloud app deploy app.flexible.yaml --project movie-app-342615