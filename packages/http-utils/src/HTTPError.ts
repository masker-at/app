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
  EMAIL_ALREADY_VERIFIED: {
    message: 'Your email address is already verified',
    httpStatus: 403,
  },
  VERIFICATION_COUNTDOWN_NOT_FINISHED: {
    message: "Verification countdown hasn't finished yet, please try later",
    httpStatus: 429,
  },
  NOT_AUTHENTICATED: {
    message: 'You are not authenticated',
    httpStatus: 401,
  },
  EMAIL_NOT_VERIFIED: {
    message: 'Please verify your email address',
    httpStatus: 403,
  },
  ALIAS_NOT_FOUND: {
    message: "This alias doesn't exist",
    httpStatus: 404,
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
