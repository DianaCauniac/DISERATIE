const Programtype = require("../models/programtype");

exports.createProgramtype = async (req, res) => {
  try {
    let newObj = {
      programtype: req.body.programtype,
    };
    const savedProgramtype = await Programtype.create(newObj);
    res.status(200).json({ savedProgramtype });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getAllProgramtypes = async (req, res) => {
  try {
    const items = await Programtype.getAll();
    if (!items) items = [];
    res.status(200).json({ programtypes: items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.updateProgramtype = async (req, res) => {
  try {
    const id = req.body._id;
    let newObj = {
      _id: req.body._id,
      programtype: req.body.programtype,
    };
    const updatedProgramtype = await Programtype.updateById(id, newObj);
    res.status(200).json({ updatedProgramtype });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deleteProgramtype = async (req, res) => {
  try {
    const { _id } = req.params;
    await Programtype.deleteItem(_id);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deleteTikedProgramtypes = async (req, res) => {
  try {
    let tikedList = req.body.tikedList;
    for (let i = 0; i < tikedList.length; i++) {
      await Programtype.deleteItem(tikedList[i]._id);
    }
    const items = await Programtype.getAll();
    if (!items) items = [];
    res.status(200).json({ programtypes: items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
