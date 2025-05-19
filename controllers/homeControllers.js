import { Book } from "../models/book.js";



export const getHome = async (req, res) => { 
  console.log("session ",req.session);
  
  const books = await Book.find({}); 
  res.render('home/home', { pageTitle: 'Bookstore Home',currentPage:"home",books,userSession:req.session.userSession});
};

export const getBookDetails = async (req, res) => { 
  console.log("req.params ",req.params);
  const bookId = req.params.bookId
  
  const book = await Book.findById(bookId); 
  // console.log(book);
  
  res.render('home/bookDetails', { pageTitle: 'BookDetails',currentPage:"",book,userSession:req.session.userSession});

};

