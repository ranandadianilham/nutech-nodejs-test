const { QueryTypes } = require("sequelize");
const { sequelize } = require("../configs/mysql.db");

exports.banner = async (req, res) => {
  try {
    const data = await sequelize.query(
      "select banner_name, banner_image, description from banners",
      {
        type: QueryTypes.SELECT,
      }
    );
    res.status(200).json({
      status: 0,
      message: "Sukses",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: "internal status error" });
  }
};

exports.services = async (req, res) => {
    try {
        const data = await sequelize.query(
          "select service_code, service_name, service_icon, service_tariff from services",
          {
            type: QueryTypes.SELECT,
          }
        );
        res.status(200).json({
          status: 0,
          message: "Sukses",
          data,
        });
      } catch (error) {
        res.status(500).json({ message: "internal status error" });
      }
};
