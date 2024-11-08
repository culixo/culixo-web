// server/config/db.js
const mongoose = require("mongoose");
const { createDefaultRoles } = require("../controllers/rolesController");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Remove the useCreateIndex option
    });
    console.log("MongoDB Connected...");
    await createDefaultRoles(["Admin", "User", "Super Admin"]);
    // await signUpAdmin();
    console.log("Default data success");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
