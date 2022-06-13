const User = require("../models/user");
const bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");
const crypto = require("crypto");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abc@gmail.com",
    pass: "your password",
  },
});

exports.signup = async (req, res) => {
  try {
    var user = await User.findUserByEmail(req.body.email);
    if (!user) {
      user = await User.create(req.body);
      var token = await user.generateAuthToken();
      res.status(200).json({ token: token });
    } else res.json({ error: "User with this email is already registered." });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    var user = await User.findUserByCredentials(email, password);
    if (!user) return res.json({ error: "Email or password is incorrect" });
    else {
      var token = await user.generateAuthToken();
      res.status(200).json({ token: token });
    }
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.profile = async (req, res) => {
  try {
    var user = await User.getUserById(req.token._id);
    if (!user) return res.json({ error: "User is not registered" });
    res.status(200).json({ user: user });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.allUsers = async (req, res) => {
  try {
    let users = await User.find({ role: { $ne: "admin" } }).sort({ _id: -1 });
    if (!users) {
      users = [];
    }
    res.status(200).json({ users });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.allDoctors = async (req, res) => {
  try {
    let doctors = await User.find({ role: { $eq: "doctor" } }).sort({
      _id: -1,
    });
    if (!doctors) {
      doctors = [];
    }
    res.status(200).json({ doctors });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
exports.allDoctorsByNurse = async (req, res) => {
  const { nurse } = req.params;
  try {
    let nurs = await User.getUserById(nurse);
    let doctors = [];
    for (let i = 0; i < nurs.doctors.length; i++) {
      let doctor = await User.getUserById(nurs.doctors[i]._id);
      doctors.push(doctor);
    }
    res.status(200).json({ doctors });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
exports.allNurses = async (req, res) => {
  try {
    let nurses = await User.find({ role: { $eq: "nurse" } }).sort({
      _id: -1,
    });
    if (!nurses) {
      nurses = [];
    }
    res.status(200).json({ nurses });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.handleNurseAssignment = async (req, res) => {
  try {
    console.log("req.body", req.body);
    await User.updateDoctors(req.body.nurseId, req.body.doctors);
    await User.updateNurses(req.body.doctorId, req.body.nurses);
    let doctor = await User.getUserById(req.body.doctorId);
    res.status(200).json({ doctor });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.handleApprove = async (req, res) => {
  try {
    await User.updateApprove(req.body._id, req.body.approve);
    let users = await User.find({ role: { $ne: "admin" } }).sort({ _id: -1 });
    if (!users) {
      users = [];
    }
    res.status(200).json({ users });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getuserbyid = async (req, res) => {
  try {
    var user = await User.getUserById(req.params.userId);
    if (!user) return res.json({ error: "User is not registered" });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.update_Password = async (req, res) => {
  try {
    var userId = req.token._id;
    var password = req.body.password;
    await User.updatePassword(userId, password);
    var user = await User.getUserById(req.token._id);
    res.status(200).json({ user: user });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.reset_Password = async (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res.json({ error: "User dont exists with that email" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then((result) => {
        transporter.sendMail({
          to: user.email,
          from: "no-replay@insta.com",
          subject: "password reset",
          html: `
                  <p>You requested for password reset</p>
                  <h3>click in this <a href="https://make-couple.netlify.app/reset/${token}">link</a> to reset password</h3>
                  `,
        });
        res.json({ message: "check your email" });
      });
    });
  });
};

exports.new_password = async (req, res) => {
  const newPassword = req.body.password;
  const sentToken = req.body.token;
  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.json({ error: "Try again session expired" });
      } else {
        user.password = newPassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((saveduser) => {
          res.json({ message: "password updated success" });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateProfile = async (req, res) => {
  try {
    var userId = req.token._id;
    var user = req.body;
    await User.updateUserProfile(userId, user);
    var user = await User.getUserById(req.token._id);
    res.status(200).json({ user: user });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.details = async (req, res) => {
  try {
    var user = await User.getUserById(req.params._id);
    if (!user) return res.json({ error: "User is not registered" });
    res.status(200).json({ user: user });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
