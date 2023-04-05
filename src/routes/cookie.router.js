import { Router } from "express";
import cookieParser from "cookie-parser";

const router = Router();

router.use(cookieParser());

router.get('/', (req, res) => {
  res.render('cookie', {});
});
router.get('/setCookie', (req, res) => {
  res.cookie('CooCookie', 'This is a delicius cookie', { maxAge: 30000, signed: true }).send('Cookie');
});
router.get('/getCookies', (req, res) => {
  res.send(req.cookies);
});
router.get('/deleteCookie', (req, res) => {
  res.clearCookie('CooCookie').send('The CooCookie was deleted');
});

export default router;