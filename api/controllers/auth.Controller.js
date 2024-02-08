import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Users from '../models/Users.js';
import errorHandler from '../utils/error.js';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = new Users({ username, email, password: hashPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await Users.findOne({ email });

    //Check if user is already registered
    if (!validUser) return next(errorHandler(404, 'User not found!'));

    //If user is registered, it will compare the password if the same
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    //Check if the password is the same
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

    //Destructure password to remove it in the token
    const { password: hashedPassword, ...rest } = validUser._doc;

    //Creates an expiry date for the token
    const expiryDate = new Date(Date.now() + 36600000); //4 hours token

    //Creates token for accessing the page
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res.cookie('access_token', token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
  } catch (err) {
    next(err);
  }
};
