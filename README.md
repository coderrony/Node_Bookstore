
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
  npm run start
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

