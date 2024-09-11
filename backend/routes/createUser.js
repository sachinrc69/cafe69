const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gerenateError = require("../generateError");
const generateError = require("../generateError");

router.post(
  "/signup",
  [
    body("email").isEmail(),
    body("password", "password must be longer than 5 char").isLength({
      min: 5,
    }),
  ],

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw gerenateError("Enter right credentials", 404);
      }

      const result = await User.findOne({ email: req.body.email });
      if (result) throw gerenateError("user already exists", 404);

      const salt = await bcrypt.genSalt(process.env.SALT);
      let secPassword = await bcrypt.hash(req.body.password, salt);
      const user = new User({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      await user.save().then((result) => {
        const jwtSecret = process.env.JWT_KEY;
        const data = {
          user: {
            id: result._id,
          },
        };
        const authToken = jwt.sign(data, jwtSecret);
        res.status(201).json({
          authToken: authToken,
          user: { id: result.id, name: result.name, email: result.email },
        });
      });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "password must be longer than 5 char").isLength({
      min: 5,
    }),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        throw gerenateError("Enter right credentials", 404);

      const result = await User.findOne({ email: req.body.email });
      if (!result) throw gerenateError("User does not exist", 404);

      const cmpPassword = bcrypt.compareSync(
        req.body.password,
        result.password
      );

      if (!cmpPassword) throw gerenateError("Incorrect passowrd", 404);

      const jwtSecret = process.env.JWT_KEY;

      const data = {
        user: {
          id: result.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);

      res.status(200).json({
        success: true,
        authToken: authToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/getUser/:authToken", async (req, res, next) => {
  const authToken = req.params.authToken;
  if (!authToken) {
    throw gerenateError("Unauthorised", 404);
  }
  try {
    const decodedToken = jwt.verify(authToken, process.env.JWT_KEY);

    const user = await User.findById(decodedToken.user.id);
    if (!user) throw gerenateError("user not found", 200);

    res.status(200).json({ user: user, message: "found user successfully" });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/edituser/:userId",
  [
    body("email").isEmail(),
    body("password", "password must be longer than 5 char").isLength({
      min: 5,
    }),
  ],

  async (req, res, next) => {
    const userId = req.params.userId;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw generateError("Enter right credentials", 404);
      }

      const salt = await bcrypt.genSalt(process.env.SALT);
      let secPassword = await bcrypt.hash(req.body.password, salt);

      const user = await User.findByIdAndUpdate(userId, {
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      if (!user) generateError("USER UPDATE FAILED", 200);
      const jwtSecret = process.env.JWT_KEY;
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, jwtSecret);
      res.status(200).json({
        message: "updated user successfully",
        authToken: authToken,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
