const jwt = require("jsonwebtoken");
const { ErrorType, ErrorConfig } = require("../contants/errorContant");
const {sequelize} = require('./../configs/mysql.db');
const { QueryTypes } = require("sequelize");
const { validationResult } = require("express-validator");
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const extractToken = (authHeader) => {
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return null;
  }
  return authHeader.split(" ")[1];
};

const PUBLIC_PATHS = {
    EXACT: [
      '/login',
      '/register',
      '/banner'
    ],
  };

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token Expired");
    }
    throw new Error("Token Invalid");
  }
};

const getUserFromDatabase = async (userId) => {
  const query = `
      SELECT 
        u.id,
        u.email
      FROM user u
      WHERE u.id = :userId
    `;

  const [user] = await sequelize.query(query, {
    replacements: { userId },
    type: QueryTypes.SELECT,
  });

  return user;
};

exports.authenticateToken = async (req, res, next) => {
  try {
    if (PUBLIC_PATHS.EXACT.includes(req.path)) {
        return next();
      }

    const token = extractToken(req.headers.authorization);
    if (!token) {
      throw new Error(ErrorType.UNAUTHORIZED);
    }

    const decoded = verifyToken(token);
    
    const user = await getUserFromDatabase(decoded.userId);
    if (!user) {
      throw new Error(ErrorType.UNAUTHORIZED);
    }
    req.user = {
      id: user.id,
      email: user.email,
    };
    next();
  } catch (error) {
    console.log("h", error.message);
    const e =
      ErrorConfig[error.message] ??
      ErrorConfig[ErrorType.INTERNAL_SERVER_ERROR];
    return res.status(e.code).json({
      status: 108,
      message: e.message,
      data: null,
    });
  }
};

exports.validateBody = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };