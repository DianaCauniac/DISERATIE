const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectorSchema = new Schema(
  {
    sector: { type: String },
  },
  { timestamps: true }
);

sectorSchema.statics.getById = async (_id) => {
  const sector = await Sector.findOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return sector;
};

sectorSchema.statics.getAll = async () => {
  const sector = await Sector.find({}).sort({ _id: -1 });
  return sector;
};

sectorSchema.statics.updateById = async (_id, body) => {
  const sector = await Sector.findByIdAndUpdate(_id, body, {
    new: true,
  });
  return sector;
};

sectorSchema.statics.deleteItem = async (_id) => {
  const deletedSector = await Sector.deleteOne({
    _id: mongoose.Types.ObjectId(_id),
  });
  return deletedSector;
};

module.exports = Sector = mongoose.model("sectors", sectorSchema, "sectors");
