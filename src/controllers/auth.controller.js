const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../configs/mysql.db");
const { QueryTypes } = require("sequelize");
const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const {
    email,
    first_name: firstName,
    last_name: lastName,
    password,
  } = req.body;

  try {
    const existingUser = await sequelize.query(
      `SELECT * FROM user WHERE email = :email LIMIT 1`,
      {
        replacements: { email },
        type: QueryTypes.SELECT,
      }
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    /* 
    - create user
    - create profile
    - create balance
    */
    const t = await sequelize.transaction();
    try {
      await sequelize.query(
        "INSERT INTO user (email, password,createdAt) VALUES( :email, :password, now())",
        {
          replacements: {
            email,
            password: hashedPassword,
          },
          transaction: t,
        }
      );

      const userInserted = await sequelize.query(
        `SELECT * FROM user WHERE email = :email LIMIT 1`,
        {
          replacements: { email },
          type: QueryTypes.SELECT,
          transaction: t,
        }
      );

      await sequelize.query(
        "INSERT INTO user_profile (userId, firstName, lastName, createdAt) VALUES(:userId, :firstName, :lastName, now())",
        {
          replacements: {
            userId: userInserted[0].id,
            firstName,
            lastName,
          },
          transaction: t,
        }
      );

      await sequelize.query(
        "INSERT INTO user_balance (userId, balance, createdAt) VALUES( :userId, :balance, now())",
        {
          replacements: { userId: userInserted[0].id, balance: 0 },
          transaction: t,
        }
      );
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }

    res.status(200).json({
      status: 0,
      message: "Registrasi berhasil silahkan login",
      data: null,
    });
  } catch (error) {
    const e =
      ErrorConfig[error.message] ??
      ErrorConfig[ErrorType.INTERNAL_SERVER_ERROR];
    return res.status(e.code).json({
      message: e.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user and include roles
    const [user] = await sequelize.query(
      `SELECT * FROM user WHERE email = :email LIMIT 1`,
      {
        replacements: { email },
        type: QueryTypes.SELECT,
      }
    );

    if (!user) {
      return res.status(401).json({
        "status": 103,
        "message": "Username atau password salah",
        "data": null
      });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        "status": 103,
        "message": "Username atau password salah",
        "data": null
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({
      "status": 0,
      "message": "Login Sukses",
      data: {
        token
      }
      
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
