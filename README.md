# Student Records API

A RESTful CRUD API for managing student records, built with Node.js, Express and MongoDB Atlas.

## Aim
To create an API that performs CRUD operations on a database, deploy it, and test it using Postman.

## Technologies Used
Node.js, Express.js, MongoDB Atlas, Mongoose, Postman, Git/GitHub, Render

## Folder Structure
```
student-records-api/
├── config/db.js              # connects to MongoDB Atlas
├── models/Student.js         # Student schema and validation
├── routes/studentRoutes.js   # CRUD routes
├── .env.example              # sample environment variables
├── .gitignore                # files Git should ignore
├── package.json              # project info and dependencies
├── server.js                 # starts the server
├── StudentAPI.postman_collection.json
└── README.md
```

## MongoDB Setup
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a free (M0) cluster.
3. Database Access -> Add New Database User (note the username and password).
4. Network Access -> Add IP Address -> Allow Access From Anywhere (0.0.0.0/0).
5. Database -> Connect -> Drivers -> copy the connection string.
6. Put your password in the string and add the database name `studentdb` before the `?`.

## Installation
```
npm install
```

## Environment Variables
Copy `.env.example` to `.env` and fill in your values:
```
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```
Never upload the `.env` file to GitHub.

## Run Locally
```
npm start
```
Server runs at http://localhost:5000

## API Endpoints

| Method | Endpoint | Purpose | Status Codes |
|--------|----------|---------|--------------|
| POST | /api/students | Create a student | 201, 400, 500 |
| GET | /api/students | Get all students | 200, 500 |
| GET | /api/students/:id | Get one student | 200, 400, 404, 500 |
| PUT | /api/students/:id | Update a student | 200, 400, 404, 500 |
| DELETE | /api/students/:id | Delete a student | 200, 400, 404, 500 |

## Sample JSON
Create (POST) / Update (PUT):
```json
{
  "name": "Rahul Patil",
  "email": "rahul@example.com",
  "course": "Computer Engineering",
  "year": 3,
  "division": "A"
}
```
Rules: all fields are required, email must be valid, year must be 1 to 4.

Error example (400):
```json
{ "message": "Validation failed", "errors": ["Email format is not valid"] }
```

## Testing with Postman
1. Import `StudentAPI.postman_collection.json` (Import button in Postman).
2. Open the collection -> Variables tab. `baseUrl` is `http://localhost:5000` by default.
   For the deployed API, change it to your Render URL.
3. Run requests in order (1 to 11). The `studentId` variable is filled automatically after the Create request.

## Deployed API URL
(To be added after deployment)
