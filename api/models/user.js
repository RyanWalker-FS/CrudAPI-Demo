const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validateEmail = (email) => {
  return /^S+@\S.\S+$/.test(email);
};
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: "Email address is required",
    validator: (v) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(v);
    },
  },
  password: {
    type: String,
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isNew || this.isModified("password")) {
    // run hashing and salting
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        return next(error);
      }
      bcrypt.hash(user.password, salt, null, (error, hash) => {
        if (error) {
          return next(error);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    // skip hashing and salting
    next();
  }
});
module.exports = mongoose.model("User", userSchema);
