
import express from "express";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import connectMongoDBSession from "connect-mongodb-session";
import multer from "multer";


import rootDir from './utils/pathUtils.js';
import homeRoutes from "./routes/homeRouter.js";
import authRouters from "./routes/authRouter.js";
import adminRoutes from "./routes/adminRouter.js";

//configure environment 
dotenv.config()
// admin route 
const private_route = ["/add-book"]

const app = express()
const PORT = process.env.PORT


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded())




// এটি একটি ফাংশন, যাকে `session` দিতে হয়
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: 'sessions'
});
app.use(session({
  secret: 'amar-secret-key',
  resave: false,
  saveUninitialized: true,   // নতুন session create করে
  store: store, // এখানেই MongoDB store যুক্ত হলো
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // mongodb session documents will delete automatic when time expire
  }
   
}));

// handle authentication & authorization
app.use((req,res,next)=>{ 
  const my_session = req.session?.userSession
  if(private_route.includes(req.url) && my_session?.user?.userType !== "admin"){
    res.redirect("/not-found")
  }
  next()
})


// file upload handle
// কোথায় এবং কীভাবে ফাইল সেভ হবে তা নির্ধারণ
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // ফাইল যাবে uploads ফোল্ডারে
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // ইউনিক ফাইলনেম
  }
});

// ফাইল ফিল্টার ফাংশন: শুধুমাত্র jpg এবং png নিতে দিবে
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);  // অ্যাকসেপ্টেড
  } else {
    cb(null, false);  // রিজেক্ট
  }
};
// multer কনফিগার
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // ফাইল সাইজ: সর্বোচ্চ ৫MB
});

app.use(upload.single("image"))

// different types of router
app.use((req,res,next)=>{
  console.log(` url:${req.url}\n method:${req.method}`);
  next()
})

app.use(homeRoutes)
app.use(authRouters)
app.use(adminRoutes)

app.use(["/book","/"],express.static(path.join(rootDir,"public")))
app.use(["/uploads","/book/uploads"],express.static(path.join(rootDir,"uploads")))

// error handle by error page
app.use((req,res,next)=>{
  res.render("404",{ pageTitle: 'Error Page'})
})


mongoose.connect(process.env.MONGODB_URL).then(()=>{ 
  app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/ listening....`);
});
}).catch(err=> console.log('Error while connecting to Mongo: ', err))
