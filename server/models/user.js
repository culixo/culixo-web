const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A User must have a name"],
    },
    email: {
      type: String,
      required: [true, "A User must have an email"],
      unique: [true, "Email already exist"],
      lowercase: true,
      validate: [validator.isEmail, "Please Provide a Valid Email"],
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    phoneCode: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "A User must have a Password"],
      select: false,
    },
    bio: {
      type: String,
      default: "",
    },
    profile: {
      type: String,
      default: "",
    },
    favoriteCuisine: {
      type: [String],
    },
    socials: {
      type: [Object],
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roles",
        // validate: {
        //   validator: async function (v) {
        //     return await Roles.findById(v, (err, rec) => rec !== null);
        //   },
        //   message: 'Invalid Object ID',
        // },
        required: true,
      },
    ],
    passwordResetToken: String,
    passwordResetExpires: Date,
    changedPasswordAt: Date,
    emailVerified: {
      type: Boolean,
      default: false,
      select: false,
    },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.pre("save", async function (next) {
  //hashing password
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.changedPasswordAfter = function (JWTtimestamp) {
  if (this.changedPasswordAt) {
    const changedTime = parseInt(this.changedPasswordAt.getTime() / 1000, 10);
    return JWTtimestamp < changedTime; //token_issued < changed time(mean Pass changed time)
  }
  return false; //Not Changed
};

UserSchema.methods.createEmailVerificationToken = function () {
  const emailVerificationToken = Math.floor(
    1000 + Math.random() * 9000
  ).toString(); // Generates a 4-digit code

  const expires = Date.now() + 5 * 60 * 1000;
  this.emailVerificationToken = crypto
    .createHash("Sha256")
    .update(emailVerificationToken)
    .digest("hex");
  this.emailVerificationExpires = expires;
  return {
    token: emailVerificationToken,
    expires: expires,
  };
};
UserSchema.methods.createResetPasswordToken = function () {
  const resetToken = Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 4-digit code

  const expires = Date.now() + 60 * 60 * 1000;
  this.passwordResetToken = crypto
    .createHash("Sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = expires;
  return {
    token: resetToken,
    expires: expires,
  };
};

let User;
if (!mongoose.models["User"]) {
  User = mongoose.model("User", UserSchema);
} else {
  User = mongoose.models["User"];
}

module.exports = User;
