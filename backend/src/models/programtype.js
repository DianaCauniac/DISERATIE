const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const programtypeSchema = new Schema(
  {
    programtype: { type: String },
  },
  { timestamps: true }
);

programtypeSchema.statics.getById = async (_id) => {
  const programtype = await Programtype.findOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return programtype;
};

programtypeSchema.statics.getAll = async () => {
  const programtype = await Programtype.find({}).sort({ _id: -1 });
  return programtype;
};

programtypeSchema.statics.updateById = async (_id, body) => {
  const programtype = await Programtype.findByIdAndUpdate(_id, body, {
    new: true,
  });
  return programtype;
};

programtypeSchema.statics.deleteItem = async (_id) => {
  const deletedProgramtype = await Programtype.deleteOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return deletedProgramtype;
};

module.exports = Programtype = mongoose.model(
  "programtypes",
  programtypeSchema,
  "programtypes"
);
