const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const protect = require("../middleware/protect");
const restrictTo = require("../middleware/restrictedTo");
const upload = require("../middleware/upload");

const router = express.Router();

//upload.single('profile')
router.post("/signup", upload.single("profile"), authController.signUp);
router.post("/login", authController.login);
router.post("/externalLogin", authController.externalLogin);
router.post("/forgetpassword", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);

router.use(protect);
router.post("/validateToken", authController.validateUser);
router.patch("/updatePassword", authController.updatePassword);

router
  .route("/")
  .get(restrictTo(["Admin", "Super Admin"]), userController.getUsers)
  .patch(upload.single("profile"), userController.updateMe);

router
  .route("/:id")
  .get(userController.getUser)
  .delete(restrictTo(["Admin", "Super Admin"]), userController.delete);

module.exports = router;
