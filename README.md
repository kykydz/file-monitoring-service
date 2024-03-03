<!-- > Author: Rizky Heri S -->
## File Monitoring Service

File monitoring service is an app to monitor the user input file validation which will be then uploaded to a storage
The technical specification to build this service is as
[Docs Tech Spec](https://docs.google.com/document/d/1fRV7YEhmbst5wAI42ZhbnEQnZc-Zox3k1iCLqvFcy0Q/edit?usp=sharing)

### Requirement

Below are author environment to run the script:

1. Node: v16.13.0
2. OS: Mac OSX
3. NodeJs additional package can be seen inside `package.json`
4. project is using TypeScript Version 5.3.3

### Start Apps using NPM

1. Open terminal with root folder `{workdir}/`
2. Run `npm i` to install all dependencies
3. Run `npm run build` to build the apps
4. Run `npm start` to run server

### Start Apps using Docker

You need to have `docker` apps in your host machine.

1. Open terminal with root folder `{workdir}/`
2. Run command `docker compose -f docker-compose.yaml up`

### Testing Notes

You can check on `Upload File Sample.postman_collection.json` in the root folder directory open the postman collection created for this