const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = function (req, res, next) {
  console.log('middleware========>>>>>');
  const authHeader = req.header('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'no token authorization deny' });
  }

  const token = authHeader.split(' ')[1];
  console.log(token);
  
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded token ====>', decoded);
  
    req.user = decoded;
    
    next();
  } catch (err) {
    console.error('token verification faileedd==>', err);
    res.status(401).json({ message: 'invalid token' });
  }
};
