## Assignment

Design a backend architecture and write code, with two API’s (Signup, Login) with MongoDB as database and implementing following conditions: 
1. Regular username and password validation: check username and password is matching or not
2. Barring every 5th login: From platform point of view, across all the users, block every 5th login. 
3. There should be a 3rd party service which responds with 'true' or 'false'. This should not be an API - request response cycle but using queuing mechanism.

## Project Requirements
1. Nodejs
2. RabbitMQ
3. MongoDB

## Project Setup
1. Run `$ npm install` in the root folder to download all dependencies of API project.
2. Run `$ npm install` in the "/ThirdPartyService" folder to download dependencies for Third party service project.
3. Run `$ npm start` in both projects to start the application and service.

## API Requests

### Register

url: localhost:8080/users/register
body: {
    "username": "himanshu",
    "password": "helloworld"
}

success: 200
failed: 500

### Login

url: localhost:8080/users/login
body: {
    "username": "himanshu",
    "password": "helloworld"
}

success: {
    "username": "himanshu2",
    "createdDate": "2021-08-08T17:53:29.896Z",
    "id": "61101a19e565a834981f3d74",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTEwMWExOWU1NjVhODM0OTgxZjNkNzQiLCJpYXQiOjE2Mjg0NDYwMDgsImV4cCI6MTYyOTA1MDgwOH0.UmQe0amlvumZSV3NSYDCYqaqkmNQQFClhNvzjDjrUKE"
}


failed: 401 Third party rejected request, Barring 5th request
        400: Username or password is incorrect

