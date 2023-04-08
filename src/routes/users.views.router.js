import { Router } from 'express';

const router = Router();

router.get('/login', (req, res)=>{
  res.render('login');
});

router.get('/register', (req, res)=>{
  res.render('register');
});

router.get('/', async (req, res)=>{
  res.render('home', {
    user: req.session.user
  });
});

export default router;