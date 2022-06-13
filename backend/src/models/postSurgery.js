const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSurgerySchema = new Schema(
  {
    doctor: { type: String },
    patient: { type: String },
    noOfDaysToRecover: { type: Number },
    medicines: { type: String },
    specialTreatment: { type: String },
  },
  { timestamps: true }
);

postSurgerySchema.statics.getById = async (_id) => {
  const postSurgery = await PostSurgery.findOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return postSurgery;
};

postSurgerySchema.statics.getAll = async (doctor, patient) => {
  const postSurgery = await PostSurgery.find({
    doctor: doctor,
    patient: patient,
  }).sort({ _id: -1 });
  return postSurgery;
};

postSurgerySchema.statics.updateById = async (_id, body) => {
  const postSurgery = await PostSurgery.findByIdAndUpdate(_id, body, {
    new: true,
  });
  return postSurgery;
};

postSurgerySchema.statics.deleteItem = async (_id) => {
  const deleted = await PostSurgery.deleteOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return deleted;
};

module.exports = PostSurgery = mongoose.model(
  "postSurgerys",
  postSurgerySchema,
  "postSurgerys"
);
