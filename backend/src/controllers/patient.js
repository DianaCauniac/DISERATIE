const Patient = require("../models/patient");

exports.createPatient = async (req, res) => {
  try {
    const savedPatient = await Patient.create(req.body);
    res.status(200).json({ savedPatient });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getAllPatients = async (req, res) => {
  const { doctor } = req.params;
  try {
    const items = await Patient.getAll(doctor);
    if (!items) items = [];
    res.status(200).json({ patients: items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const id = req.body._id;
    const updatedPatient = await Patient.updateById(id, req.body);
    res.status(200).json({ updatedPatient });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { _id } = req.params;
    await Patient.deleteItem(_id);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deleteTikedPatients = async (req, res) => {
  try {
    let tikedList = req.body.tikedList;
    for (let i = 0; i < tikedList.length; i++) {
      await Patient.deleteItem(tikedList[i]._id);
    }
    const items = await Patient.getAll();
    if (!items) items = [];
    res.status(200).json({ levels: items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
