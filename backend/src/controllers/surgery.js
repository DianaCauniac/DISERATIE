const Surgery = require("../models/surgery");

exports.createSurgery = async (req, res) => {
  console.log(req.body);
  try {
    const savedSurgery = await Surgery.create(req.body);
    res.status(200).json({ savedSurgery });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getAllSurgerys = async (req, res) => {
  const { doctor, patient } = req.params;
  try {
    const items = await Surgery.getAll(doctor, patient);
    if (!items) items = [];
    res.status(200).json({ surgeries: items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.updateSurgery = async (req, res) => {
  try {
    const id = req.body._id;
    const updatedSurgery = await Surgery.updateById(id, req.body);
    res.status(200).json({ updatedSurgery });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deleteSurgery = async (req, res) => {
  try {
    const { _id } = req.params;
    await Surgery.deleteItem(_id);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deleteTikedSurgerys = async (req, res) => {
  try {
    let tikedList = req.body.tikedList;
    for (let i = 0; i < tikedList.length; i++) {
      await Surgery.deleteItem(tikedList[i]._id);
    }
    const items = await Surgery.getAll();
    if (!items) items = [];
    res.status(200).json({ surgerys: items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
