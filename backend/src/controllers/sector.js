const Sector = require("../models/sector");

exports.createSector = async (req, res) => {
  try {
    let newObj = {
      sector: req.body.sector,
    };
    const savedSector = await Sector.create(newObj);
    res.status(200).json({ savedSector });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getAllSectors = async (req, res) => {
  try {
    const items = await Sector.getAll();
    if (!items) items = [];
    res.status(200).json({ sectors: items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.updateSector = async (req, res) => {
  try {
    const id = req.body._id;
    let newObj = {
      _id: req.body._id,
      sector: req.body.sector,
    };
    const updatedSector = await Sector.updateById(id, newObj);
    res.status(200).json({ updatedSector });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deleteSector = async (req, res) => {
  try {
    const { _id } = req.params;
    await Sector.deleteItem(_id);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deleteTikedSectors = async (req, res) => {
  try {
    let tikedList = req.body.tikedList;
    for (let i = 0; i < tikedList.length; i++) {
      await Sector.deleteItem(tikedList[i]._id);
    }
    const items = await Sector.getAll();
    if (!items) items = [];
    res.status(200).json({ sectors: items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
