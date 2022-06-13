const Rebate = require("../models/rebate");

exports.createRebate = async (req, res) => {
  try {
    let newObj = {
      programName: req.body.programName,
      agencyName: req.body.agencyName,
      province: req.body.province,
      level: req.body.level,
      sector: req.body.sector,
      programtype: req.body.programtype,
      description: req.body.description,
      phone: req.body.phone,
      link: req.body.link,
    };
    const savedRebate = await Rebate.create(newObj);
    res.status(200).json({ savedRebate });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getAllRebates = async (req, res) => {
  try {
    const items = await Rebate.getAll();
    if (!items) items = [];
    res.status(200).json({ rebates: items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.updateRebate = async (req, res) => {
  try {
    const id = req.body._id;
    let newObj = {
      _id: req.body._id,
      programName: req.body.programName,
      agencyName: req.body.agencyName,
      province: req.body.province,
      level: req.body.level,
      sector: req.body.sector,
      programtype: req.body.programtype,
      description: req.body.description,
      phone: req.body.phone,
      link: req.body.link,
    };
    const updatedRebate = await Rebate.updateById(id, newObj);
    res.status(200).json({ updatedRebate });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deleteRebate = async (req, res) => {
  try {
    const { _id } = req.params;
    await Rebate.deleteItem(_id);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deleteTikedRebates = async (req, res) => {
  try {
    let tikedList = req.body.tikedList;
    for (let i = 0; i < tikedList.length; i++) {
      await Rebate.deleteItem(tikedList[i]._id);
    }
    const items = await Rebate.getAll();
    if (!items) items = [];
    res.status(200).json({ rebates: items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.getRebateData = async (req, res) => {
  try {
    let province = req.body.province;
    let level = req.body.level;
    let sector = req.body.sector;
    let programtype = req.body.programtype;

    const items = await Rebate.getSearchData(
      province,
      level,
      sector,
      programtype
    );
    if (!items) items = [];
    res.status(200).json({ searchRebates: items });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};
