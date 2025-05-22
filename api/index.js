import express from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";

import { fileURLToPath } from "url";
import { dirname } from "path";

import homeRoutes from "../routes/homeRouter.js";
import authRouters from "../routes/authRouter.js";
import adminRoutes from "../routes/adminRouter.js";
import guestRoutes from "../routes/guestRouter.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = __dirname;

const app = express();

// MongoDB connection cache for serverless
let cached = global.mongoose || { conn: null, promise: null };
async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URL, {
      bufferCommands: false,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.urlencoded({ extended: true }));

const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const private_route = ["/add-book", "/edit-book"];
app.use((req, res, next) => {
  const my_session = req.session?.userSession;
  if (private_route.includes(req.url) && my_session?.user?.userType !== "admin") {
    return res.redirect("/not-found");
  }
  next();
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// ⚠️ Multer + diskStorage not supported on Vercel
// Only enable this when deploying elsewhere
// const storage = multer.diskStorage({...})
// const upload = multer({...})
// app.use(upload.single("image"))

app.use((req, res, next) => {
  console.log(`url:${req.url} | method:${req.method}`);
  next();
});

app.use(homeRoutes);
app.use(guestRoutes);
app.use(authRouters);
app.use(adminRoutes);

// Serve static files
app.use(express.static(path.join(rootDir, "../public")));

app.use((req, res, next) => {
  res.render("404", { pageTitle: "Error Page" });
});

export default async function handler(req, res) {
  await connectDB();
  app(req, res);
}
