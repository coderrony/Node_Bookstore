import { Book } from '../models/book.js';

export const getAddBook = (req, res) => {
  res.render('book/add-book', {
    pageTitle: 'Add Book',
    currentPage: 'add-book',
    oldInput: {},
    errors: [],
    userSession:req.session.userSession
  });
};

export const postAddBook = async (req, res) => {
  const { name, price, description } = req.body;

  if (req.file && req?.session?.userSession?.user?.userType === 'admin' ) {
    const book = new Book({ name, price, description, image: req.file.path,userId:req?.session?.userSession?.user?._id });
    await book
      .save()
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        console.error('Error saving user:', err);
        res.render('book/add-book', {
          pageTitle: 'Add Book',
          currentPage: 'add-book',
          oldInput: { name, price, description },
          errors: [err.message],
          userSession:req.session.userSession
        });
      });
  } else {
    res.render('book/add-book', {
      pageTitle: 'Add Book',
      currentPage: 'add-book',
      oldInput: { name, price, description },
      errors: ['ou have no permission under the policy'],
      userSession:req.session.userSession
    });
  }


};
