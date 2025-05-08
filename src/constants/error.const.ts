const errorMessages = {
  UNAUTHORIZED: {
    statusCode: 401,
    message: "User is not authorized",
  },
  NOT_FOUND: {
    statusCode: 404,
    message: "Resource not found",
  },
  BAD_REQUEST: {
    statusCode: 400,
    message: "Invalid request data",
  },
  INTERNAL_ERROR: {
    statusCode: 500,
    message: "Internal server error",
  },
};

const successMessages = {
  CREATED: {
    statusCode: 201,
    message: "Resource created successfully",
  },
  SUCCESS: {
    statusCode: 200,
    message: "Request successful",
  },
};

export default { errorMessages, successMessages };
