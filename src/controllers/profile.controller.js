/* {
  "status": 0,
  "message": "Sukses",
  "data": {
    "email": "user@nutech-integrasi.com",
    "first_name": "User",
    "last_name": "Nutech",
    "profile_image": "https://yoururlapi.com/profile.jpeg"
  }
} */

const { QueryTypes } = require("sequelize");
const { sequelize } = require("../configs/mysql.db");
const { ErrorConfig, ErrorType } = require("../contants/errorContant");

exports.profile = async (req, res) => {
  /* get id by jwt token */
  const id = req.user.id;
  try {
    const [profile] = await sequelize.query(
      "SELECT u.email as email, up.firstName as first_name, up.lastName as last_name, up.profileImage as profile_image from user_profile up left join `user` u on u.id = up.userId where u.id = :id",
      {
        replacements: {
          id,
        },
        type: QueryTypes.SELECT,
      }
    );
    res.json({
      status: 0,
      message: "Sukses",
      data: profile,
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

const updateProfile = async (id, firstName, lastName) => {
  const t = await sequelize.transaction();
  try {
    await sequelize.query(
      "UPDATE user_profile SET firstName=:firstName, lastName=:lastName, updatedAt=now() WHERE id=:id",
      {
        replacements: {
          id,
          firstName,
          lastName,
        },
        type: QueryTypes.UPDATE,
        transaction: t,
      }
    );

    const [updatedProfile] = await sequelize.query(
      "SELECT u.email as email, up.firstName as first_name, up.lastName as last_name, up.profileImage as profile_image from user_profile up left join `user` u on u.id = up.userId where u.id = :id",
      {
        replacements: {
          id,
        },
        type: QueryTypes.SELECT,
        transaction: t,
      }
    );
    await t.commit();
    return updatedProfile;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const updateProfileImage = async (id, profileImage) => {
  const t = await sequelize.transaction();
  try {
    await sequelize.query(
      "UPDATE user_profile SET profileImage=:profileImage, updatedAt=now() WHERE id=:id",
      {
        replacements: {
          id,
          profileImage,
        },
        type: QueryTypes.UPDATE,
        transaction: t,
      }
    );

    const [updatedProfile] = await sequelize.query(
      "SELECT u.email as email, up.firstName as first_name, up.lastName as last_name, up.profileImage as profile_image from user_profile up left join `user` u on u.id = up.userId where u.id = :id",
      {
        replacements: {
          id,
        },
        type: QueryTypes.SELECT,
        transaction: t,
      }
    );
    await t.commit();
    return updatedProfile;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

exports.update = async (req, res) => {
  const { first_name: firstName, last_name: lastName } = req.body;
  const id = req.user.id;

  try {
    const data = await updateProfile(id, firstName, lastName);
    res.status(201).json({
      status: 0,
      message:  "Update Pofile berhasil",
      data,
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

exports.updateImage = async (req, res) => {
  const id = req.user.id;

  try {
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "No file uploaded",
      });
    }
    const fileUrl = `uploaded/${req.file.filename}`;
    const data = await updateProfileImage(id, fileUrl);
    res.status(200).json({
      status: 0,
      message: "Update Profile Image berhasil",
      data,
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
