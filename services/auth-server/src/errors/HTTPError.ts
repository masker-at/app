const ERRORS = {
  INTERNAL_SERVER_ERROR: {
    message: 'Internal Server Error',
    httpStatus: 500,
  },
  USER_NOT_FOUND: {
    message: "User with this email doesn't exist",
    httpStatus: 403,
  },
  INVALID_PASSWORD: {
    message: 'Your password is incorrect',
    httpStatus: 403,
  },
  USER_ALREADY_EXISTS: {
    message: 'User with this email already exists',
    httpStatus: 403,
  },
};

export default class HTTPError extends Error {
  public httpStatus: number;

  constructor(public code: keyof typeof ERRORS) {
    super(ERRORS[code].message);
    this.name = 'HTTPError';
    this.httpStatus = ERRORS[code].httpStatus;
  }

  toJSON(): {
    code: keyof typeof ERRORS;
    message: string;
  } {
    return { code: this.code, message: this.message };
  }
}
