import passport from "passport";
import passportLocal, { Strategy } from 'passport-local';
import GitHubStrategy from 'passport-github2'
import userModel from "../models/user.models.js";
import { createHash, isValidPassword } from "../util.js";

const localStrategy = passportLocal.Strategy;
const initializePassport = () => {
  // Github Strategy
  passport.use('github', new GitHubStrategy(
    {
      clientID: 'Iv1.bd4d9d2fedf2825b',
      clientSecret: '97a3a1bc4c2bdefe04416d7e2fe37f4dfbf551d2',
      callbackUrl: 'http://localhost:8080/api/session/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Profile obtained from the user: ");
        console.log(profile);
        const user = await userModel.findOne({ email: profile._json.email });
        console.log("User found for login:");
        console.log(user);
        if (!user) {
          console.warn("User doesn't exists with username: " + profile._json.email);
          let newUser = {
            firstName: profile._json.name,
            lastName: '',
            age: 18,
            email: profile._json.email,
            password: '',
            loggedBy: "GitHub"
          };
          const result = await userModel.create(newUser);
          return done(null, result);
        } else {
          //user already exist
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      };
    })
  );

  // Local Strategy
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
          loggedBy: 'App'
        };
        const result = await userModel.create(user);
        return done(null, result);
      } catch (error) {
        return done('Error registering the user: ' + error);
      };
    }
  ));

  //Estrategia de Login de la app:
  passport.use('login', new localStrategy(
    { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
      try {
        const user = await userModel.findOne({ email: username });
        console.log("Usuario encontrado para login:");
        console.log(user);
        if (!user) {
          console.warn("User doesn't exists with username: " + username);
          return done(null, false);
        }
        if (!isValidPassword(user, password)) {
          console.warn("Invalid credentials for user: " + username);
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  // para que no halla interferencia en las seciones
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