const Province = require("../models/province");

exports.createProvince = async (req, res) => {
  try {
    let newProvince = {
      province: req.body.province,
    };
    const savedProvince = await Province.create(newProvince);
    res.status(200).json({ savedProvince });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getAllProvinces = async (req, res) => {
  try {
    const items = await Province.getAll();
    if (!items) items = [];
    res.status(200).json({ provinces: items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.updateProvince = async (req, res) => {
  try {
    const provinceId = req.body._id;
    let newProvince = {
      _id: req.body._id,
      province: req.body.province,
    };
    const updatedProvince = await Province.updateById(provinceId, newProvince);
    res.status(200).json({ updatedProvince });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deleteProvince = async (req, res) => {
  try {
    const { _id } = req.params;
    await Province.deleteItem(_id);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deleteTikedProvinces = async (req, res) => {
  try {
    let tikedList = req.body.tikedList;
    for (let i = 0; i < tikedList.length; i++) {
      await Province.deleteItem(tikedList[i]._id);
    }
    const items = await Province.getAll();
    if (!items) items = [];
    res.status(200).json({ provinces: items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
