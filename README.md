
# Project Name - Task Manager With JWT

## Table of Contents

- [Project Description](#project-description)
- [Installation](#installation)

## project-description

- The Task Manager with JWT project is a web application designed to manage tasks using JSON Web Tokens (JWT) for authentication and authorization. It allows users to create, edit, and delete tasks in a secure and efficient manner. The application provides a user-friendly interface with features such as task filtering, sorting, and search. The project aims to simplify task management and improve user experience while ensuring data privacy and security through the use of JWT.

## Installation

1. Clone the repository:
   
   git clone `https://github.com/saurabhdixit93/TaskManager.git`
  


2. Navigate to the project directory:
   
   cd `project-directory`
  


3. Install the dependencies:
   
  ` npm install`
  
4. Start the development server:
   
   `npm start`

5. Open browser and check `localhost:3500`


# API Documentation

This API documentation provides information about the endpoints available in the project, including user account management and task management.

## Table of Contents

- [User Account Management](#user-account-management)
  - [Create a New User Account](#create-a-new-user-account)
  - [Login to an Existing User Account](#login-to-an-existing-user-account)
  - [Update User Account Information](#update-user-account-information)
  - [Delete User Account](#delete-user-account)
  
- [Task Management](#task-management)
  - [Create a New Task](#create-a-new-task)
  - [Get All Tasks by User ID](#get-all-tasks-by-user-id)
  - [Update Task by Task ID](#update-task-by-task-id)
  - [Delete Task by Task ID](#delete-task-by-task-id)

## User Account Management

### Create a New User Account

* URL For User: `localhost:3500/api/v1/user/`

Endpoint: `/create-account`
Method: `POST`
Description: Creates a new user account with the provided user account details.
Request Body:
- `name`: The name of the user (required)
- `email`: The email address of the user (required)
- `password`: The password for the user account (required)

### Login to an Existing User Account

Endpoint: `/login-account`
Method: `POST`
Description: Logs in to an existing user account using the provided email and password.
Request Body:
- `email`: The email address of the user (required)
- `password`: The password for the user account (required)

### Update User Account Information

Endpoint: `/update-account/:userId`
Method: `PUT`
Description: Updates the account information for the specified user.
Request Parameters:
- `userId`: The ID of the user to be updated (required)
Request Body:
- `name`: The updated name of the user (optional)
- `email`: The updated email address of the user (optional)
- `password`: The updated password for the user account (optional)

### Delete User Account

Endpoint: `/delete-account/:userId`
Method: `DELETE`
Description: Deletes the specified user account.
Request Parameters:
- `userId`: The ID of the user to be deleted (required)

## Task Management

### Create a New Task

* URL For Tasks: `localhost:3500/api/v1/tasks/`

Endpoint: `/create-new-task`
Method: `POST`
Description: Creates a new task associated with the authenticated user.
Request Headers:
- `Authorization`: JWT token for user authentication (required)
Request Body:
- `title`: The title of the task (required)
- `description`: The description of the task (required)
- `dueDate`: The due date of the task (required)
- `status`: The status of the task (optional)

### Get All Tasks by User ID

Endpoint: `/get-tasks/:userId`
Method: `GET`
Description: Retrieves all tasks associated with the specified user ID.
Request Headers:
- `Authorization`: JWT token for user authentication (required)
Request Parameters:
- `userId`: The ID of the user to retrieve tasks for (required)

### Update Task by Task ID

Endpoint: `/update-task/:taskId`
Method: `PUT`
Description: Updates the specified task by its task ID.
Request Headers:
- `Authorization`: JWT token for user authentication (required)
Request Parameters:
- `taskId`: The ID of the task to be updated (required)
**Request Body:
- `title`: The updated title of the task (optional)
- `description`: The updated description of the task (optional)
- `dueDate`: The updated due date of the task (optional)
- `status`: The updated status of the task (optional)

### Delete Task by Task ID

Endpoint: `/delete-task/:taskId`
Method: `DELETE`
Description: Deletes the specified task by its task ID.
Request Headers:
- `Authorization`: JWT token for user authentication (required)
Request Parameters:
- `taskId`: The ID of the task to be deleted (required)

## Contributing

Contributions are welcome! Here's how you can contribute to the project:
- Fork the repository.
- Create a new branch for your feature/bug fix.
- Make your changes and commit them.
- Push your changes to your forked repository.
- Submit a pull request.

Please make sure to follow the established coding style and conventions.

## License

This project is licensed under the [MIT](LICENSE).