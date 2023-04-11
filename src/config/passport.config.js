import passport from "passport";
import passportLocal from 'passport-local';
import userModel from "../dao/models/user.models.js";
import { createHash, isValidPassword } from "../util.js";

const localStrategy = passportLocal.Strategy;

const initializePassport = () => {
  passport.use('register', new localStrategy(
    { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
      const { firstName, lastName, email, age } = req.body;
      try {
        const exists = await userModel.findOne({ email });
        if (exists) {
          console.log('User already exist.');
          return done(null, false);
        }
        const user = {
          firstName,
          lastName,
          email,
          age,
          password: createHash(password),
          cart: 'nan',
          role: 'user',
        };
        const result = await userModel.create(user);
        return done(null, result);
      } catch (error) {
        return done('Error registering the user: ' + error);
      };
    }
  ));
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      console.error('Error deserializing user: ' + error);
    };
  });
};

export default initializePassport;