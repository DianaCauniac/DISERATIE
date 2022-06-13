const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const surgerySchema = new Schema(
  {
    doctor: { type: String },
    patient: { type: String },
    nameOfSurgery: { type: String },
    dificulty: { type: String },
    noOfSteps: { type: Number },
    infoBesidesSteps: { type: String },
  },
  { timestamps: true }
);

surgerySchema.statics.getById = async (_id) => {
  const surgery = await Surgery.findOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return surgery;
};

surgerySchema.statics.getAll = async (doctor, patient) => {
  const surgery = await Surgery.find({ doctor: doctor, patient: patient }).sort(
    { _id: -1 }
  );
  return surgery;
};

surgerySchema.statics.updateById = async (_id, body) => {
  const surgery = await Surgery.findByIdAndUpdate(_id, body, {
    new: true,
  });
  return surgery;
};

surgerySchema.statics.deleteItem = async (_id) => {
  const deleted = await Surgery.deleteOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return deleted;
};

module.exports = Surgery = mongoose.model(
  "surgerys",
  surgerySchema,
  "surgerys"
);
