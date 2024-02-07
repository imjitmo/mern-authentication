import bcryptjs from 'bcryptjs';
import Users from '../models/Users.js';

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = bcryptjs.hashSync(password, 10);

  try {
    const newUser = new Users({ username, email, password: hashPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
