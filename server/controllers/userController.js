const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const User = require("../models/user");

//To filter Some fields from req.body so we can update only these fields
const filterObj = (obj, ...allowed) => {
  const newObj = {};
  Object.keys(obj).filter((el) => {
    if (allowed.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;
  next();
});
exports.getUser = catchAsync(async (req, res, next) => {
  let doc = await User.findById(req.params.id);
  if (!doc) return next(new AppError("requested Id not found", 404));

  res.status(200).json({
    success: true,
    data: { doc },
  });
});
exports.getUsers = catchAsync(async (req, res, next) => {
  let doc = await User.find({}).populate("roles", "name");

  res.status(200).json({
    success: true,
    data: { doc },
  });
});
//Do not Update Password with this
exports.updateMe = catchAsync(async (req, res, next) => {
  let user = {};
  let deletedImage;
  if (req.body.name) user.name = req.body.name;
  if (req.file) {
    const profileName = req.file.key.split("/");
    if (req.user.profile) deletedImage = req.user.profile;
    user.profile = profileName[profileName.length - 1];
  }
  if (req.body.phoneNumber !== undefined) {
    user.phoneNumber = req.body.phoneNumber;
    user.phoneCode = req.body.phoneCode;
  }
  if (req.body.bio) user.bio = req.body.bio;

  if (req.body.favoriteCuisine)
    user.favoriteCuisine = req.body.favoriteCuisine.split(",");
  if (req.body.socials) {
    user.socials = JSON.parse(req.body.socials);
  }

  //user.email = req.body.email;
  const doc = await User.findByIdAndUpdate(req.user._id, user, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(new AppError("requested Id not found", 404));
  }

  if (deletedImage) {
    removeS3Object("profile-pictures/" + deletedImage);
  }
  res.status(200).json({
    success: true,
    data: {
      doc: user,
    },
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("roles");
  if (user && user.roles.some((x) => x.name === "Super Admin")) {
    return next(new AppError("Access denied", 403));
  }
  if (
    user &&
    user.roles.some((x) => x.name === "Admin") &&
    !req.user.roles.some((x) => x.name === "Super Admin")
  ) {
    return next(new AppError("Access denied", 403));
  }
  const doc = await User.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError("Requested Id not found", 404));
  }
  res.status(204).json({
    success: true,
    data: "deleted Successfully",
  });
});
