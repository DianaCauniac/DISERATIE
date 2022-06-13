const PostSurgery = require("../models/postSurgery");

exports.createPostSurgery = async (req, res) => {
  try {
    const savedPostSurgery = await PostSurgery.create(req.body);
    res.status(200).json({ savedPostSurgery });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getAllPostSurgerys = async (req, res) => {
  const { doctor, patient } = req.params;
  try {
    const items = await PostSurgery.getAll(doctor, patient);
    if (!items) items = [];
    res.status(200).json({ postSurgeries: items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.updatePostSurgery = async (req, res) => {
  try {
    const id = req.body._id;
    const updatedPostSurgery = await PostSurgery.updateById(id, req.body);
    res.status(200).json({ updatedPostSurgery });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deletePostSurgery = async (req, res) => {
  try {
    const { _id } = req.params;
    await PostSurgery.deleteItem(_id);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deleteTikedPostSurgerys = async (req, res) => {
  try {
    let tikedList = req.body.tikedList;
    for (let i = 0; i < tikedList.length; i++) {
      await PostSurgery.deleteItem(tikedList[i]._id);
    }
    const items = await PostSurgery.getAll();
    if (!items) items = [];
    res.status(200).json({ postSurgerys: items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
