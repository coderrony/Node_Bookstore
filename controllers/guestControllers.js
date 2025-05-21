import { Book } from '../models/book.js';
import { User } from '../models/user.js';

export const getAddToCart = async (req, res, next) => {
  const loggedUser = req?.session?.userSession;
  if (!loggedUser) {
    res.redirect('/login');
  } else {
    try {
      const bookId = req?.params?.bookId;
      const foundBook = await Book.findById(bookId);
      if (!foundBook) {
        res.redirect('/not-found');
      }
      await User.findByIdAndUpdate(loggedUser?.user?._id, {
        $addToSet: { addToCart: bookId },
      });
      res.redirect('/add-to-cart-list');
    } catch (error) {
      res.redirect('/not-found');
    }
  }
};

export const getAddToCartList = async (req, res) => {
  const loggedUser = req?.session?.userSession;

  if (!loggedUser) {
    res.redirect('/login');
  } else {
    try {
      const user = await User.findById(loggedUser.user._id).populate(
        'addToCart',
      );
      if (!user) {
        res.redirect('/not-found');
      } else {
        res.render('guest/add-to-cart-list', {
          pageTitle: 'Add To Cart List',
          currentPage: 'add-to-cart',
          books: user.addToCart,
          userSession: req.session.userSession,
        });
      }
    } catch (error) {
      console.log('error: ', error);
      res.redirect('/not-found');
    }
  }
};

export const deleteAddToCart = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const loggedUser = req?.session?.userSession;
    if (!loggedUser) {
      return res.redirect('/login');
    }
    await User.findByIdAndUpdate(
      loggedUser.user._id,
      { $pull: { addToCart: bookId } }
    );
    res.redirect('/add-to-cart-list');
  } catch (error) {
    res.redirect('/not-found');
  }
};
