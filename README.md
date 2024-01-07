# Basic Express Social Media Web App (Typescript)

This is a simple Express web application that serves as a basic social media platform. The primary features include user authentication, posting messages, and viewing user profiles. The project purposefully avoided using extra libraries such as an ORM or Validation to keep things more barebones, in comparison to the [extended version of this project](https://github.com/kcoulsy/extended-node-social-app) which has more features.

![](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExazV0am9sZnc2MjN5cWVka2czM2MwaWhpczNjZTJ6aTJ5MWZqY2xkbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jGvIXXA8TJ64FRv3rC/giphy.gif)

## Features

- **User Authentication:**
  - Users can register for a new account.
  - Existing users can log in with their credentials.
  - Session management is implemented for user persistence.
  - Password hashing.
  - Basic validation such as duplicate usernames and password requirements.   

- **Posting Messages:**
  - Logged-in users can create and publish posts.
  - Posts are stored in the Better-Sqlite3 database.

- **Viewing User Profiles:**
  - Users can view profiles to see posts made by a specific user.

- **Better-Sqlite3 Database:**
  - The application uses Better-Sqlite3 for database interactions.
  - No Object-Relational Mapping (ORM) is employed to keep database interactions simple and direct.

- **Basic BEM Styling:**
  - Styling is implemented using Basic BEM (Block, Element, Modifier) methodology.
  - No external styling library is used to maintain simplicity.

- **Handlebars Templating:**
  - HBS (Handlebars) is used for server-side templating, rendering dynamic content.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/kcoulsy/basic-express-social-app.git
    ```

2. Navigate to the project directory:

    ```bash
    cd basic-express-social-app
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Run in dev mode:

    ```bash
    npm run dev
    ```

5. Run the production:

    ```bash
    npm run build && npm run start
    ```

6. Open your browser and visit `http://localhost:3000` to access the application.

## Technologies Used

- Node.js
- Express
- Better-Sqlite3
- Handlebars
- HTML, CSS

## Project Structure

```
|-- express-social-media
    |-- public
        |-- styles
            |-- normalize.css
            |-- style.css
    |-- src
        |-- services
            |-- auth.js
            |-- post.js
        |-- routers
            |-- auth.js
            |-- post.js
        |-- views
            |-- partials
                |-- layout.hbs
                |-- createPost.hbs
            |-- index.hbs
            |-- login.hbs
            |-- register.hbs
            |-- profile.hbs
            |-- error.hbs
        |-- index.js
        |-- db.js
        |-- errors.js
    |-- .gitignore
    |-- package.json
    |-- package-lock.json
    |-- nodemon.json
    |-- tsconfig.json
    |-- README.md
```

## Contributing

Feel free to open issues and pull requests. Contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.