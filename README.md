
# Node Bookstore

This application is developed based on the MVC pattern, demonstrating how MVC works in practice. The entire application, including both the frontend and backend, is rendered on a Node.js server. It represents a bookstore where users—depending on their roles (admin or guest)—can add, delete, and update books. Additional features include adding books to a cart, wishlist, and more.


## Run Locally
Clone the project

```bash
  git clone https://github.com/coderrony/Node_Bookstore.git
```

Go to the project directory

```bash
  cd Node_Bookstore
```

Install dependencies

```bash
  npm install
```
Create a .env file in the root directory and fill in the values according to .env.example

```bash
  touch .env
```

Start the server

```bash
  npm run dev
```
Start the tailwind

```bash
  npm run tailwind
```
Run on browser

```bash
  http://localhost:3001/
```


## Tech Stack

**Server:** Node, Express,ejs, TailwindCSS


## Features

- Add To Cart
- Whitelist
- Authentication 
- Role Base Authorization

## Documentation

- Adding [tailwindcss](https://tailwindcss.com/docs/installation/using-postcss) a utility-first CSS framework that helps build modern and responsive user interfaces efficiently.
- [bcrypt](https://www.npmjs.com/package/bcrypt) used to hash passwords securely before storing them in the database.
- [express-session](https://www.npmjs.com/package/express-session)  manages session data on the server-side, enabling user login sessions.
- [connect-mongodb-session](https://www.npmjs.com/package/connect-mongodb-session) stores session data in MongoDB, allowing persistence across restarts.
- [dotenv](https://www.npmjs.com/package/dotenv) loads environment variables from a .env file into process.env to manage config secrets like DB URIs and ports.
- [express](https://www.npmjs.com/package/express) a minimal and flexible Node.js web framework used for routing, middleware, and server handling.
- [ejs](https://www.npmjs.com/package/ejs) a simple templating language that lets you generate HTML markup with plain JavaScript.
- [express-validator](https://www.npmjs.com/package/express-validator) provides middleware for validating and sanitizing request data, often used in form validation.
- [mongoose](https://www.npmjs.com/package/mongoose) ODM (Object Data Modeling) library for MongoDB and Node.js, used to define schemas and interact with MongoDB.
- [multer](https://www.npmjs.com/package/multer) middleware for handling multipart/form-data, primarily used for uploading files (e.g., book images).



