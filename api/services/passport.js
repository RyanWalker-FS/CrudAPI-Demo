const passport = require("passport");
//const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
//const { Strategy: LocalStrategy } = require("passport-local");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local");

const User = require("../models/user");
const config = require("../config");

const localOptions = {
  usernameField: "email",
};

const localStrategy = new LocalStrategy(
  localOptions,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return done(null, false);
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);
const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromHeader("Authorization"),
};

//const strategy = new JwtStrategy(jwtOptions, async (payload, done) => {
// try {
// 	const user = await User.findById(payload.sub);
// 	if (user) {
// 		return done(null, user);
// 	} else {
// 		return done(null, false);
// 	}
// } catch (error) {
// 	return done(error, false);
// }

//});

const strategy = new JwtStrategy(jwtOptions, function (payload, done) {
  console.log("JWT Strat.");
  User.findById(payload.sub, function (error, user) {
    if (error) {
      return done(error, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(strategy);
passport.use(localStrategy);

module.exports = passport;
