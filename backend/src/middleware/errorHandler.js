export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Supabase errors
  if (err.code) {
    return res.status(400).json({
      success: false,
      error: 'Database Error',
      message: err.message || 'A database error occurred',
      statusCode: 400,
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      error: 'Invalid Token',
      message: 'Authentication token is invalid',
      statusCode: 401,
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      error: 'Token Expired',
      message: 'Authentication token has expired',
      statusCode: 401,
    });
  }

  // Default error
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.name || 'Internal Server Error',
    message: err.message || 'An unexpected error occurred',
    statusCode: err.statusCode || 500,
  });
};
