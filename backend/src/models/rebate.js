const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rebateSchema = new Schema(
  {
    programName: { type: String },
    agencyName: { type: String },
    province: { type: String },
    level: { type: String },
    sector: { type: String },
    programtype: { type: String },
    description: { type: String },
    phone: { type: String },
    link: { type: String },
  },
  { timestamps: true }
);

rebateSchema.statics.getById = async (_id) => {
  const rebate = await Rebate.findOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return rebate;
};

rebateSchema.statics.getAll = async () => {
  const rebate = await Rebate.find({}).sort({ _id: -1 });
  return rebate;
};

rebateSchema.statics.getSearchData = async (
  province,
  level,
  sector,
  programtype
) => {
  const rebate = await Rebate.find({
    province,
    level,
    sector,
    programtype,
  }).sort({ _id: -1 });
  return rebate;
};

rebateSchema.statics.updateById = async (_id, body) => {
  const rebate = await Rebate.findByIdAndUpdate(_id, body, {
    new: true,
  });
  return rebate;
};

rebateSchema.statics.deleteItem = async (_id) => {
  const deletedRebate = await Rebate.deleteOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return deletedRebate;
};

module.exports = Rebate = mongoose.model("rebates", rebateSchema, "rebates");
