const ErrorType = {
  SERVICE_NOT_FOUND: "SERVICE_NOT_FOUND",
  BALANCE_INSUFFICIENT: "BALANCE_INSUFFICIENT",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  NOT_FOUND: "NOT_FOUND",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
};

const HttpStatus = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const ErrorConfig = {
  [ErrorType.SERVICE_NOT_FOUND]: {
    message: "Service atau Layanan tidak ditemukan",
    code: HttpStatus.NOT_FOUND,
    errorCode: "ERR_SERVICE_404",
  },
  [ErrorType.BALANCE_INSUFFICIENT]: {
    message: "Saldo anda tidak cukup",
    code: HttpStatus.BAD_REQUEST,
    errorCode: "ERR_BALANCE_400",
  },
  [ErrorType.VALIDATION_ERROR]: {
    message: "Data yang diberikan tidak valid",
    code: HttpStatus.BAD_REQUEST,
    errorCode: "ERR_VALIDATION_400",
  },
  [ErrorType.UNAUTHORIZED]: {
    message: "Silakan login terlebih dahulu",
    code: HttpStatus.UNAUTHORIZED,
    errorCode: "ERR_AUTH_401",
  },
  [ErrorType.FORBIDDEN]: {
    message: "Anda tidak memiliki akses",
    code: HttpStatus.FORBIDDEN,
    errorCode: "ERR_ACCESS_403",
  },
  [ErrorType.NOT_FOUND]: {
    message: "Data tidak ditemukan",
    code: HttpStatus.NOT_FOUND,
    errorCode: "ERR_DATA_404",
  },
  [ErrorType.INTERNAL_SERVER_ERROR]: {
    message: "Terjadi kesalahan pada server",
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode: "ERR_SERVER_500",
  },
};

module.exports = {
  ErrorType,
  HttpStatus,
  ErrorConfig,
};
