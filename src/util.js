import { fileURLToPath } from 'url';
import { dirname } from 'path';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crypto
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (user, password) => {
  console.log(`data to valid: user-password: ${user.password}, password: ${password}`);
  return bcrypt.compareSync(password, user.password);
}

//JSON Web Tokens JWT
export const PRIVATE_KEY = "germancaiced6";

export const generateJWToken = (user) => {
  return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '120s' }); //-->Token generated with duration in seconds
};

//More controlled calls of the passport strategy
export const passportCall = (strategy) => {
  return async (req, res, next) => {
    console.log("Calling strategy: ");
    console.log(strategy);
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        return res.status(401).send({ error: info.messages ? info.messages : info.toString() });
      }
      console.log("User obtained from the strategy: ");
      console.log(user);
      req.user = user;
      next();
    })(req, res, next);
  }
};

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).send({ error: 'User not authenticated or missing token' });
  }

  const token = authHeader.split(' ')[1]; //does a split to remove the word 'Bearer'
  // verify the token 
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error) return res.status(403).send({ error: 'Token invalid, Unauthorized!' });
    req.user = credentials.user;
    next();
  });
};

export default __dirname;