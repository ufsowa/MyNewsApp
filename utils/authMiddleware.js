const Session = require("../models/Session.model");

const authMiddleware = async (req, res, next) => {
  console.log("auth", req.body, req.session);

  if (process.env.NODE_ENV !== "production") {
    try {
      // find last session record in db
      const sessionRecord = await Session.findOne({});

      // if session is not found
      // return 401 status and message
      if (!sessionRecord)
        return res.status(401).send({ message: "You are not authorized" });

      // if session is found, parse it and set user in req.session
      const sessionData = JSON.parse(sessionRecord.session);
      req.session.user = {
        id: sessionData.user.id,
        login: sessionData.user.login,
      };
      console.log("development");

      next();
    } catch (err) {
      console.error(err);
      return res.status(401).send({ message: "You are not authorized" });
    }
  } else {
    console.log("production");

    if (req.session.user && req.session.user.login) {
      // check if login is logged in session
      next(); // move to next
    } else {
      res.status(401).send({ message: "You are not authorized" });
    }
  }
};

module.exports = authMiddleware;
