# PC Haven - school project

# Getting started
- Clone the repository
```
git clone https://github.com/ramizwd/basicweb-project-backend.git
```
- Install dependencies
```
cd basicweb-project-backend
npm i
```
- Build and run the project with nodemon
```
nodemon
```
  Navigate to `https://localhost:8000`

- Endpoints

  Endpoint: user, comment, auth, vote, post, thubnails, uploads, filter, post/anon, user/anon


# Node JS
REST API for the project

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **controllers**          | Controllers define functions to serve various express                                       |
| **node_modules**         | Contains all npm dependencies                                                                |
| **database**             | Contains connection pool script                                                               |
| **modules**              | Modules for all the routes                                                     |
| **routes**               | Contain all express routes, separated by module/area of application  |
| **thumbnails**           | Contain all the imageds that come from uploads then handled by Sharp                           |
| **utils**                | Contain the utility scripts                                                  |
| app.js                   | Entry point to express app                                   |                 
| package.json             | Contains npm dependencies                                       | 
                           | Config settings for compiling source code                          |
