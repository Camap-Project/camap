const express = require('express');
const router = express.Router();
const models = require('../models');
const crypto = require('crypto');

// 회원가입 GET
router.get('/signup', function (req, res, next) {
  res.render('signup');
});

// 회원가입 POST
router.post('/signup', async function (req, res, next) {
  let body = req.body;

  let inputPassword = body.password;
  let salt = Math.round(new Date().valueOf() * Math.random()) + '';
  let hashPassword = crypto
    .createHash('sha512')
    .update(inputPassword + salt)
    .digest('hex');

  let result = models.users.create({
    name: body.userName,
    email: body.userEmail,
    password: hashPassword,
    salt: salt,
  });

  res.redirect('/');
});

// // 메인 페이지
// router.get('/', function(req, res, next) {
//   if(req.cookies){
//     console.log(req.cookies);
//   }

//   res.send("환영합니다 ~");
// });

// 로그인 GET
router.get('/login', function (req, res, next) {
  let session = req.session;

  res.render('login', {
    session: session,
  });
});

// 로그인 POST
router.post('/login', async function (req, res, next) {
  let body = req.body;

  // let result = await models.users.findOne({
  // where: {
  // email :
  // body.userEmail   }
  // });

  try {
    let result = models.users
      .findOne({
        where: {
          email: body.userEmail,
        },
      })
      .catch(
        // handler 추가
        function (error) {
          console.log('catch handler');
        }
      );
  } catch (error) {
    console.log('try-catch 추가 에러');
  }

  let dbPassword = result.dataValues.password;
  let inputPassword = body.password;
  let salt = result.dataValues.salt;
  let hashPassword = crypto
    .createHash('sha512')
    .update(inputPassword + salt)
    .digest('hex');

  if (dbPassword === hashPassword) {
    console.log('비밀번호 일치');
    // 세션 설정
    req.session.email = body.userEmail;
    res.redirect('/');
  } else {
    console.log('비밀번호 불일치');
    res.redirect('login');
  }
});

// 로그아웃
router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.clearCookie('sid');

  res.redirect('login');
});

module.exports = router;
