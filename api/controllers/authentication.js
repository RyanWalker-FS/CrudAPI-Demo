const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};
exports.signup = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Missing email or password" });
  }
  User.findOne({ email: email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(422).json({ error: "Email already in use" });
      }
      const user = new User({
        email: email,
        password: password,
      });
      user
        .save()
        .then((user) => {
          res.json({ user_id: user._id, token: tokenForUser(user) });
        })
        .catch((error) => {
          return next(error);
        });
    })
    .catch((error) => {
      return next(error);
    });
};
