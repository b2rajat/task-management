# Task Management App

This is a task management app built using React. It allows users to log in, sign up, manage tasks, and log out. The app uses React Router for navigation and Context API for managing the application state. Below is a breakdown of the project structure and files.

## File Structure

src/

├── components/

│   ├── Header.js

│   ├── LoginForm.js

│   ├── SignUp.js

│   └── TaskList.js

├── context/

│   └── TaskContext.js

├── App.js

├── App.css

├── index.css

├── index.js


### Main Files

1. **App.js**  
   The entry point for the application. It contains the main routing logic and integrates the `TaskProvider` context. The app uses `react-router-dom` to handle the different views:

   - `/` - Login page (`LoginForm`)

   - `/signup` - Sign-up page (`SignUp`)

   - `/tasks` - Tasks management page (`TaskList`)


3. **Header.js**

The header component is responsible for displaying the app title and the user's information if logged in. It also includes a logout button that clears the user session.

3. **LoginForm.js**
The login form where users can input their credentials (username and password). If successfully logged in, users are redirected to the tasks page (/tasks). It checks for an existing user session from local storage.

3. **SignUp.js**
The sign-up form where users can create a new account. Once the user is successfully registered, they can log in to manage tasks.

4. **TaskList.js**
Displays a list of tasks and allows users to:

-  Add a new task


- Edit task titles

- Mark tasks as complete/incomplete

- Delete tasks



**Flow**

**Login:**

The user enters their credentials in the LoginForm component.
If the credentials are valid, the user is redirected to the /tasks page.
User data (username) is saved in localStorage for persistent sessions.

**Sign Up:**

New users can sign up using the SignUp form. Upon successful registration, they can log in using the LoginForm.

**Task Management:**

After logging in, users can manage their tasks on the /tasks page. Tasks are saved in localStorage under the user's name.

**Logout:**

Clicking the logout button on the header will clear the user session and redirect them to the login page.


Installation

To get started with the app, clone the repository and install the dependencies:

npm install

npm run start

The app will be available at http://localhost:3000.
