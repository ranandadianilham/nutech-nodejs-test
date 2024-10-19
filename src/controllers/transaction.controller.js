const { QueryTypes } = require("sequelize");
const { sequelize } = require("../configs/mysql.db");
const { generateInvoiceNumber } = require("../utils/helper");
const { ErrorType, ErrorConfig } = require("../contants/errorContant");

const topUpQuery = async (top_up_amount, id) => {
  const t = await sequelize.transaction();
  try {
    await sequelize.query(
      "UPDATE user_balance SET balance = balance + :top_up_amount, updatedAt = now() WHERE userId = :id",
      {
        replacements: { top_up_amount, id },
        type: sequelize.QueryTypes.UPDATE,
        transaction: t,
      }
    );
    const [balance] = await sequelize.query(
      "select balance from user_balance where userId = :id",
      {
        replacements: {
          id,
        },
        type: QueryTypes.SELECT,
        transaction: t,
      }
    );

    await t.commit();
    return balance;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const createTransaction = async (userId, service_code, topupAmount = 0) => {
  const t = await sequelize.transaction();

  try {
    /* 
    1. check saldo if cukup
    2. get service based on service code
    3. subtract balance with tarif
    4. insert into tranasction history
     (INSERT INTO user_transaction
invoice_number, transaction_type, description, total_amount, created_on)
VALUES( '', '', '', 0, '', );)
    */
    const [user_balance] = await sequelize.query(
      "select balance from user_balance where userId = :userId",
      {
        replacements: {
          userId,
        },
        type: QueryTypes.SELECT,
        transaction: t,
      }
    );

    const [services] = await sequelize.query(
      "select service_code, service_name, service_icon, service_tariff from services where service_code = :service_code",
      {
        replacements: {
          service_code,
        },
        type: QueryTypes.SELECT,
        transaction: t,
      }
    );
    if (!services) {
      throw new Error(ErrorType.SERVICE_NOT_FOUND);
    }

    if (services.service_code === "TOPUP") {
      services.service_tariff = topupAmount;
    }

    if (user_balance.balance < services.service_tariff) {
      throw new Error(ErrorType.BALANCE_INSUFFICIENT);
    }

    await sequelize.query(
      "UPDATE user_balance SET balance = balance - :top_up_amount, updatedAt = now() WHERE userId = :userId",
      {
        replacements: { top_up_amount: services.service_tariff, userId },
        type: QueryTypes.UPDATE,
        transaction: t,
      }
    );
    const invoiceNumber = generateInvoiceNumber();
    await sequelize.query(
      "INSERT INTO user_transaction (userId,invoice_number, transaction_type, description, total_amount, created_on) values (:userId,:invoiceNumber, :transaction_type, :description, :totalAmount, now())",
      {
        replacements: {
          invoiceNumber,
          transaction_type: services.service_code,
          description: services.service_name,
          totalAmount: services.service_tariff,
          userId,
        },
        type: QueryTypes.INSERT,
        transaction: t,
      }
    );

    const [result] = await sequelize.query(
      "select th.invoice_number,u.service_code, u.service_name, th.transaction_type, th.total_amount, th.created_on from user_transaction th  left join services u on u.service_code = th.transaction_type where invoice_number = :invoiceNumber",
      {
        replacements: {
          invoiceNumber,
        },
        type: QueryTypes.SELECT,
        transaction: t,
      }
    );
    t.commit();
    return result;
  } catch (error) {
    t.rollback();
    throw error;
  }
};

exports.balance = async (req, res) => {
  const id = req.id;

  try {
    const [balance] = await sequelize.query(
      "select balance from user_balance where userId = :id",
      {
        replacements: {
          id,
        },
        type: QueryTypes.SELECT,
      }
    );
    return res.status(200).json({
      status: 0,
      message: "Get Balance Berhasil",
      data: balance,
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

// when making top up count as transaction
// query transaction_type = TOPUP
exports.topup = async (req, res) => {
  const id = req.id;
  const { top_up_amount } = req.body;
  try {
    const data = await topUpQuery(top_up_amount, id);
    const createTransactionTopUp = await createTransaction(
      id,
      "TOPUP",
      top_up_amount
    );
    return res.status(200).json({
      status: 0,
      message: "Top up Berhasil",
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

exports.transaction = async (req, res) => {
  const id = req.id;
  const { service_code } = req.body;

  if (service_code === "TOPUP") {
    const e = ErrorConfig[ErrorType.SERVICE_NOT_FOUND];
    return res.status(e.code).json({
      message: e.message,
    });
  }

  try {
    const data = await createTransaction(id, service_code, res);
    return res.status(200).json({
      status: 0,
      message: "Transaksi berhasil",
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

exports.history = async (req, res) => {
  /* get transaction history */
  const { offset, limit } = req.params;
  const id = req.id;

  try {
    const user_transaction = await sequelize.query(
      "select invoice_number, transaction_type, description, total_amount, created_on from user_transaction where userId = :id",
      {
        replacements: {
          id,
        },
        type: QueryTypes.SELECT,
      }
    );
    return res.json({
      status: 0,
      message: "Sukses",
      data: user_transaction,
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
