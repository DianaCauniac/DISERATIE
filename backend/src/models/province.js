const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const provinceSchema = new Schema(
  {
    province: { type: String },
  },
  { timestamps: true }
);

provinceSchema.statics.getById = async (_id) => {
  const province = await Province.findOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return province;
};

provinceSchema.statics.getAll = async () => {
  const province = await Province.find({}).sort({ _id: -1 });
  return province;
};

provinceSchema.statics.updateById = async (_id, body) => {
  const province = await Province.findByIdAndUpdate(_id, body, {
    new: true,
  });
  return province;
};

provinceSchema.statics.deleteItem = async (_id) => {
  const deletedProvince = await Province.deleteOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return deletedProvince;
};

module.exports = Province = mongoose.model(
  "provinces",
  provinceSchema,
  "provinces"
);
