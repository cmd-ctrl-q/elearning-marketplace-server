import User from '../models/user';
import { hashPassword, comparePassword } from '../utils/auth';

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
