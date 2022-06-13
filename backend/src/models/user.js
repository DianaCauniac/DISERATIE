const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create Schema
const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String },
    specialization: { type: String },
    responsibilities: { type: String },
    dateOfStart: { type: Date, default: new Date() },
    available: { type: Boolean, default: true },
    approve: { type: Boolean, default: false },
    doctors: [],
    nurses: [],
    picture: { type: String },
    role: {
      type: String,
      enum: ["nurse", "doctor", "admin"],
      default: "doctor",
    },
    resetToken: String,
    expireToken: Date,
    passwordReset: { type: Date },
  },
  { timestamps: true }
);

//Store Encrypted Password When Creating Account
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

//Generate JWT Token
UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
  return token;
};

//Generate JWT Token For Remember Me
UserSchema.methods.generateAuthTokenForRememberMe = async function () {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "365d",
    }
  );
  return token;
};

//Find using email and check if the password matched
UserSchema.statics.findUserByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid login credentials");
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) throw new Error("Invalid login credentials");
  return user;
};

UserSchema.statics.findUserByEmail = async (email) => {
  const user = await User.findOne({ email }, { password: 0 });
  return user;
};

UserSchema.statics.getUserById = async (_id) => {
  const user = await User.findOne(
    { _id: mongoose.Types.ObjectId(_id) },
    { password: 0 }
  );
  return user;
};

UserSchema.statics.deleteUser = async (_id) => {
  const del = await User.deleteOne({ _id: mongoose.Types.ObjectId(_id) });
  return del;
};

UserSchema.statics.updateActive = async (_id, val) => {
  const upt = await User.updateOne(
    { _id: mongoose.Types.ObjectId(_id) },
    { $set: { isActive: val } }
  );
  return upt;
};

UserSchema.statics.updatePassword = async (_id, val) => {
  let hashPass = await bcrypt.hash(val, 10);
  const upt = await User.updateOne(
    { _id: mongoose.Types.ObjectId(_id) },
    { $set: { password: hashPass } }
  );
  return upt;
};

UserSchema.statics.updateName = async (_id, val) => {
  const upt = await User.updateOne(
    { _id: mongoose.Types.ObjectId(_id) },
    { $set: { name: val } }
  );
  return upt;
};

UserSchema.statics.updateApprove = async (_id, val) => {
  const upt = await User.updateOne(
    { _id: mongoose.Types.ObjectId(_id) },
    { $set: { approve: val } }
  );
  return upt;
};

UserSchema.statics.updateDoctors = async (_id, val) => {
  const upt = await User.updateOne(
    { _id: mongoose.Types.ObjectId(_id) },
    { $set: { doctors: val } }
  );
  return upt;
};
UserSchema.statics.updateNurses = async (_id, val) => {
  const upt = await User.updateOne(
    { _id: mongoose.Types.ObjectId(_id) },
    { $set: { nurses: val } }
  );
  return upt;
};

UserSchema.statics.updateUserProfile = async (_id, user) => {
  if (user.password !== "") {
    let hashPass = await bcrypt.hash(user.password, 10);
    await User.updateOne(
      { _id: mongoose.Types.ObjectId(_id) },
      {
        $set: {
          password: hashPass,
        },
      }
    );
  }
  const upt = await User.updateOne(
    { _id: mongoose.Types.ObjectId(_id) },
    {
      $set: {
        name: user.name,
        email: user.email,
      },
    }
  );
  return upt;
};

module.exports = User = mongoose.model("users", UserSchema, "users");
