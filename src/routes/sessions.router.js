import { Router } from 'express';
import userModel from '../dao/models/user.models.js';
import { createHash, isValidPassword } from '../util.js';
import passport from 'passport';

const router = Router();

router.post('/register', passport.authenticate('register', { failureRedirect: '/fail-register' }),
  async (req, res) => {
    res.send({ status: "Success", message: "User was created successfull" });
  }
);

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    console.log(user);
    if (!user) return res.status(401).send({ status: 'error', message: 'Inccorrect credentials.' });
    if (!isValidPassword(user, password)) {
      return res.status(401).send({ status: 'error', message: 'Inccorrect credentials.' });
    };
    req.session.user = {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      age: user.age,
      cart: user.cart,
      role: user.role
    };
    res.send({ status: "Success", payload: req.session.user, message: "User logging successfull" });
  } catch (error) {
    console.error(error);
    res.send({ error: "failed to login user", message: error });
  };
});

export default router;