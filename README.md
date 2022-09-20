<p align="center">
<img width="300px" height="300px" src="/frontend/public/money-pig.png">
</p>


# HouseKeeper 


HouseKeeper is an web app writen in mern stack. Its main purpose is to serve as an budget calculator with expenses and notes display. In order to use Housekeeper you must be registered and logged in. It uses JWT as an authetification strategy. After token expires user is logged out. Whole app can run using docker-compose. 

### Prerequisites

To run this app you will need at least docker. Or you can run it locally on your device. For that purpose you will need Node, MongoDB installed on your device. Before running this app create your own .env file for your enviroment variables. Save it in backend/config/.env .

```
In your .env file make sure you have these variables setup
ACCESS_TOKEN_SECRET - generate your secret for jwt token validation
MONGO_URL - if you running app locally it will be localhost, if in docker-compose it will be mongoDB 

```
If you run app locally dont forget to check if proxy in frontend package.json is correct. For docker-compose it will be backend:4000, for locall run localhost:4000.

### Installing

To run in it in docker compose simply run docker-compose up --build

```
docker-compose up --build
```

To run it locally you need to install all necessary modules in package.json from backend and frontend

```
npm install - in both backend and frontend folder
npm start - in both backend and frontend folder
```

Your app should run on localhost:3000

## Running the tests

Due to lack of time App contains only frontend react tests using Jest.

```
npm test - in frontend folder
```
## Deployment

Add is not made for deployment. It was made as a school project.

## Built With

* [MongoDB](https://www.mongodb.com/) - Database system
* [Node](https://nodejs.org/en/) - Dependency Management
* [React](https://reactjs.org) - Frontend framework



## Authors

* **Jan Zahradník** - *Whole project* - [zahradjan](https://github.com/zahradjan)

