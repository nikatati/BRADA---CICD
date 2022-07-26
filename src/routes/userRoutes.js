import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../dbModels/user.js';
import { generateToken,isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          country: user.country,
          city: user.city,
          street: user.street,
          streetNumber: user.streetNumber,
          aptNumber: user.aptNumber,
          zip: user.zip,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const checkUser = await User.findOne({ email: req.body.email });
    if (checkUser) {
      res.status(401).send({ message: 'Email is already use' });
    }
    else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        country: req.body.country,
        city: req.body.city,
        street: req.body.street,
        streetNumber: req.body.streetNumber,
        aptNumber: req.body.aptNumber,
        zip: req.body.zip,
      });
      const user = await newUser.save();
      res.send({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        country: user.country,
        city: user.city,
        street: user.street,
        streetNumber: user.streetNumber,
        aptNumber: user.aptNumber,
        zip: user.zip,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
    }
  })
);

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.city = req.body.city || user.city;
      user.street = req.body.street || user.street;
      user.streetNumber = req.body.streetNumber || user.streetNumber;
      user.aptNumber = req.body.aptNumber || user.aptNumber;
      user.zip = req.body.zip || user.zip;

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        city: updatedUser.city,
        street: updatedUser.street,
        streetNumber: updatedUser.streetNumber,
        aptNumber: updatedUser.aptNumber,
        zip: updatedUser.zip,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

userRouter.put(
  '/password',
  expressAsyncHandler(async (req, res) => {
    const user = await User.updateOne({ email: req.body.email }, { password: bcrypt.hashSync(req.body.password) });
    if (user) {
      res.send({
        message: 'Update password Successfull',
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);
userRouter.delete('/delete/:email',
expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (user) {
    await user.remove();
    res.send({ message: 'User Deleted' });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
})
);

export default userRouter;