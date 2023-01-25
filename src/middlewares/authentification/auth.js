const jwt = require('jsonwebtoken');
const { error } = require('../../../helpers/helper');
require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY;

module.exports = (req, res, next) => {
  // If login page called, let it
  if (req.path == '/api/user/login/') return next();

  const authorizationHeader = req.headers.authorization;

  //   console.log(authorizationHeader);

  if (!authorizationHeader) {
    const errorMessage = 'No Authentication given.';
    return res.status(401).json(error(errorMessage));
  }

  const token = authorizationHeader.split(' ')[1];

  const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
    if (error) {
      const errorMessage = 'User is not authorized for the resource.';
      return res.status(401).json(error(errorMessage));
    }

    const userId = decodedToken.userId;
    // Check if user isn't using another user's token
    if (req.body.userId && req.body.userId !== userId) {
      const errorMessage = 'Username is not valid';
      return res.status(401).json(error(errorMessage));
    } else {
      next();
    }
  });
};
