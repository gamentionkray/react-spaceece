import User from "../models/user.js";

export const login = (req, res) => {
  const userBody = req.body;

  if (!userBody.email || !userBody.password) {
    return res.status(400).send({
      message: "Please fill all fields",
    });
  }

  User.findOne({ email: userBody.email }, (err, user) => {
    if (err) {
      return res.status(500).send({
        message: "Error on the server",
      });
    }
    if (!user) {
      return res.status(404).send({
        message: "No user found",
      });
    }

    if (user.password !== userBody.password) {
      return res.status(401).send({
        message: "Incorrect password",
      });
    }

    return res.status(200).json({
      message: "Login successful",
      user: user,
    });
  });
};

export const register = (req, res) => {
  const user = req.body;

  if (!user.email || !user.password) {
    return res.status(400).send({
      message: "Please fill all fields",
    });
  }

  User.findOne({ email: user.email }, (err, existingUser) => {
    if (err) {
      return res.status(500).send({
        message: "Error on the server",
      });
    }
    if (existingUser) {
      return res.status(409).send({
        message: "User already exist",
      });
    }

    const userModel = new User(user);
    userModel.save((err, user) => {
      if (err) {
        return res.status(500).send({
          message: "Error on the server",
        });
      }
      return res.status(201).json({
        message: "User created successfully",
        user: user,
      });
    });
  });
};
