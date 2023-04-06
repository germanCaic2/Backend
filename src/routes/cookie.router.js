import { Router } from "express";
import cookieParser from "cookie-parser";

const router = Router();

router.use(cookieParser());

router.get('/', (req, res) => {
  res.render('cookie', {});
});
router.get('/setCookie', (req, res) => {
  res.cookie('CooCookie', 'This is a delicius cookie',
    { maxAge: 30000, signed: true }).send('Cookie');
});
router.get('/getCookies', (req, res) => {
  res.send(req.cookies);
});
router.get('/deleteCookie', (req, res) => {
  res.clearCookie('CooCookie').send('The CooCookie was deleted');
});
//session
router.get('/session', (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`this site has been visited ${req.session.counter} times.`);
  } else {
    req.session.counter = 1;
    res.send('Welcome to session page!')
  }
});
//login
router.get('/login', (req, res) => {
  const { username, password } = req.query;
  if (username !== 'german' || password !== '123') {
    return res.status(401).send('Login failed, check your username and password.');
  } else {
    req.session.user = username;
    req.session.admin = true;
    res.send('Loging successfull!');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(error => {
    if (!error) {
      res.send('You have been logged out ok')
    } else {
      res.send('You have not been  logged out')
    }
  })
})
//middleware for auth users
function auth(req, res, next) {
  if (req.session.user === 'german' && req.session.admin) {
    return next();
  } else {
    return res.status(403).send('user not authorized to access this resource');
  }
}
router.get('/private', auth, (req, res) => {
  res.send('user authorized to access this resource');
});

export default router;