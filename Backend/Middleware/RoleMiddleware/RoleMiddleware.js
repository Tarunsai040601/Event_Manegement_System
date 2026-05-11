const roleMiddleware = (roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Unauthorized access",
        });
      }

      next();
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  };
};

module.exports = roleMiddleware;