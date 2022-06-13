const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    doctor: { type: String },
    name: { type: String },
    age: { type: Number },
    bloodGroup: { type: String },
    height: { type: Number },
    weight: { type: Number },
    heartBeat: { type: Number },
    systolicBloodPressure: { type: Number },
    diastolicBloodPressure: { type: Number },
    hemoGlobin: { type: Number },
    sugarLevel: { type: Number },
  },
  { timestamps: true }
);

patientSchema.statics.getById = async (_id) => {
  const patient = await Patient.findOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return patient;
};

patientSchema.statics.getAll = async (doctor) => {
  const patient = await Patient.find({ doctor: doctor }).sort({ _id: -1 });
  return patient;
};

patientSchema.statics.updateById = async (_id, body) => {
  const patient = await Patient.findByIdAndUpdate(_id, body, {
    new: true,
  });
  return patient;
};

patientSchema.statics.deleteItem = async (_id) => {
  const deleted = await Patient.deleteOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return deleted;
};

module.exports = Patient = mongoose.model(
  "patients",
  patientSchema,
  "patients"
);
