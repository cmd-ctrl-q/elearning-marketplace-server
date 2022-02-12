import User from '../models/user';
import { hashPassword, comparePassword } from '../utils/auth';
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {
  try {
    // create user using user model
    const { name, email, password, password_confirm } = req.body;
    if (!name) return res.status(400).send('Name is required');
    if (!password || password.length < 6)
      return res
        .status(400)
        .send('Password is required and should be more than 5 characters');
    if (password !== password_confirm)
      return res.status(400).send('Passwords do not match');

    // check if user email already exists
    let userExists = await User.findOne({ email }).exec();
    if (userExists) return res.status(400).send('Email is already taken');

    // hash password
    const hashedPassword = await hashPassword(password);

    // register user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    return res.json({ ok: true });
  } catch (err) {
    return res.status(400).send('Error registering.');
  }
};

export const Login = async (req, res) => {
  try {
    // get user data
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('Missing credentials');

    // get user from db
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send('No user found');

    // compare passwords
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send('Password is incorrect');
    }

    // generate JWT with secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    user.password = undefined;

    // add token to cookie
    res.cookie('token', token, {
      httpOnly: true,
      // secure: true, // only https
    });

    res.json(user);
  } catch (err) {
    return res.status(400).send('Error. Try again.');
  }
};

export const Logout = async (req, res) => {
  try {
    // get user cookie
    res.clearCookie('token');
    return res.json({ message: 'Signout successful' });
  } catch (err) {
    console.log(err);
  }
};
