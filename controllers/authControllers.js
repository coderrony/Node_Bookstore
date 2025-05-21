import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

export const getRegister = (req, res, next) => {
  res.render('auth/register', {
    pageTitle: 'Register',
    currentPage: 'register',
    oldInput: {},
    errors: [],
    userSession:req.session.userSession
  });
};

export const postRegister = [
  check('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters long')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('First Name should contain only alphabets'),

  check('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters long')
    .matches(/^[A-Za-z\s]+$/)
    .withMessage('Last Name should contain only alphabets'),

  check('email')
    .isEmail()
    .withMessage('Please enter a valid email address')
    .normalizeEmail(),

  check('password')
    .isLength({ min: 8 })
    .withMessage('Password should be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password should contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password should contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password should contain at least one number')
    .trim(),

  check('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),

  check('userType')
    .notEmpty()
    .withMessage('Please select a user type')
    .isIn(['guest', 'admin'])
    .withMessage('Invalid user type'),

  check('terms')
    .notEmpty()
    .withMessage('Please accept the terms and conditions')
    .custom((value, { req }) => {
      if (value !== 'on') {
        throw new Error('Please accept the terms and conditions');
      }
      return true;
    }),

  (req, res, next) => {
    const { firstName, lastName, email, password, userType, terms } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('auth/register', {
        pageTitle: 'Register',
        currentPage: 'register',
        oldInput: { firstName, lastName, email, userType, terms },
        errors: errors.array().map(item => item.msg),
        userSession:req.session.userSession
      });
    }

    // save user in mongodb
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        res.render('auth/register', {
          pageTitle: 'Register',
          currentPage: 'register',
          oldInput: { firstName, lastName, email, userType, terms },
          errors: ['Something is wrong! please try again'],
          userSession:req.session.userSession
        });
      } else {
        const user = new User({
          firstName,
          lastName,
          email,
          password: hash,
          userType,
        });
        await user
          .save()
          .then(() => {
            res.redirect('/login');
          })
          .catch(err => {
            console.error('Error saving user:', err);
            res.render('auth/register', {
              pageTitle: 'Register',
              currentPage: 'register',
              oldInput: { firstName, lastName, email, userType, terms },
              errors: ['The information you provided are not valid!'],
              userSession:req.session.userSession
            });
          });
      }
    });
  },
];

export const getLogin = (req, res, next) => {

  
  res.render('auth/login', { pageTitle: 'Login', currentPage: 'login',  oldInput: {},errors: [],userSession:req.session.userSession});
};

export const postLogin =async (req, res, next) => {
  const {email,password} = req.body
  const findUser =await User.findOne({email})

  if(findUser){ 
   const matchPass =  await bcrypt.compare(password, findUser.password);

   if(matchPass){ 
    // confirm user is logged in
    req.session.userSession = {isLogin:true,user:findUser}
    res.redirect("/")

   }else{ 
   res.render('auth/login', { pageTitle: 'Login', currentPage: 'login',  oldInput: {email},errors: ["Password are wrong!"],userSession:req.session.userSession});
   }

  }else{ 
   res.render('auth/login', { pageTitle: 'Login', currentPage: 'login',  oldInput: {email},errors: ["The email your provided are not valid!"],userSession:req.session.userSession});
  }
  

};

export const getLogout= (req,res,next)=>{ 
   req.session.destroy(()=>{ 
       res.redirect("/login")
   })
}