const admin = require('firebase-admin');

module.exports.auth = async (req, res, next) => {
  if (req?.headers?.authorization?.startsWith('Bearer ')) {
    const token = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedUser = await admin.auth().verifyIdToken(token);
      console.log('user', decodedUser);
      req.aguid = decodedUser.uid; // Authorized user id.
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
      });
    }
  } else {
    res.status(401).json({
      status: 401,
      message: 'User not authorized.',
    });
  }
};
