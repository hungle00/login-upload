const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) =>  {

    if (req.isAuthenticated())
        return next();

    res.redirect('/auth/login');

};
/*
const isLoggedIn = (req, res, next) =>  {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'iloveyou');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
*/
const provideLoggedUserForTemplates = (req, res, next) => {
    res.locals.loggedUser = req.user;
    next();
};

module.exports = { isLoggedIn, provideLoggedUserForTemplates };

