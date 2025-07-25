import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
  try {
    let token;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization) {
      token = req.headers.authorization; 
    }

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized, Login First!",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token!",
      success: false,
    });
  }
};