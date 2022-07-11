const jwt = require("jsonwebtoken");

const middlewareController = {
  //verifyToken
  verifyToken: (req, res, next) => {
    try {
      const token = req.headers.token;
      if (token) {
        const accessToken = token;
        jwt.verify(accessToken, "secretkey", (err, user) => {
          if (err) {
            return res.status(403).json("Token is not valid");
          }
          req.user = user;
          next();
        });
      } else {
        res.status(401).json("you are not authenticated");
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //verifyTokenandAdmin
  verifyTokenandAdmin: (req, res, next) => {
    middlewareController.verifyToken(req, res, () => {
      if (req.user.admin) {
        next();
      } else {
        return res.status(403).json("you are not allowed");
      }
    });
  },
};

module.exports = middlewareController;
