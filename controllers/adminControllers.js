import fs from 'fs';

import { Book } from '../models/book.js';

export const getAddBook = (req, res) => {
  res.render('book/add-edit-book', {
    pageTitle: 'Add Book',
    currentPage: 'add-book',
    editing: false,
    oldInput: {},
    errors: [],
    userSession: req.session.userSession,
  });
};

export const postAddBook = async (req, res) => {
  const { name, price, description } = req.body;

  if (req.file && req?.session?.userSession?.user?.userType === 'admin') {
    const book = new Book({
      name,
      price,
      description,
      image: req.file.path,
      userId: req?.session?.userSession?.user?._id,
    });
    await book
      .save()
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        console.error('Error saving user:', err);
        res.render('book/add-edit-book', {
          pageTitle: 'Add Book',
          currentPage: 'add-book',
          oldInput: { name, price, description },
          errors: [err.message],
          userSession: req.session.userSession,
        });
      });
  } else {
    res.render('book/add-edit-book', {
      pageTitle: 'Add Book',
      currentPage: 'add-book',
      oldInput: { name, price, description },
      errors: ['ou have no permission under the policy'],
      userSession: req.session.userSession,
    });
  }
};

export const getEditBook = async (req, res) => {
  const bookId = req?.params?.bookId;
  const editing = req?.query?.editing;
  const user = req?.session?.userSession?.user;

  try {
    const userBookFound = await Book.findOne({
      _id: bookId,
      userId: user?._id,
    });
    if (!userBookFound || user.userType !== 'admin') {
      res.redirect('/not-found');
    } else {
      res.render('book/add-edit-book', {
        pageTitle: 'Edit Book',
        currentPage: 'edit-book',
        editing,
        oldInput: userBookFound,
        errors: [],
        userSession: req.session.userSession,
      });
    }
  } catch (error) {
    console.log('error: ', error);

    res.redirect('/not-found');
  }
};

export const postEditBook = async (req, res) => {
  const user = req?.session?.userSession?.user;
  const { bookId, name, price, description } = req.body;
  const book = await Book.findById(bookId);

  if (!book && user.userType !== 'admin') {
    res.redirect('/not-found');
  }

  //  delete file locally in uploads/
  if (req.file) {
    fs.unlink(book.image, err => {
      if (err) {
        console.log('file error ', err);
      }
    });
    book.image = req.file.path;
  }
  book.name = name;
  book.price = price;
  book.description = description;

  await book
    .save()
    .then(() => {
      console.log('book save successfully');
    })
    .catch(err => {
      res.render('book/add-edit-book', {
        pageTitle: 'Edit Book',
        currentPage: 'edit-book',
        editing: true,
        oldInput: { bookId, name, price, description },
        errors: [err.message],
        userSession: req.session.userSession,
      });
      res.redirect('/');
    });

  res.redirect('/');
};

export const postDeleteBook = async (req, res) => {
  const user = req?.session?.userSession?.user;
  const bookId = req.params.bookId;

  try {
    const userBookFound = await Book.findOne({
      _id: bookId,
      userId: user?._id,
    });
    if (!userBookFound || user.userType !== 'admin') {
      res.redirect('/not-found');
    } else {
      //  delete file locally in uploads/
      fs.unlink(userBookFound.image, err => {
        if (err) {
          console.log('file error ', err);
        }
      });
      // delete from mongodb
      await Book.findByIdAndDelete(bookId);

      res.redirect('/');
    }
  } catch (error) {
    res.redirect('/not-found');
  }
};
